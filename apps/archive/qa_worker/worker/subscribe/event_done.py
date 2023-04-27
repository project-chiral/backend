from haystack import Document
from haystack.document_stores.faiss import FAISSDocumentStore
from haystack.nodes import EmbeddingRetriever
from pydantic import BaseModel

from base_api import EventApi


class EventDoneReq(BaseModel):
    id: int
    done: bool


class EventDoneHandler:
    def __init__(
            self,
            event_api: EventApi,
            doc_store: FAISSDocumentStore,
            retriever: EmbeddingRetriever,
    ):
        self.event_api = event_api
        self.doc_store = doc_store
        self.retriever = retriever

    def process(self, body: EventDoneReq):
        event = self.event_api.get(body.id)
        content = self.event_api.get_content(body.id)

        self.doc_store.write_documents(
            documents=[Document(
                content=content.content,
                meta={}
            )]
        )
        self.doc_store.update_embeddings(
            retriever=self.retriever,
        )
