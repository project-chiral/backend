from typing import Any

from pydantic import BaseModel


class RmqResponse(BaseModel):
    code: int = 0
    message: str = ''
    data: Any
