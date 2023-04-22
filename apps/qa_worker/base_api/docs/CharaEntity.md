# CharaEntity


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **float** |  | 
**name** | **str** |  | 
**alias** | **List[str]** |  | 
**description** | **str** |  | 
**avatar** | **str** |  | 
**deleted** | **datetime** |  | 
**unit** | **float** |  | 
**start** | **datetime** |  | 
**end** | **datetime** |  | 
**project_id** | **float** |  | 

## Example

```python
from base_api.models.chara_entity import CharaEntity

# TODO update the JSON string below
json = "{}"
# create an instance of CharaEntity from a JSON string
chara_entity_instance = CharaEntity.from_json(json)
# print the JSON string representation of the object
print CharaEntity.to_json()

# convert the object into a dict
chara_entity_dict = chara_entity_instance.to_dict()
# create an instance of CharaEntity from a dict
chara_entity_form_dict = chara_entity.from_dict(chara_entity_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


