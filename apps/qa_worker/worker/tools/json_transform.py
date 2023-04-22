import json
from typing import Optional, Union, List, Tuple, Dict

from haystack import BaseComponent, Document, Pipeline


class JsonTransformer(BaseComponent):
    outgoing_edges = 1

    def run(self, documents: Optional[List[Document]] = None, **kwargs) -> Tuple[Dict, str]:
        docs = [{'id': d.id, 'content': d.content} for d in documents]
        return {'json': json.dumps(docs, ensure_ascii=False, indent=2)}, 'output_1'

    def run_batch(
            self,
            documents: Optional[Union[List[Document], List[List[Document]]]] = None,
            **kwargs,
    ):
        pass


if __name__ == "__main__":
    transformer = JsonTransformer()
    p = Pipeline()
    p.add_node(component=transformer, name="JsonTransformer", inputs=["Query"])

    documents = [
        Document(id="1", content="This is a test"),
        Document(id="2", content="This is another test"),
    ]

    result = p.run(documents=documents)
    print(result['json'])
