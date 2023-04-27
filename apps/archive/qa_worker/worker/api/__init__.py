from base_api import ApiClient as BaseApiClient, Configuration as BaseApiConfig, EventApi
from graph_api import ApiClient as GraphApiClient, Configuration as GraphApiConfig, DefaultApi as GraphApi

client = BaseApiClient(BaseApiConfig(
    host="http://localhost:4000",
))

event_api = EventApi(client)

graph_client = GraphApiClient(GraphApiConfig(
    host="http://localhost:4001",
))

graph_api = GraphApi(graph_client)
