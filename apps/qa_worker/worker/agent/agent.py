from typing import List

from haystack.agents import Agent, Tool
from haystack.nodes import PromptTemplate

qa_template = PromptTemplate(
    prompt_text=""""""
)


class QaAgent(Agent):
    def __init__(self, tools: List[Tool]):
        super().__init__(
            prompt_template=qa_template,
            tools=tools
        )
