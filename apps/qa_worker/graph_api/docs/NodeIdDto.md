# NodeIdDto


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **str** |  | 
**id** | **float** |  | 

## Example

```python
from graph_api.models.node_id_dto import NodeIdDto

# TODO update the JSON string below
json = "{}"
# create an instance of NodeIdDto from a JSON string
node_id_dto_instance = NodeIdDto.from_json(json)
# print the JSON string representation of the object
print NodeIdDto.to_json()

# convert the object into a dict
node_id_dto_dict = node_id_dto_instance.to_dict()
# create an instance of NodeIdDto from a dict
node_id_dto_form_dict = node_id_dto.from_dict(node_id_dto_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


