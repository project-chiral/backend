# EntityOption


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **float** |  | 
**name** | **str** |  | 
**alias** | **str** |  | 
**score** | **float** |  | 

## Example

```python
from base_api.models.entity_option import EntityOption

# TODO update the JSON string below
json = "{}"
# create an instance of EntityOption from a JSON string
entity_option_instance = EntityOption.from_json(json)
# print the JSON string representation of the object
print EntityOption.to_json()

# convert the object into a dict
entity_option_dict = entity_option_instance.to_dict()
# create an instance of EntityOption from a dict
entity_option_form_dict = entity_option.from_dict(entity_option_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


