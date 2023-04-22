# RelationIdDto


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **str** |  | 
**var_from** | **float** |  | [optional] 
**to** | **float** |  | [optional] 

## Example

```python
from graph_api.models.relation_id_dto import RelationIdDto

# TODO update the JSON string below
json = "{}"
# create an instance of RelationIdDto from a JSON string
relation_id_dto_instance = RelationIdDto.from_json(json)
# print the JSON string representation of the object
print RelationIdDto.to_json()

# convert the object into a dict
relation_id_dto_dict = relation_id_dto_instance.to_dict()
# create an instance of RelationIdDto from a dict
relation_id_dto_form_dict = relation_id_dto.from_dict(relation_id_dto_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


