# UpdateWorkspaceDto


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**origin** | **str** |  | [optional] 
**layout** | **List[object]** |  | [optional] 
**lock** | **bool** |  | [optional] 

## Example

```python
from base_api.models.update_workspace_dto import UpdateWorkspaceDto

# TODO update the JSON string below
json = "{}"
# create an instance of UpdateWorkspaceDto from a JSON string
update_workspace_dto_instance = UpdateWorkspaceDto.from_json(json)
# print the JSON string representation of the object
print UpdateWorkspaceDto.to_json()

# convert the object into a dict
update_workspace_dto_dict = update_workspace_dto_instance.to_dict()
# create an instance of UpdateWorkspaceDto from a dict
update_workspace_dto_form_dict = update_workspace_dto.from_dict(update_workspace_dto_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


