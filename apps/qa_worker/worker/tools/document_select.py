from typing import Tuple, Dict, Optional, List, Union

from haystack import BaseComponent, Document


class DocumentSelector(BaseComponent):
    outgoing_edges = 1

    def __init__(self, threshold=0, max_length=1024):
        super().__init__()
        self.threshold = threshold
        self.max_length = max_length

    def run(self, documents: Optional[List[Document]] = None, **kwargs) -> Tuple[Dict, str]:
        documents = documents or []
        documents = [doc for doc in documents if doc.score > self.threshold]

        content_length = sum([len(doc.content) for doc in documents])
        if content_length > self.max_length:
            # 文档过长使用摘要代替
            documents = [doc.meta['description'] for doc in documents]

        return {
            "documents": documents,
        }, 'output_1'

    def run_batch(
            self,
            documents: Optional[Union[List[Document], List[List[Document]]]] = None,
            **kwargs,
    ):
        pass
