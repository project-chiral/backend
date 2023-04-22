BASE_API_URL=http://127.0.0.1:4000/api-json
GRAPH_API_URL=http://127.0.0.1:4001/api-json

openapi-generator generate \
  -g python-nextgen \
  -i $GRAPH_API_URL \
  -o . \
  --additional-properties=packageName=graph_api,generateSourceCodeOnly=true &

openapi-generator generate \
  -g python-nextgen \
  -i $BASE_API_URL \
  -o . \
  --skip-validate-spec \
  --additional-properties=packageName=base_api,generateSourceCodeOnly=true &

wait
