# base_api.SceneApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create**](SceneApi.md#create) | **POST** /scene | 
[**get**](SceneApi.md#get) | **GET** /scene/{id} | 
[**remove**](SceneApi.md#remove) | **DELETE** /scene/{id} | 
[**search_by_name**](SceneApi.md#search_by_name) | **GET** /scene/search/name | 
[**update**](SceneApi.md#update) | **PUT** /scene/{id} | 


# **create**
> SceneEntity create(create_scene_dto)



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
    api_instance = base_api.SceneApi(api_client)
    create_scene_dto = base_api.CreateSceneDto() # CreateSceneDto | 

    try:
        api_response = api_instance.create(create_scene_dto)
        print("The response of SceneApi->create:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SceneApi->create: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **create_scene_dto** | [**CreateSceneDto**](CreateSceneDto.md)|  | 

### Return type

[**SceneEntity**](SceneEntity.md)

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

# **get**
> SceneEntity get(id)



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
    api_instance = base_api.SceneApi(api_client)
    id = 3.4 # float | 

    try:
        api_response = api_instance.get(id)
        print("The response of SceneApi->get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SceneApi->get: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **float**|  | 

### Return type

[**SceneEntity**](SceneEntity.md)

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

# **remove**
> SceneEntity remove(id)



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
    api_instance = base_api.SceneApi(api_client)
    id = 3.4 # float | 

    try:
        api_response = api_instance.remove(id)
        print("The response of SceneApi->remove:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SceneApi->remove: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **float**|  | 

### Return type

[**SceneEntity**](SceneEntity.md)

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

# **search_by_name**
> List[SceneEntity] search_by_name(text)



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
    api_instance = base_api.SceneApi(api_client)
    text = 'text_example' # str | 

    try:
        api_response = api_instance.search_by_name(text)
        print("The response of SceneApi->search_by_name:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SceneApi->search_by_name: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **text** | **str**|  | 

### Return type

[**List[SceneEntity]**](SceneEntity.md)

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

# **update**
> SceneEntity update(id, update_scene_dto)



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
    api_instance = base_api.SceneApi(api_client)
    id = 3.4 # float | 
    update_scene_dto = base_api.UpdateSceneDto() # UpdateSceneDto | 

    try:
        api_response = api_instance.update(id, update_scene_dto)
        print("The response of SceneApi->update:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SceneApi->update: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **float**|  | 
 **update_scene_dto** | [**UpdateSceneDto**](UpdateSceneDto.md)|  | 

### Return type

[**SceneEntity**](SceneEntity.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

