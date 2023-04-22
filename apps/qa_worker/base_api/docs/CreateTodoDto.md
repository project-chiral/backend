# CreateTodoDto


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**title** | **str** |  | 
**color** | **str** |  | [optional] 

## Example

```python
from base_api.models.create_todo_dto import CreateTodoDto

# TODO update the JSON string below
json = "{}"
# create an instance of CreateTodoDto from a JSON string
create_todo_dto_instance = CreateTodoDto.from_json(json)
# print the JSON string representation of the object
print CreateTodoDto.to_json()

# convert the object into a dict
create_todo_dto_dict = create_todo_dto_instance.to_dict()
# create an instance of CreateTodoDto from a dict
create_todo_dto_form_dict = create_todo_dto.from_dict(create_todo_dto_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


