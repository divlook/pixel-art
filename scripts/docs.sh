#!/bin/bash

rm -rf docs

$(npm bin)/typedoc \
    --readme none \
    --plugin typedoc-plugin-markdown \
    libs/pixel-art.ts
