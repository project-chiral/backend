# base_api.WorldviewApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create**](WorldviewApi.md#create) | **POST** /worldview | 
[**get**](WorldviewApi.md#get) | **GET** /worldview/{id} | 
[**get_all**](WorldviewApi.md#get_all) | **GET** /worldview | 
[**remove**](WorldviewApi.md#remove) | **DELETE** /worldview/{id} | 
[**update**](WorldviewApi.md#update) | **POST** /worldview/{id} | 


# **create**
> WorldviewEntity create(create_worldview_dto)



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
    api_instance = base_api.WorldviewApi(api_client)
    create_worldview_dto = base_api.CreateWorldviewDto() # CreateWorldviewDto | 

    try:
        api_response = api_instance.create(create_worldview_dto)
        print("The response of WorldviewApi->create:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorldviewApi->create: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **create_worldview_dto** | [**CreateWorldviewDto**](CreateWorldviewDto.md)|  | 

### Return type

[**WorldviewEntity**](WorldviewEntity.md)

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
> WorldviewEntity get(id)



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
    api_instance = base_api.WorldviewApi(api_client)
    id = 3.4 # float | 

    try:
        api_response = api_instance.get(id)
        print("The response of WorldviewApi->get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorldviewApi->get: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **float**|  | 

### Return type

[**WorldviewEntity**](WorldviewEntity.md)

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

# **get_all**
> List[WorldviewEntity] get_all()



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
    api_instance = base_api.WorldviewApi(api_client)

    try:
        api_response = api_instance.get_all()
        print("The response of WorldviewApi->get_all:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorldviewApi->get_all: %s\n" % e)
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**List[WorldviewEntity]**](WorldviewEntity.md)

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
> WorldviewEntity remove(id)



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
    api_instance = base_api.WorldviewApi(api_client)
    id = 3.4 # float | 

    try:
        api_response = api_instance.remove(id)
        print("The response of WorldviewApi->remove:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorldviewApi->remove: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **float**|  | 

### Return type

[**WorldviewEntity**](WorldviewEntity.md)

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
> WorldviewEntity update(id, update_worldview_dto)



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
    api_instance = base_api.WorldviewApi(api_client)
    id = 3.4 # float | 
    update_worldview_dto = base_api.UpdateWorldviewDto() # UpdateWorldviewDto | 

    try:
        api_response = api_instance.update(id, update_worldview_dto)
        print("The response of WorldviewApi->update:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WorldviewApi->update: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **float**|  | 
 **update_worldview_dto** | [**UpdateWorldviewDto**](UpdateWorldviewDto.md)|  | 

### Return type

[**WorldviewEntity**](WorldviewEntity.md)

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

