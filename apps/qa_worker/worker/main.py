from rmq_client import RmqClient
from worker.agent import QaAgent
from worker.doc_store import DocStore, Retriever
from worker.rmq_client import SubscribeHandler, RpcHandler
from worker.rpc import BaseQaHandler, BaseQaReq
from worker.subscribe import EventDoneHandler, EventDoneReq
from worker.tools import SemanticSearchTool, RelationSearchTool, MetaSearchTool, HierarchicalSearchTool

doc_store = DocStore()
retriever = Retriever(doc_store)

qa_agent = QaAgent(
    tools=[
        SemanticSearchTool(retriever),
        RelationSearchTool(doc_store),
        MetaSearchTool(doc_store),
        HierarchicalSearchTool(doc_store),
    ]
)

rmq_client = RmqClient(
    rpc_handlers={
        'base-qa': RpcHandler(
            process=BaseQaHandler(agent=qa_agent).process,
            request=BaseQaReq,

        ),
    },
    subscribe_handlers={
        'event-done': SubscribeHandler(
            process=EventDoneHandler(doc_store, retriever).process,
            request=EventDoneReq,
        )
    },
)


def main():
    rmq_client.connect()


def close():
    doc_store.close()
    rmq_client.close()


if __name__ == "__main__":
    try:
        main()
    finally:
        close()
