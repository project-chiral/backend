# base_api.DefaultApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_test**](DefaultApi.md#get_test) | **GET** /test | 
[**resolve_entities**](DefaultApi.md#resolve_entities) | **POST** /ai/{id}/entities | 
[**summarize_desc**](DefaultApi.md#summarize_desc) | **POST** /ai/{id}/summarize/desc | 
[**summarize_title**](DefaultApi.md#summarize_title) | **POST** /ai/{id}/summarize/title | 


# **get_test**
> str get_test()



### Example

```python
from __future__ import print_function
import time
import os
import base_api
from base_api.rest import ApiException
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = base_api.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with base_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = base_api.DefaultApi(api_client)

    try:
        api_response = api_instance.get_test()
        print("The response of DefaultApi->get_test:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->get_test: %s\n" % e)
```

### Parameters
This endpoint does not need any parameter.

### Return type

**str**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **resolve_entities**
> List[UnresolvedEntityDto] resolve_entities(id)



### Example

```python
from __future__ import print_function
import time
import os
import base_api
from base_api.rest import ApiException
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = base_api.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with base_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = base_api.DefaultApi(api_client)
    id = 3.4 # float | 

    try:
        api_response = api_instance.resolve_entities(id)
        print("The response of DefaultApi->resolve_entities:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->resolve_entities: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **float**|  | 

### Return type

[**List[UnresolvedEntityDto]**](UnresolvedEntityDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **summarize_desc**
> str summarize_desc(id, body)



### Example

```python
from __future__ import print_function
import time
import os
import base_api
from base_api.rest import ApiException
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = base_api.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with base_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = base_api.DefaultApi(api_client)
    id = 3.4 # float | 
    body = None # object | 

    try:
        api_response = api_instance.summarize_desc(id, body)
        print("The response of DefaultApi->summarize_desc:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->summarize_desc: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **float**|  | 
 **body** | **object**|  | 

### Return type

**str**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **summarize_title**
> str summarize_title(id)



### Example

```python
from __future__ import print_function
import time
import os
import base_api
from base_api.rest import ApiException
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = base_api.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with base_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = base_api.DefaultApi(api_client)
    id = 3.4 # float | 

    try:
        api_response = api_instance.summarize_title(id)
        print("The response of DefaultApi->summarize_title:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->summarize_title: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **float**|  | 

### Return type

**str**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

