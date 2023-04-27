from typing import Optional, List, Tuple, Dict, Union

from haystack import BaseComponent, Document, Pipeline


class TestNode(BaseComponent):
    outgoing_edges = 1

    def __init__(self):
        super().__init__()

    def run(
            self,
            documents: Optional[List[Document]] = None,
            **kwargs
    ) -> Tuple[Dict, str]:
        return {
            "fuck": [d.id for d in documents]
        }, "output_1"

    def run_batch(
            self,
            documents: Optional[Union[List[Document], List[List[Document]]]] = None,
            **kwargs
    ):
        return {}


class TestNode2(BaseComponent):
    outgoing_edges = 1

    def __init__(self):
        super().__init__()

    def run(
            self,
            **kwargs
    ) -> Tuple[Dict, str]:
        print(kwargs)
        return {
            "result": ''.join(kwargs['fuck'])
        }, "output_1"

    def run_batch(
            self,
            **kwargs
    ):
        return {}


if __name__ == "__main__":
    p = Pipeline()
    p.add_node(TestNode(), name="test", inputs=["Query"])
    p.add_node(TestNode2(), name="test2", inputs=["test"])
    result = p.run(documents=[
        Document(id="1", content=""),
        Document(id="2", content="")
    ])
    print(result)
