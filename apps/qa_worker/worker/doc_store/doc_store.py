from haystack.document_stores.faiss import FAISSDocumentStore

from worker.constant import *

FAISS_INDEX_PATH = 'faiss_index.faiss'
FAISS_CONFIG_PATH = 'faiss_config.json'


class DocStore(FAISSDocumentStore):
    def __init__(self):
        if os.path.exists(FAISS_INDEX_PATH) and os.path.exists(FAISS_CONFIG_PATH):
            super().__init__(
                faiss_index_path=FAISS_INDEX_PATH,
                faiss_config_path=FAISS_CONFIG_PATH
            )
        else:
            super().__init__(
                similarity="dot_product",
                embedding_dim=1024,
                sql_url=FAISS_URL,
                faiss_index_factory_str="Flat",
                return_embedding=True,
            )

    def close(self):
        self.save(
            index_path=FAISS_INDEX_PATH,
            config_path=FAISS_CONFIG_PATH,
        )
