# EventContentEntity


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **float** |  | 
**updated_at** | **datetime** |  | 
**content** | **str** |  | 
**cover** | **str** |  | 
**event_id** | **float** |  | 

## Example

```python
from base_api.models.event_content_entity import EventContentEntity

# TODO update the JSON string below
json = "{}"
# create an instance of EventContentEntity from a JSON string
event_content_entity_instance = EventContentEntity.from_json(json)
# print the JSON string representation of the object
print EventContentEntity.to_json()

# convert the object into a dict
event_content_entity_dict = event_content_entity_instance.to_dict()
# create an instance of EventContentEntity from a dict
event_content_entity_form_dict = event_content_entity.from_dict(event_content_entity_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


