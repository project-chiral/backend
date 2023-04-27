# CreateSceneDto


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | 
**description** | **str** |  | [optional] 

## Example

```python
from base_api.models.create_scene_dto import CreateSceneDto

# TODO update the JSON string below
json = "{}"
# create an instance of CreateSceneDto from a JSON string
create_scene_dto_instance = CreateSceneDto.from_json(json)
# print the JSON string representation of the object
print CreateSceneDto.to_json()

# convert the object into a dict
create_scene_dto_dict = create_scene_dto_instance.to_dict()
# create an instance of CreateSceneDto from a dict
create_scene_dto_form_dict = create_scene_dto.from_dict(create_scene_dto_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


