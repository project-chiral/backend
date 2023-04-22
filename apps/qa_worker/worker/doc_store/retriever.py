from haystack.document_stores import FAISSDocumentStore
from haystack.nodes import EmbeddingRetriever

from worker.constant import *


class Retriever(EmbeddingRetriever):
    def __init__(self, doc_store: FAISSDocumentStore):
        super().__init__(
            document_store=doc_store,
            embedding_model=EMBEDDING_MODEL,
            batch_size=16,
            api_key=OPENAI_API_KEY,
            max_seq_len=1024
        )
