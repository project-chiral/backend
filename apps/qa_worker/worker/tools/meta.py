from haystack import Pipeline
from haystack.agents import Tool
from haystack.document_stores import FAISSDocumentStore

from worker.tools.json_transform import JsonTransformer

meta_description = """retrieves the metadata of a specified event.
    
    All possible metadata includes:
    
    - `start`: start time represented in valid UTC format;
    - `end`: end time represented in valid UTC format;
    - `title`: event title;
    
    Input format:
    
    ```json
    [1, 2]
    ```
    
    Output format:
    
    ```json
    [
        {
            "id": 1,
            "start":"2021-11-01 16:00:00.000",
            "end":"2021-11-05 15:59:59.999",
            "title":"event1"
        },
        {
            "id": 2,
            "start":"2021-12-31 16:00:00.000",
            "end":"2022-02-05 15:59:59.999",
            "title":"event2"
        },	
    ]
    ```"""


class MetaRetrievalTool(Tool):
    def __init__(self, doc_store: FAISSDocumentStore):
        pipeline = Pipeline()

        pipeline.add_node(JsonTransformer(), name="JsonTransformer", inputs=["Input"])

        super().__init__(
            name="metadata retrieval tool",
            description=meta_description,
            pipeline_or_node=pipeline,
        )
