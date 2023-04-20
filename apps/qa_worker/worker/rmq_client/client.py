import os
from typing import Dict, Callable

import pika

from worker.rmq_client.handle_request import RpcHandler, handle_rpc, SubscribeHandler, \
    handle_subscribe


class RmqClient:
    def __init__(self,
                 rpc_handlers: Dict[str, RpcHandler],
                 subscribe_handlers: Dict[str, SubscribeHandler]
                 ) -> None:
        self.conn = None
        self.channel = None
        self.rpc_handlers = rpc_handlers
        self.subscribe_handlers = subscribe_handlers

    def _register_handler(self, queue: str, handler: Callable):
        self.channel.queue_declare(queue=queue)
        self.channel.basic_consume(
            queue=queue,
            on_message_callback=handler,
        )

    def connect(self):
        credentials = pika.PlainCredentials(
            username=os.environ['RMQ_USERNAME'],
            password=os.environ['RMQ_PASSWORD'],
            erase_on_connect=True
        )
        self.conn = pika.BlockingConnection(
            pika.ConnectionParameters(
                host=os.environ['RMQ_HOST'],
                port=int(os.environ['RMQ_PORT']),
                credentials=credentials
            )
        )
        self.channel = self.conn.channel()

        for queue, handler in self.rpc_handlers.items():
            self._register_handler(
                queue=queue,
                handler=handle_rpc(handler)
            )
        for queue, handler in self.subscribe_handlers.items():
            self._register_handler(
                queue=queue,
                handler=handle_subscribe(handler)
            )

        print('rmq_client connected')
        self.channel.start_consuming()

    def close(self):
        if self.channel is None or self.conn is None:
            return
        self.channel.close()
        self.conn.close()
