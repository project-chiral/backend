# graph_api.DefaultApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create_node**](DefaultApi.md#create_node) | **POST** /node | 
[**create_relation**](DefaultApi.md#create_relation) | **POST** /relation | 
[**create_relations**](DefaultApi.md#create_relations) | **POST** /relations | 
[**get_relations**](DefaultApi.md#get_relations) | **GET** /relations | 
[**get_test**](DefaultApi.md#get_test) | **GET** /test | 
[**remove_node**](DefaultApi.md#remove_node) | **DELETE** /node | 
[**remove_relation**](DefaultApi.md#remove_relation) | **DELETE** /relation | 


# **create_node**
> create_node(node_id_dto)



### Example

```python
from __future__ import print_function
import time
import os
import graph_api
from graph_api.rest import ApiException
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = graph_api.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with graph_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = graph_api.DefaultApi(api_client)
    node_id_dto = graph_api.NodeIdDto() # NodeIdDto | 

    try:
        api_instance.create_node(node_id_dto)
    except Exception as e:
        print("Exception when calling DefaultApi->create_node: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **node_id_dto** | [**NodeIdDto**](NodeIdDto.md)|  | 

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **create_relation**
> List[RelationEntity] create_relation(relation_id_dto)



### Example

```python
from __future__ import print_function
import time
import os
import graph_api
from graph_api.rest import ApiException
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = graph_api.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with graph_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = graph_api.DefaultApi(api_client)
    relation_id_dto = graph_api.RelationIdDto() # RelationIdDto | 

    try:
        api_response = api_instance.create_relation(relation_id_dto)
        print("The response of DefaultApi->create_relation:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->create_relation: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **relation_id_dto** | [**RelationIdDto**](RelationIdDto.md)|  | 

### Return type

[**List[RelationEntity]**](RelationEntity.md)

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

# **create_relations**
> List[object] create_relations()



### Example

```python
from __future__ import print_function
import time
import os
import graph_api
from graph_api.rest import ApiException
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = graph_api.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with graph_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = graph_api.DefaultApi(api_client)

    try:
        api_response = api_instance.create_relations()
        print("The response of DefaultApi->create_relations:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->create_relations: %s\n" % e)
```

### Parameters
This endpoint does not need any parameter.

### Return type

**List[object]**

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

# **get_relations**
> RelationsEntity get_relations(type, id)



### Example

```python
from __future__ import print_function
import time
import os
import graph_api
from graph_api.rest import ApiException
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = graph_api.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with graph_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = graph_api.DefaultApi(api_client)
    type = 'type_example' # str | 
    id = 3.4 # float | 

    try:
        api_response = api_instance.get_relations(type, id)
        print("The response of DefaultApi->get_relations:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->get_relations: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **type** | **str**|  | 
 **id** | **float**|  | 

### Return type

[**RelationsEntity**](RelationsEntity.md)

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

# **get_test**
> str get_test()



### Example

```python
from __future__ import print_function
import time
import os
import graph_api
from graph_api.rest import ApiException
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = graph_api.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with graph_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = graph_api.DefaultApi(api_client)

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

# **remove_node**
> remove_node(node_id_dto)



### Example

```python
from __future__ import print_function
import time
import os
import graph_api
from graph_api.rest import ApiException
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = graph_api.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with graph_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = graph_api.DefaultApi(api_client)
    node_id_dto = graph_api.NodeIdDto() # NodeIdDto | 

    try:
        api_instance.remove_node(node_id_dto)
    except Exception as e:
        print("Exception when calling DefaultApi->remove_node: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **node_id_dto** | [**NodeIdDto**](NodeIdDto.md)|  | 

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **remove_relation**
> List[RelationEntity] remove_relation(relation_id_dto)



### Example

```python
from __future__ import print_function
import time
import os
import graph_api
from graph_api.rest import ApiException
from pprint import pprint
# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = graph_api.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with graph_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = graph_api.DefaultApi(api_client)
    relation_id_dto = graph_api.RelationIdDto() # RelationIdDto | 

    try:
        api_response = api_instance.remove_relation(relation_id_dto)
        print("The response of DefaultApi->remove_relation:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->remove_relation: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **relation_id_dto** | [**RelationIdDto**](RelationIdDto.md)|  | 

### Return type

[**List[RelationEntity]**](RelationEntity.md)

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

