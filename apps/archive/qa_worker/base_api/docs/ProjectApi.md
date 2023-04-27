# base_api.ProjectApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create**](ProjectApi.md#create) | **POST** /project | 
[**get**](ProjectApi.md#get) | **GET** /project | 
[**get_settings**](ProjectApi.md#get_settings) | **GET** /project/settings | 
[**get_workspace**](ProjectApi.md#get_workspace) | **GET** /project/workspace | 
[**remove**](ProjectApi.md#remove) | **DELETE** /project | 
[**update**](ProjectApi.md#update) | **PUT** /project | 
[**update_settings**](ProjectApi.md#update_settings) | **PUT** /project/settings | 
[**update_workspace**](ProjectApi.md#update_workspace) | **PUT** /project/workspace | 


# **create**
> ProjectEntity create(create_project_dto)



创建新项目

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
    api_instance = base_api.ProjectApi(api_client)
    create_project_dto = base_api.CreateProjectDto() # CreateProjectDto | 

    try:
        # 
        api_response = api_instance.create(create_project_dto)
        print("The response of ProjectApi->create:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ProjectApi->create: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **create_project_dto** | [**CreateProjectDto**](CreateProjectDto.md)|  | 

### Return type

[**ProjectEntity**](ProjectEntity.md)

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
> ProjectEntity get()



获取项目信息

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
    api_instance = base_api.ProjectApi(api_client)

    try:
        # 
        api_response = api_instance.get()
        print("The response of ProjectApi->get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ProjectApi->get: %s\n" % e)
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**ProjectEntity**](ProjectEntity.md)

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

# **get_settings**
> SettingsEntity get_settings()



获取项目设置

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
    api_instance = base_api.ProjectApi(api_client)

    try:
        # 
        api_response = api_instance.get_settings()
        print("The response of ProjectApi->get_settings:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ProjectApi->get_settings: %s\n" % e)
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**SettingsEntity**](SettingsEntity.md)

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

# **get_workspace**
> WorkspaceEntity get_workspace()



获取工作区信息

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
    api_instance = base_api.ProjectApi(api_client)

    try:
        # 
        api_response = api_instance.get_workspace()
        print("The response of ProjectApi->get_workspace:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ProjectApi->get_workspace: %s\n" % e)
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**WorkspaceEntity**](WorkspaceEntity.md)

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
> ProjectEntity remove()



删除项目

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
    api_instance = base_api.ProjectApi(api_client)

    try:
        # 
        api_response = api_instance.remove()
        print("The response of ProjectApi->remove:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ProjectApi->remove: %s\n" % e)
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**ProjectEntity**](ProjectEntity.md)

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
> ProjectEntity update(update_project_dto)



更新项目信息

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
    api_instance = base_api.ProjectApi(api_client)
    update_project_dto = base_api.UpdateProjectDto() # UpdateProjectDto | 

    try:
        # 
        api_response = api_instance.update(update_project_dto)
        print("The response of ProjectApi->update:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ProjectApi->update: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **update_project_dto** | [**UpdateProjectDto**](UpdateProjectDto.md)|  | 

### Return type

[**ProjectEntity**](ProjectEntity.md)

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

# **update_settings**
> SettingsEntity update_settings(update_settings_dto)



更新项目设置

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
    api_instance = base_api.ProjectApi(api_client)
    update_settings_dto = base_api.UpdateSettingsDto() # UpdateSettingsDto | 

    try:
        # 
        api_response = api_instance.update_settings(update_settings_dto)
        print("The response of ProjectApi->update_settings:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ProjectApi->update_settings: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **update_settings_dto** | [**UpdateSettingsDto**](UpdateSettingsDto.md)|  | 

### Return type

[**SettingsEntity**](SettingsEntity.md)

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

# **update_workspace**
> WorkspaceEntity update_workspace(update_workspace_dto)



更新工作区信息

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
    api_instance = base_api.ProjectApi(api_client)
    update_workspace_dto = base_api.UpdateWorkspaceDto() # UpdateWorkspaceDto | 

    try:
        # 
        api_response = api_instance.update_workspace(update_workspace_dto)
        print("The response of ProjectApi->update_workspace:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ProjectApi->update_workspace: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **update_workspace_dto** | [**UpdateWorkspaceDto**](UpdateWorkspaceDto.md)|  | 

### Return type

[**WorkspaceEntity**](WorkspaceEntity.md)

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

