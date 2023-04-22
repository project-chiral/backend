# CreateWorldviewDto


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | 
**description** | **str** |  | [optional] 
**path** | **str** |  | 
**sup_id** | **float** |  | [optional] 

## Example

```python
from base_api.models.create_worldview_dto import CreateWorldviewDto

# TODO update the JSON string below
json = "{}"
# create an instance of CreateWorldviewDto from a JSON string
create_worldview_dto_instance = CreateWorldviewDto.from_json(json)
# print the JSON string representation of the object
print CreateWorldviewDto.to_json()

# convert the object into a dict
create_worldview_dto_dict = create_worldview_dto_instance.to_dict()
# create an instance of CreateWorldviewDto from a dict
create_worldview_dto_form_dict = create_worldview_dto.from_dict(create_worldview_dto_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


