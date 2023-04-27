from haystack.agents import Agent
from pydantic import BaseModel


class BaseQaReq(BaseModel):
    query: str
    max_steps: int = 10


class BaseQaHandler:
    def __init__(self, agent: Agent):
        self.agent = agent

    def process(self, req: BaseQaReq):
        result = self.agent.run(**req.dict())
        return result
