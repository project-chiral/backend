#!/bin/bash

# openapi-generator generate \
#     -g typescript-axios \
#     -i packages/apis/openai.yaml \
#     -o apps/base/src/api/openai \
#     --skip-validate-spec \
#     --additional-properties=supportsES6=true,stringEnums=true

openapi-generator generate \
    -g typescript-axios \
    -i packages/apis/openai.yaml \
    -o apps/base/src/api/openai \
    --skip-validate-spec \
    --additional-properties=supportsES6=true,stringEnums=true &

openapi-generator generate \
    -g typescript-axios \
    -i packages/apis/openai.yaml \
    -o apps/base/src/api/openai \
    --skip-validate-spec \
    --additional-properties=supportsES6=true,stringEnums=true &

wait
