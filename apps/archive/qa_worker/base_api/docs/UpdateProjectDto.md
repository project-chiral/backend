# UpdateProjectDto


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | [optional] 
**description** | **str** |  | [optional] 

## Example

```python
from base_api.models.update_project_dto import UpdateProjectDto

# TODO update the JSON string below
json = "{}"
# create an instance of UpdateProjectDto from a JSON string
update_project_dto_instance = UpdateProjectDto.from_json(json)
# print the JSON string representation of the object
print UpdateProjectDto.to_json()

# convert the object into a dict
update_project_dto_dict = update_project_dto_instance.to_dict()
# create an instance of UpdateProjectDto from a dict
update_project_dto_form_dict = update_project_dto.from_dict(update_project_dto_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


