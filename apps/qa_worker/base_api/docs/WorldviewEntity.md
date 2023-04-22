# WorldviewEntity


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**path** | **str** |  | 
**id** | **float** |  | 
**name** | **str** |  | 
**description** | **str** |  | 
**deleted** | **datetime** |  | 
**project_id** | **float** |  | 
**content_id** | **float** |  | 

## Example

```python
from base_api.models.worldview_entity import WorldviewEntity

# TODO update the JSON string below
json = "{}"
# create an instance of WorldviewEntity from a JSON string
worldview_entity_instance = WorldviewEntity.from_json(json)
# print the JSON string representation of the object
print WorldviewEntity.to_json()

# convert the object into a dict
worldview_entity_dict = worldview_entity_instance.to_dict()
# create an instance of WorldviewEntity from a dict
worldview_entity_form_dict = worldview_entity.from_dict(worldview_entity_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


