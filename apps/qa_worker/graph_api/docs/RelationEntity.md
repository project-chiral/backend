# RelationEntity


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**label** | **str** |  | 
**identity** | **str** |  | 
**start** | **str** |  | 
**end** | **str** |  | 
**properties** | [**RelationProperty**](RelationProperty.md) |  | 

## Example

```python
from graph_api.models.relation_entity import RelationEntity

# TODO update the JSON string below
json = "{}"
# create an instance of RelationEntity from a JSON string
relation_entity_instance = RelationEntity.from_json(json)
# print the JSON string representation of the object
print RelationEntity.to_json()

# convert the object into a dict
relation_entity_dict = relation_entity_instance.to_dict()
# create an instance of RelationEntity from a dict
relation_entity_form_dict = relation_entity.from_dict(relation_entity_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


