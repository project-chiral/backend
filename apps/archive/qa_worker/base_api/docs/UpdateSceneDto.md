# UpdateSceneDto


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | [optional] 
**description** | **str** |  | [optional] 

## Example

```python
from base_api.models.update_scene_dto import UpdateSceneDto

# TODO update the JSON string below
json = "{}"
# create an instance of UpdateSceneDto from a JSON string
update_scene_dto_instance = UpdateSceneDto.from_json(json)
# print the JSON string representation of the object
print UpdateSceneDto.to_json()

# convert the object into a dict
update_scene_dto_dict = update_scene_dto_instance.to_dict()
# create an instance of UpdateSceneDto from a dict
update_scene_dto_form_dict = update_scene_dto.from_dict(update_scene_dto_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


