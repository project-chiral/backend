# coding: utf-8

"""
    

    No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)  # noqa: E501

    The version of the OpenAPI document: 1.0.0
    Generated by OpenAPI Generator (https://openapi-generator.tech)

    Do not edit the class manually.
"""


import unittest

import base_api
from base_api.api.file_api import FileApi  # noqa: E501
from base_api.rest import ApiException


class TestFileApi(unittest.TestCase):
    """FileApi unit test stubs"""

    def setUp(self):
        self.api = base_api.api.file_api.FileApi()  # noqa: E501

    def tearDown(self):
        pass

    def test_remove(self):
        """Test case for remove

        """
        pass

    def test_upload(self):
        """Test case for upload

        """
        pass

    def test_upload_temp(self):
        """Test case for upload_temp

        """
        pass


if __name__ == '__main__':
    unittest.main()