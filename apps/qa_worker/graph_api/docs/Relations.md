# Relations


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**var_from** | **List[float]** |  | [default to []]
**to** | **List[float]** |  | [default to []]

## Example

```python
from graph_api.models.relations import Relations

# TODO update the JSON string below
json = "{}"
# create an instance of Relations from a JSON string
relations_instance = Relations.from_json(json)
# print the JSON string representation of the object
print Relations.to_json()

# convert the object into a dict
relations_dict = relations_instance.to_dict()
# create an instance of Relations from a dict
relations_form_dict = relations.from_dict(relations_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


