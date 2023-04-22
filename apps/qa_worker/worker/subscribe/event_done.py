from haystack.document_stores.faiss import FAISSDocumentStore
from haystack.nodes import EmbeddingRetriever
from pydantic import BaseModel


class EventDoneReq(BaseModel):
    id: int
    done: bool


class EventDoneHandler:
    def __init__(
            self,
            doc_store: FAISSDocumentStore,
            retriever: EmbeddingRetriever,
    ):
        self.doc_store = doc_store
        self.retriever = retriever

    def process(self, body: EventDoneReq):
        self.doc_store.update_embeddings(
            retriever=self.retriever,
        )
