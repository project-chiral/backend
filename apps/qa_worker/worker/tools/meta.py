from haystack.agents import Tool
from haystack.document_stores import FAISSDocumentStore


class MetaSearchTool(Tool):
    def __init__(self, doc_store: FAISSDocumentStore):
        super().__init__(
            name="meta_info_search",
            description="",
            pipeline_or_node=None,
        )