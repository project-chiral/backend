from rmq_client import RmqClient
from worker.retriever import Retriever

retriever = Retriever()

rmq_client = RmqClient(
    rpc_handlers={},
    subscribe_handlers={},
)


def main():
    rmq_client.connect()


def close():
    rmq_client.close()


if __name__ == "__main__":
    try:
        main()
    finally:
        close()
