# RelationsEntity


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**happened_after** | [**RelationsEntityHAPPENEDAFTER**](RelationsEntityHAPPENEDAFTER.md) |  | 
**led_to** | [**RelationsEntityHAPPENEDAFTER**](RelationsEntityHAPPENEDAFTER.md) |  | 
**affected** | [**RelationsEntityHAPPENEDAFTER**](RelationsEntityHAPPENEDAFTER.md) |  | 
**includes** | [**RelationsEntityHAPPENEDAFTER**](RelationsEntityHAPPENEDAFTER.md) |  | 
**occurred_in** | [**RelationsEntityHAPPENEDAFTER**](RelationsEntityHAPPENEDAFTER.md) |  | 
**has_relationship** | [**RelationsEntityHAPPENEDAFTER**](RelationsEntityHAPPENEDAFTER.md) |  | 
**participated_in** | [**RelationsEntityHAPPENEDAFTER**](RelationsEntityHAPPENEDAFTER.md) |  | 
**contains** | [**RelationsEntityHAPPENEDAFTER**](RelationsEntityHAPPENEDAFTER.md) |  | 

## Example

```python
from graph_api.models.relations_entity import RelationsEntity

# TODO update the JSON string below
json = "{}"
# create an instance of RelationsEntity from a JSON string
relations_entity_instance = RelationsEntity.from_json(json)
# print the JSON string representation of the object
print RelationsEntity.to_json()

# convert the object into a dict
relations_entity_dict = relations_entity_instance.to_dict()
# create an instance of RelationsEntity from a dict
relations_entity_form_dict = relations_entity.from_dict(relations_entity_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


