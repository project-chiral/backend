# base_api.EventApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create**](EventApi.md#create) | **POST** /event | 
[**create_todo**](EventApi.md#create_todo) | **POST** /event/{id}/todo | 
[**get**](EventApi.md#get) | **GET** /event/{id} | 
[**get_all**](EventApi.md#get_all) | **GET** /event/list | 
[**get_batch**](EventApi.md#get_batch) | **GET** /event/batch | 
[**get_by_range**](EventApi.md#get_by_range) | **GET** /event/list/range | 
[**get_content**](EventApi.md#get_content) | **GET** /event/{id}/content | 
[**get_todos**](EventApi.md#get_todos) | **GET** /event/{id}/todo | 
[**remove**](EventApi.md#remove) | **DELETE** /event/{id} | 
[**remove_todo**](EventApi.md#remove_todo) | **DELETE** /event/todo/{id} | 
[**search_by_name**](EventApi.md#search_by_name) | **GET** /event/search/name | 
[**search_content**](EventApi.md#search_content) | **GET** /event/search/content | 
[**update**](EventApi.md#update) | **PUT** /event/{id} | 
[**update_content**](EventApi.md#update_content) | **PUT** /event/{id}/content | 
[**update_todo**](EventApi.md#update_todo) | **PUT** /event/{id}/todo | 


# **create**
> EventEntity create(create_event_dto)



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
    api_instance = base_api.EventApi(api_client)
    create_event_dto = base_api.CreateEventDto() # CreateEventDto | 

    try:
        api_response = api_instance.create(create_event_dto)
        print("The response of EventApi->create:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling EventApi->create: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **create_event_dto** | [**CreateEventDto**](CreateEventDto.md)|  | 

### Return type

[**EventEntity**](EventEntity.md)

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

# **create_todo**
> EventTodoEntity create_todo(id, create_todo_dto)



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
    api_instance = base_api.EventApi(api_client)
    id = 3.4 # float | 
    create_todo_dto = base_api.CreateTodoDto() # CreateTodoDto | 

    try:
        api_response = api_instance.create_todo(id, create_todo_dto)
        print("The response of EventApi->create_todo:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling EventApi->create_todo: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **float**|  | 
 **create_todo_dto** | [**CreateTodoDto**](CreateTodoDto.md)|  | 

### Return type

[**EventTodoEntity**](EventTodoEntity.md)

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
> EventEntity get(id)



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
    api_instance = base_api.EventApi(api_client)
    id = 3.4 # float | 

    try:
        api_response = api_instance.get(id)
        print("The response of EventApi->get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling EventApi->get: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **float**|  | 

### Return type

[**EventEntity**](EventEntity.md)

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
> List[EventEntity] get_all()



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
    api_instance = base_api.EventApi(api_client)

    try:
        api_response = api_instance.get_all()
        print("The response of EventApi->get_all:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling EventApi->get_all: %s\n" % e)
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**List[EventEntity]**](EventEntity.md)

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

# **get_batch**
> List[EventEntity] get_batch(ids)



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
    api_instance = base_api.EventApi(api_client)
    ids = [3.4] # List[float] | 

    try:
        api_response = api_instance.get_batch(ids)
        print("The response of EventApi->get_batch:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling EventApi->get_batch: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ids** | [**List[float]**](float.md)|  | 

### Return type

[**List[EventEntity]**](EventEntity.md)

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

# **get_by_range**
> List[EventEntity] get_by_range(unit, start, end)



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
    api_instance = base_api.EventApi(api_client)
    unit = 3.4 # float | 
    start = '2013-10-20T19:20:30+01:00' # datetime | 
    end = '2013-10-20T19:20:30+01:00' # datetime | 

    try:
        api_response = api_instance.get_by_range(unit, start, end)
        print("The response of EventApi->get_by_range:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling EventApi->get_by_range: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **unit** | **float**|  | 
 **start** | **datetime**|  | 
 **end** | **datetime**|  | 

### Return type

[**List[EventEntity]**](EventEntity.md)

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

# **get_content**
> EventContentEntity get_content(id)



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
    api_instance = base_api.EventApi(api_client)
    id = 3.4 # float | 

    try:
        api_response = api_instance.get_content(id)
        print("The response of EventApi->get_content:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling EventApi->get_content: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **float**|  | 

### Return type

[**EventContentEntity**](EventContentEntity.md)

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

# **get_todos**
> List[EventTodoEntity] get_todos(id)



获取某个事件的全部todo项

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
    api_instance = base_api.EventApi(api_client)
    id = 3.4 # float | 

    try:
        # 
        api_response = api_instance.get_todos(id)
        print("The response of EventApi->get_todos:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling EventApi->get_todos: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **float**|  | 

### Return type

[**List[EventTodoEntity]**](EventTodoEntity.md)

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
> EventEntity remove(id)



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
    api_instance = base_api.EventApi(api_client)
    id = 3.4 # float | 

    try:
        api_response = api_instance.remove(id)
        print("The response of EventApi->remove:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling EventApi->remove: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **float**|  | 

### Return type

[**EventEntity**](EventEntity.md)

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

# **remove_todo**
> EventTodoEntity remove_todo(id)



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
    api_instance = base_api.EventApi(api_client)
    id = 3.4 # float | 

    try:
        api_response = api_instance.remove_todo(id)
        print("The response of EventApi->remove_todo:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling EventApi->remove_todo: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **float**|  | 

### Return type

[**EventTodoEntity**](EventTodoEntity.md)

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
> List[EventEntity] search_by_name(text)



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
    api_instance = base_api.EventApi(api_client)
    text = 'text_example' # str | 

    try:
        api_response = api_instance.search_by_name(text)
        print("The response of EventApi->search_by_name:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling EventApi->search_by_name: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **text** | **str**|  | 

### Return type

[**List[EventEntity]**](EventEntity.md)

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

# **search_content**
> List[EventEntity] search_content(text)



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
    api_instance = base_api.EventApi(api_client)
    text = 'text_example' # str | 

    try:
        api_response = api_instance.search_content(text)
        print("The response of EventApi->search_content:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling EventApi->search_content: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **text** | **str**|  | 

### Return type

[**List[EventEntity]**](EventEntity.md)

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
> EventEntity update(id, update_event_dto)



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
    api_instance = base_api.EventApi(api_client)
    id = 3.4 # float | 
    update_event_dto = base_api.UpdateEventDto() # UpdateEventDto | 

    try:
        api_response = api_instance.update(id, update_event_dto)
        print("The response of EventApi->update:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling EventApi->update: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **float**|  | 
 **update_event_dto** | [**UpdateEventDto**](UpdateEventDto.md)|  | 

### Return type

[**EventEntity**](EventEntity.md)

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

# **update_content**
> EventContentEntity update_content(id, update_content_dto)



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
    api_instance = base_api.EventApi(api_client)
    id = 3.4 # float | 
    update_content_dto = base_api.UpdateContentDto() # UpdateContentDto | 

    try:
        api_response = api_instance.update_content(id, update_content_dto)
        print("The response of EventApi->update_content:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling EventApi->update_content: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **float**|  | 
 **update_content_dto** | [**UpdateContentDto**](UpdateContentDto.md)|  | 

### Return type

[**EventContentEntity**](EventContentEntity.md)

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

# **update_todo**
> EventTodoEntity update_todo(id, update_todo_dto)



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
    api_instance = base_api.EventApi(api_client)
    id = 3.4 # float | 
    update_todo_dto = base_api.UpdateTodoDto() # UpdateTodoDto | 

    try:
        api_response = api_instance.update_todo(id, update_todo_dto)
        print("The response of EventApi->update_todo:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling EventApi->update_todo: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **float**|  | 
 **update_todo_dto** | [**UpdateTodoDto**](UpdateTodoDto.md)|  | 

### Return type

[**EventTodoEntity**](EventTodoEntity.md)

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

