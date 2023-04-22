# WorkspaceEntity


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **float** |  | 
**origin** | **str** |  | 
**layout** | **List[object]** |  | 
**lock** | **bool** |  | 
**project_id** | **float** |  | 

## Example

```python
from base_api.models.workspace_entity import WorkspaceEntity

# TODO update the JSON string below
json = "{}"
# create an instance of WorkspaceEntity from a JSON string
workspace_entity_instance = WorkspaceEntity.from_json(json)
# print the JSON string representation of the object
print WorkspaceEntity.to_json()

# convert the object into a dict
workspace_entity_dict = workspace_entity_instance.to_dict()
# create an instance of WorkspaceEntity from a dict
workspace_entity_form_dict = workspace_entity.from_dict(workspace_entity_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


