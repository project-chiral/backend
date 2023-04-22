from haystack import Pipeline
from haystack.agents import Tool
from haystack.document_stores import FAISSDocumentStore

from worker.tools.json_transform import JsonTransformer

hierarchy_description = """when known information about events is insufficient to answer a question, this tool can be 
    used to retrieve several sub-events of certain specified events and obtain their description information. This 
    information will provide more descriptions of the contents of events.
    
    Input format:
    
    ```json
    [ 1, 2 ]
    ```
    
    Output format:
    
    ```json
    [
        { "id": 3, "content": "sub-event 1.1 content" },
        { "id": 4, "content":"sub-event 1.2 content"}
    ]
    ```"""


class HierarchyRetrievalTool(Tool):
    def __init__(self, doc_store: FAISSDocumentStore):
        pipeline = Pipeline()
        pipeline.add_node(JsonTransformer(), name="JsonTransformer", inputs=["Input"])

        super().__init__(
            name="hierarchy retrieval tool",
            description=hierarchy_description,
            pipeline_or_node=pipeline,
            output_variable="json"
        )
