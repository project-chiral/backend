# EventTodoEntity


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **float** |  | 
**title** | **str** |  | 
**color** | **str** |  | 
**checked** | **bool** |  | 
**event_id** | **float** |  | 

## Example

```python
from base_api.models.event_todo_entity import EventTodoEntity

# TODO update the JSON string below
json = "{}"
# create an instance of EventTodoEntity from a JSON string
event_todo_entity_instance = EventTodoEntity.from_json(json)
# print the JSON string representation of the object
print EventTodoEntity.to_json()

# convert the object into a dict
event_todo_entity_dict = event_todo_entity_instance.to_dict()
# create an instance of EventTodoEntity from a dict
event_todo_entity_form_dict = event_todo_entity.from_dict(event_todo_entity_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


