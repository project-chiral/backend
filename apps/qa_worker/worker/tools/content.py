from haystack import Pipeline
from haystack.agents import Tool
from haystack.nodes import EmbeddingRetriever

from worker.tools.document_select import DocumentSelector
from worker.tools.json_transform import JsonTransformer

content_description = """retrieves several events that are most relevant to a given query and returns their specific 
    description information, which can be used as a basis for obtaining the final answer.
    
    Input format:
    
    ```json
    {
        "query": "user query"
    }
    ```
    
    Output format:
    
    ```json
    [
        { "id": 1, "content": "event 1 content" },
        { "id": 2, "content": "event 2 content" }
    ]
    ```"""


class ContentRetrievalTool(Tool):
    def __init__(self, retriever: EmbeddingRetriever):
        pipeline = Pipeline()
        pipeline.add_node(component=retriever, name="Retriever", inputs=["Query"])
        pipeline.add_node(component=DocumentSelector(), name="DocumentSelector", inputs=["Retriever"])
        pipeline.add_node(component=JsonTransformer(), name="JsonTransformer", inputs=["DocumentSelector"])

        super().__init__(
            name="content retrieval tool",
            description=content_description,
            pipeline_or_node=pipeline,
            output_variable="json"
        )
