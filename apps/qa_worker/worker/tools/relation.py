from haystack import Pipeline
from haystack.agents import Tool
from haystack.document_stores import FAISSDocumentStore

from worker.tools.json_transform import JsonTransformer

relation_description = """obtains which other events have a specified relationship with a particular specified 
    event (e.g., what results were caused by Event A).
    
    All possible types of relationships include:
    - `LED_TO`: causal relationship;
    - `AFFECTED`: related relationship;
    - `HAPPENED_AFTER`: temporal succession relationship;
    
    Input format:
     
     ```json
     {
         "type": "LED_TO",
         "from": 1
     }
     ```
    
    Output format:
    
    ```json
    [
        { "id": 1, "content": "event 1 content" },
        { "id": 2, "content":"event 2 content"}
    ]
    ```"""


class RelationRetrievalTool(Tool):
    def __init__(self, doc_store: FAISSDocumentStore):
        pipeline = Pipeline()
        pipeline.add_node(JsonTransformer(), name="JsonTransformer", inputs=["Input"])

        super().__init__(
            name="relationship retrieval tool",
            description=relation_description,
            pipeline_or_node=pipeline,
            output_variable="json"
        )
