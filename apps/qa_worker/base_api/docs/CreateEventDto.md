# CreateEventDto


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | 
**description** | **str** |  | 
**color** | **str** |  | 
**unit** | **float** |  | 
**start** | **datetime** |  | 
**end** | **datetime** |  | 

## Example

```python
from base_api.models.create_event_dto import CreateEventDto

# TODO update the JSON string below
json = "{}"
# create an instance of CreateEventDto from a JSON string
create_event_dto_instance = CreateEventDto.from_json(json)
# print the JSON string representation of the object
print CreateEventDto.to_json()

# convert the object into a dict
create_event_dto_dict = create_event_dto_instance.to_dict()
# create an instance of CreateEventDto from a dict
create_event_dto_form_dict = create_event_dto.from_dict(create_event_dto_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


