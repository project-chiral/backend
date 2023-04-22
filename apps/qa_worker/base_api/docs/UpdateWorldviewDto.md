# UpdateWorldviewDto


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | [optional] 
**description** | **str** |  | [optional] 
**path** | **str** |  | [optional] 
**sup_id** | **float** |  | [optional] 

## Example

```python
from base_api.models.update_worldview_dto import UpdateWorldviewDto

# TODO update the JSON string below
json = "{}"
# create an instance of UpdateWorldviewDto from a JSON string
update_worldview_dto_instance = UpdateWorldviewDto.from_json(json)
# print the JSON string representation of the object
print UpdateWorldviewDto.to_json()

# convert the object into a dict
update_worldview_dto_dict = update_worldview_dto_instance.to_dict()
# create an instance of UpdateWorldviewDto from a dict
update_worldview_dto_form_dict = update_worldview_dto.from_dict(update_worldview_dto_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


