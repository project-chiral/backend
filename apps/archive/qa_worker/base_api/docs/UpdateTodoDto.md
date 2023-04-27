# UpdateTodoDto


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**color** | **str** |  | [optional] 
**checked** | **bool** |  | [optional] 

## Example

```python
from base_api.models.update_todo_dto import UpdateTodoDto

# TODO update the JSON string below
json = "{}"
# create an instance of UpdateTodoDto from a JSON string
update_todo_dto_instance = UpdateTodoDto.from_json(json)
# print the JSON string representation of the object
print UpdateTodoDto.to_json()

# convert the object into a dict
update_todo_dto_dict = update_todo_dto_instance.to_dict()
# create an instance of UpdateTodoDto from a dict
update_todo_dto_form_dict = update_todo_dto.from_dict(update_todo_dto_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


