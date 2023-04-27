# UpdateSettingsDto


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**dark_mode** | **bool** |  | [optional] 
**lang** | **str** |  | [optional] 

## Example

```python
from base_api.models.update_settings_dto import UpdateSettingsDto

# TODO update the JSON string below
json = "{}"
# create an instance of UpdateSettingsDto from a JSON string
update_settings_dto_instance = UpdateSettingsDto.from_json(json)
# print the JSON string representation of the object
print UpdateSettingsDto.to_json()

# convert the object into a dict
update_settings_dto_dict = update_settings_dto_instance.to_dict()
# create an instance of UpdateSettingsDto from a dict
update_settings_dto_form_dict = update_settings_dto.from_dict(update_settings_dto_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


