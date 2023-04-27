import json
from dataclasses import dataclass
from typing import Callable, Type, Any

import pydantic
from pika import BasicProperties
from pydantic import BaseModel

from worker.rmq_client.exception import RmqException
from worker.rmq_client.response import RmqResponse


@dataclass
class RpcHandler:
    request: Type[BaseModel]
    process: Callable[[Any], Any]


def handle_rpc(handler: RpcHandler):
    def inner(ch, method, props, body):
        body = str(body.decode("utf-8"))
        body = json.loads(body)
        print(f"receive request: {body}")
        try:
            body = handler.request(**body)
            try:
                # 正常获得结果
                data = handler.process(body)
                resp = RmqResponse(data=data)
            except RmqException as e:
                # 运行时出现问题
                resp = RmqResponse(code=e.code, message=e.message, data=None)
        except pydantic.ValidationError as e:
            # request不合法
            resp = RmqResponse(code=400, message=e.json(), data=None)

        resp = resp.json()
        print(f"response with: {resp}")

        ch.basic_publish(
            exchange='',
            routing_key=props.reply_to,
            properties=BasicProperties(
                correlation_id=props.correlation_id
            ),
            body=resp
        )
        ch.basic_ack(delivery_tag=method.delivery_tag)

    return inner


@dataclass
class SubscribeHandler:
    request: Type[BaseModel]
    process: Callable[[Any], None]


def handle_subscribe(handler: SubscribeHandler):
    def inner(ch, method, props, body):
        body = str(body.decode("utf-8"))
        body = json.loads(body)
        print(f"receive request: {body}")
        try:
            body = handler.request(**body)
            handler.process(body)
        except RmqException as e:
            # TODO log
            print(e)

    return inner
