# CreateCharaDto


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | 
**alias** | **List[str]** |  | [optional] 
**description** | **str** |  | [optional] 
**avatar** | **str** |  | [optional] 
**unit** | **float** |  | [optional] 
**start** | **datetime** |  | [optional] 
**end** | **datetime** |  | [optional] 

## Example

```python
from base_api.models.create_chara_dto import CreateCharaDto

# TODO update the JSON string below
json = "{}"
# create an instance of CreateCharaDto from a JSON string
create_chara_dto_instance = CreateCharaDto.from_json(json)
# print the JSON string representation of the object
print CreateCharaDto.to_json()

# convert the object into a dict
create_chara_dto_dict = create_chara_dto_instance.to_dict()
# create an instance of CreateCharaDto from a dict
create_chara_dto_form_dict = create_chara_dto.from_dict(create_chara_dto_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


