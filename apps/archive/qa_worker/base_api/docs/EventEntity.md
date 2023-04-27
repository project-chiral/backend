# EventEntity


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **str** |  | 
**id** | **float** |  | 
**name** | **str** |  | 
**description** | **str** |  | 
**color** | **str** |  | 
**serial** | **float** |  | 
**created_at** | **datetime** |  | 
**updated_at** | **datetime** |  | 
**deleted** | **datetime** |  | 
**unit** | **float** |  | 
**start** | **datetime** |  | 
**end** | **datetime** |  | 
**done** | **bool** |  | 
**unresolved** | **object** |  | 
**content_id** | **float** |  | 
**project_id** | **float** |  | 

## Example

```python
from base_api.models.event_entity import EventEntity

# TODO update the JSON string below
json = "{}"
# create an instance of EventEntity from a JSON string
event_entity_instance = EventEntity.from_json(json)
# print the JSON string representation of the object
print EventEntity.to_json()

# convert the object into a dict
event_entity_dict = event_entity_instance.to_dict()
# create an instance of EventEntity from a dict
event_entity_form_dict = event_entity.from_dict(event_entity_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


