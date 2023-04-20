from typing import List

from haystack import Document
from haystack.document_stores.faiss import FAISSDocumentStore
from haystack.nodes import EmbeddingRetriever

from worker.constant import *

FAISS_INDEX_PATH = 'faiss_index.faiss'
FAISS_CONFIG_PATH = 'faiss_config.json'


def load_document_store():
    if os.path.exists(FAISS_INDEX_PATH) and os.path.exists(FAISS_CONFIG_PATH):
        return FAISSDocumentStore.load(
            index_path=FAISS_INDEX_PATH,
            config_path=FAISS_CONFIG_PATH
        )
    else:
        return FAISSDocumentStore(
            similarity="dot_product",
            embedding_dim=1024,
            sql_url=FAISS_URL,
            faiss_index_factory_str="Flat",
            return_embedding=True,
        )


class Retriever:
    def __init__(self):
        self.document_store = load_document_store()
        self.retriever = EmbeddingRetriever(
            document_store=self.document_store,
            embedding_model=EMBEDDING_MODEL,
            batch_size=16,
            api_key=OPENAI_API_KEY,
            max_seq_len=1024
        )

    def write(self, documents: List[Document]):
        self.document_store.write_documents(documents)
        self.document_store.update_embeddings(retriever=self.retriever)

    def delete(self, ids: List[int]):
        self.document_store.delete_documents(ids=[f"{id}" for id in ids])
        self.document_store.update_embeddings(retriever=self.retriever)

    def close(self):
        self.document_store.save(
            index_path=FAISS_INDEX_PATH,
            config_path=FAISS_CONFIG_PATH
        )

    def retrieve(self, query: str, top_k: int = 10) -> List[Document]:
        return self.retriever.retrieve(
            query=query,
            top_k=top_k,
            scale_score=True,
        )


if __name__ == '__main__':
    retriever = Retriever()
    try:
        result = retriever.retrieve("毛泽东的相关事迹", top_k=1)
        for r in result:
            print(r)
    finally:
        retriever.close()
