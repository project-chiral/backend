# UpdateContentDto


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**content** | **str** |  | [optional] 
**cover** | **str** |  | [optional] 

## Example

```python
from base_api.models.update_content_dto import UpdateContentDto

# TODO update the JSON string below
json = "{}"
# create an instance of UpdateContentDto from a JSON string
update_content_dto_instance = UpdateContentDto.from_json(json)
# print the JSON string representation of the object
print UpdateContentDto.to_json()

# convert the object into a dict
update_content_dto_dict = update_content_dto_instance.to_dict()
# create an instance of UpdateContentDto from a dict
update_content_dto_form_dict = update_content_dto.from_dict(update_content_dto_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


