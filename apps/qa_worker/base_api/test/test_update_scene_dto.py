# coding: utf-8

"""
    

    No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)  # noqa: E501

    The version of the OpenAPI document: 1.0.0
    Generated by OpenAPI Generator (https://openapi-generator.tech)

    Do not edit the class manually.
"""


import unittest
import datetime

import base_api
from base_api.models.update_scene_dto import UpdateSceneDto  # noqa: E501
from base_api.rest import ApiException

class TestUpdateSceneDto(unittest.TestCase):
    """UpdateSceneDto unit test stubs"""

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def make_instance(self, include_optional):
        """Test UpdateSceneDto
            include_option is a boolean, when False only required
            params are included, when True both required and
            optional params are included """
        # uncomment below to create an instance of `UpdateSceneDto`
        """
        model = base_api.models.update_scene_dto.UpdateSceneDto()  # noqa: E501
        if include_optional :
            return UpdateSceneDto(
                name = '', 
                description = ''
            )
        else :
            return UpdateSceneDto(
        )
        """

    def testUpdateSceneDto(self):
        """Test UpdateSceneDto"""
        # inst_req_only = self.make_instance(include_optional=False)
        # inst_req_and_optional = self.make_instance(include_optional=True)

if __name__ == '__main__':
    unittest.main()