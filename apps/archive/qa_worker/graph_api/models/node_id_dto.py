# coding: utf-8

"""
    

    No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)  # noqa: E501

    The version of the OpenAPI document: 1.0.0
    Generated by OpenAPI Generator (https://openapi-generator.tech)

    Do not edit the class manually.
"""


from __future__ import annotations
from inspect import getfullargspec
import pprint
import re  # noqa: F401
import json



from pydantic import BaseModel, StrictFloat, StrictStr, validator

class NodeIdDto(BaseModel):
    """
    NodeIdDto
    """
    type: StrictStr = ...
    id: StrictFloat = ...
    __properties = ["type", "id"]

    @validator('type')
    def type_validate_enum(cls, v):
        if v not in ('EVENT', 'CHARA', 'SCENE'):
            raise ValueError("must be one of enum values ('EVENT', 'CHARA', 'SCENE')")
        return v

    class Config:
        allow_population_by_field_name = True
        validate_assignment = True

    def to_str(self) -> str:
        """Returns the string representation of the model using alias"""
        return pprint.pformat(self.dict(by_alias=True))

    def to_json(self) -> str:
        """Returns the JSON representation of the model using alias"""
        return json.dumps(self.to_dict())

    @classmethod
    def from_json(cls, json_str: str) -> NodeIdDto:
        """Create an instance of NodeIdDto from a JSON string"""
        return cls.from_dict(json.loads(json_str))

    def to_dict(self):
        """Returns the dictionary representation of the model using alias"""
        _dict = self.dict(by_alias=True,
                          exclude={
                          },
                          exclude_none=True)
        return _dict

    @classmethod
    def from_dict(cls, obj: dict) -> NodeIdDto:
        """Create an instance of NodeIdDto from a dict"""
        if obj is None:
            return None

        if type(obj) is not dict:
            return NodeIdDto.parse_obj(obj)

        _obj = NodeIdDto.parse_obj({
            "type": obj.get("type"),
            "id": obj.get("id")
        })
        return _obj
