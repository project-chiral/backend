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

from datetime import datetime
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, StrictBool, StrictStr, confloat, conlist

class UpdateEventDto(BaseModel):
    """
    UpdateEventDto
    """
    done: Optional[StrictBool] = None
    unresolved: Optional[conlist(Dict[str, Any])] = None
    name: Optional[StrictStr] = None
    description: Optional[StrictStr] = None
    color: Optional[StrictStr] = None
    unit: Optional[confloat(le=8, ge=0, strict=True)] = None
    start: Optional[datetime] = None
    end: Optional[datetime] = None
    __properties = ["done", "unresolved", "name", "description", "color", "unit", "start", "end"]

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
    def from_json(cls, json_str: str) -> UpdateEventDto:
        """Create an instance of UpdateEventDto from a JSON string"""
        return cls.from_dict(json.loads(json_str))

    def to_dict(self):
        """Returns the dictionary representation of the model using alias"""
        _dict = self.dict(by_alias=True,
                          exclude={
                          },
                          exclude_none=True)
        # set to None if description (nullable) is None
        # and __fields_set__ contains the field
        if self.description is None and "description" in self.__fields_set__:
            _dict['description'] = None

        return _dict

    @classmethod
    def from_dict(cls, obj: dict) -> UpdateEventDto:
        """Create an instance of UpdateEventDto from a dict"""
        if obj is None:
            return None

        if type(obj) is not dict:
            return UpdateEventDto.parse_obj(obj)

        _obj = UpdateEventDto.parse_obj({
            "done": obj.get("done"),
            "unresolved": obj.get("unresolved"),
            "name": obj.get("name"),
            "description": obj.get("description"),
            "color": obj.get("color"),
            "unit": obj.get("unit"),
            "start": obj.get("start"),
            "end": obj.get("end")
        })
        return _obj
