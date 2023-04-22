# SceneEntity


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **float** |  | 
**name** | **str** |  | 
**alias** | **List[str]** |  | 
**description** | **str** |  | 
**deleted** | **datetime** |  | 
**super_id** | **float** |  | 
**project_id** | **float** |  | 

## Example

```python
from base_api.models.scene_entity import SceneEntity

# TODO update the JSON string below
json = "{}"
# create an instance of SceneEntity from a JSON string
scene_entity_instance = SceneEntity.from_json(json)
# print the JSON string representation of the object
print SceneEntity.to_json()

# convert the object into a dict
scene_entity_dict = scene_entity_instance.to_dict()
# create an instance of SceneEntity from a dict
scene_entity_form_dict = scene_entity.from_dict(scene_entity_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


