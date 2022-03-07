#!/bin/sh

npx vue-cli-service build
cp dist/index.html dist/edit.html
cd scripts/image-compressor
pipenv shell
pipenv install
python main.py
