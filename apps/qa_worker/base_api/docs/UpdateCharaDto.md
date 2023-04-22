# UpdateCharaDto


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | [optional] 
**alias** | **List[str]** |  | [optional] 
**description** | **str** |  | [optional] 
**avatar** | **str** |  | [optional] 
**unit** | **float** |  | [optional] 
**start** | **datetime** |  | [optional] 
**end** | **datetime** |  | [optional] 

## Example

```python
from base_api.models.update_chara_dto import UpdateCharaDto

# TODO update the JSON string below
json = "{}"
# create an instance of UpdateCharaDto from a JSON string
update_chara_dto_instance = UpdateCharaDto.from_json(json)
# print the JSON string representation of the object
print UpdateCharaDto.to_json()

# convert the object into a dict
update_chara_dto_dict = update_chara_dto_instance.to_dict()
# create an instance of UpdateCharaDto from a dict
update_chara_dto_form_dict = update_chara_dto.from_dict(update_chara_dto_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


