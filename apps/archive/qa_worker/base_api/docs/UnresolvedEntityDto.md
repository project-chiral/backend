# UnresolvedEntityDto


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | 
**options** | [**List[EntityOption]**](EntityOption.md) |  | 

## Example

```python
from base_api.models.unresolved_entity_dto import UnresolvedEntityDto

# TODO update the JSON string below
json = "{}"
# create an instance of UnresolvedEntityDto from a JSON string
unresolved_entity_dto_instance = UnresolvedEntityDto.from_json(json)
# print the JSON string representation of the object
print UnresolvedEntityDto.to_json()

# convert the object into a dict
unresolved_entity_dto_dict = unresolved_entity_dto_instance.to_dict()
# create an instance of UnresolvedEntityDto from a dict
unresolved_entity_dto_form_dict = unresolved_entity_dto.from_dict(unresolved_entity_dto_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


