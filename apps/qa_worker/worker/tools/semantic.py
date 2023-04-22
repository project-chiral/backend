from typing import Tuple, Dict, Optional, List, Union

from haystack import Pipeline, BaseComponent, Document
from haystack.agents import Tool
from haystack.nodes import EmbeddingRetriever

from worker.tools.json_transform import JsonTransformer


class DocumentSelector(BaseComponent):
    outgoing_edges = 1

    def __init__(self, threshold: float = 0.5):
        super().__init__()
        self.threshold = threshold

    def run(
            self,
            documents: Optional[List[Document]] = None,
            **kwargs,
    ) -> Tuple[Dict, str]:
        documents = documents or []
        documents = [doc for doc in documents if doc.score > self.threshold]

        content_length = sum([len(doc.content) for doc in documents])
        if content_length > 1024:
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


class SemanticSearchTool(Tool):
    def __init__(self, retriever: EmbeddingRetriever):
        pipeline = Pipeline()
        pipeline.add_node(component=retriever, name="Retriever", inputs=["Query"])
        pipeline.add_node(component=DocumentSelector(), name="DocumentSelector", inputs=["Retriever"])
        pipeline.add_node(component=JsonTransformer(), name="JsonTransformer", inputs=["DocumentSelector"])

        super().__init__(
            name="semantic_search",
            description="Useful when you are searching for semantic similarity between the current query statement "
                        "and other statements.",
            pipeline_or_node=pipeline,
            output_variable="json"
        )
