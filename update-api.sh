#!/bin/bash

openapi-generator generate \
    -g typescript-axios \
    -i packages/apis/openai.yaml \
    -o packages/openai-api \
    --skip-validate-spec \
    --additional-properties=supportsES6=true,stringEnums=true,npmName=openai-api

openapi-generator generate \
    -g python-nextgen \
    -i http://127.0.0.1:4000/api-json \
    -o apps/qa_worker \
    --additional-properties=packageName=base_api,generateSourceCodeOnly=true

openapi-generator generate \
    -g python-nextgen \
    -i http://127.0.0.1:4001/api-json \
    -o apps/qa_worker \
    --additional-properties=packageName=graph_api,generateSourceCodeOnly=true
