# ProjectEntity


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **float** |  | 
**serial** | **float** |  | 
**name** | **str** |  | 
**description** | **str** |  | 
**created_at** | **datetime** |  | 
**updated_at** | **datetime** |  | 
**deleted** | **datetime** |  | 

## Example

```python
from base_api.models.project_entity import ProjectEntity

# TODO update the JSON string below
json = "{}"
# create an instance of ProjectEntity from a JSON string
project_entity_instance = ProjectEntity.from_json(json)
# print the JSON string representation of the object
print ProjectEntity.to_json()

# convert the object into a dict
project_entity_dict = project_entity_instance.to_dict()
# create an instance of ProjectEntity from a dict
project_entity_form_dict = project_entity.from_dict(project_entity_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


