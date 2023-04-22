# base_api.CharaApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create**](CharaApi.md#create) | **POST** /chara | 
[**get**](CharaApi.md#get) | **GET** /chara/{id} | 
[**get_all**](CharaApi.md#get_all) | **GET** /chara | 
[**remove**](CharaApi.md#remove) | **DELETE** /chara/{id} | 
[**search_by_name**](CharaApi.md#search_by_name) | **GET** /chara/search/name/{name} | 
[**update**](CharaApi.md#update) | **PATCH** /chara/{id} | 


# **create**
> CharaEntity create(create_chara_dto)



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
    api_instance = base_api.CharaApi(api_client)
    create_chara_dto = base_api.CreateCharaDto() # CreateCharaDto | 

    try:
        api_response = api_instance.create(create_chara_dto)
        print("The response of CharaApi->create:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CharaApi->create: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **create_chara_dto** | [**CreateCharaDto**](CreateCharaDto.md)|  | 

### Return type

[**CharaEntity**](CharaEntity.md)

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
> CharaEntity get(id)



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
    api_instance = base_api.CharaApi(api_client)
    id = 3.4 # float | 

    try:
        api_response = api_instance.get(id)
        print("The response of CharaApi->get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CharaApi->get: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **float**|  | 

### Return type

[**CharaEntity**](CharaEntity.md)

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
> List[CharaEntity] get_all()



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
    api_instance = base_api.CharaApi(api_client)

    try:
        api_response = api_instance.get_all()
        print("The response of CharaApi->get_all:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CharaApi->get_all: %s\n" % e)
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**List[CharaEntity]**](CharaEntity.md)

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
> CharaEntity remove(id)



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
    api_instance = base_api.CharaApi(api_client)
    id = 3.4 # float | 

    try:
        api_response = api_instance.remove(id)
        print("The response of CharaApi->remove:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CharaApi->remove: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **float**|  | 

### Return type

[**CharaEntity**](CharaEntity.md)

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
> List[CharaEntity] search_by_name(name)



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
    api_instance = base_api.CharaApi(api_client)
    name = 'name_example' # str | 

    try:
        api_response = api_instance.search_by_name(name)
        print("The response of CharaApi->search_by_name:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CharaApi->search_by_name: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **str**|  | 

### Return type

[**List[CharaEntity]**](CharaEntity.md)

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
> CharaEntity update(id, update_chara_dto)



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
    api_instance = base_api.CharaApi(api_client)
    id = 3.4 # float | 
    update_chara_dto = base_api.UpdateCharaDto() # UpdateCharaDto | 

    try:
        api_response = api_instance.update(id, update_chara_dto)
        print("The response of CharaApi->update:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CharaApi->update: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **float**|  | 
 **update_chara_dto** | [**UpdateCharaDto**](UpdateCharaDto.md)|  | 

### Return type

[**CharaEntity**](CharaEntity.md)

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

