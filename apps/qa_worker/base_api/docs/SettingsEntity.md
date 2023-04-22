# SettingsEntity


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **float** |  | 
**project_id** | **float** |  | 
**dark_mode** | **bool** |  | 
**lang** | **str** |  | 

## Example

```python
from base_api.models.settings_entity import SettingsEntity

# TODO update the JSON string below
json = "{}"
# create an instance of SettingsEntity from a JSON string
settings_entity_instance = SettingsEntity.from_json(json)
# print the JSON string representation of the object
print SettingsEntity.to_json()

# convert the object into a dict
settings_entity_dict = settings_entity_instance.to_dict()
# create an instance of SettingsEntity from a dict
settings_entity_form_dict = settings_entity.from_dict(settings_entity_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


