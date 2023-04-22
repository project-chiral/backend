# UpdateEventDto


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**done** | **bool** |  | [optional] 
**unresolved** | **List[object]** |  | [optional] 
**name** | **str** |  | [optional] 
**description** | **str** |  | [optional] 
**color** | **str** |  | [optional] 
**unit** | **float** |  | [optional] 
**start** | **datetime** |  | [optional] 
**end** | **datetime** |  | [optional] 

## Example

```python
from base_api.models.update_event_dto import UpdateEventDto

# TODO update the JSON string below
json = "{}"
# create an instance of UpdateEventDto from a JSON string
update_event_dto_instance = UpdateEventDto.from_json(json)
# print the JSON string representation of the object
print UpdateEventDto.to_json()

# convert the object into a dict
update_event_dto_dict = update_event_dto_instance.to_dict()
# create an instance of UpdateEventDto from a dict
update_event_dto_form_dict = update_event_dto.from_dict(update_event_dto_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


