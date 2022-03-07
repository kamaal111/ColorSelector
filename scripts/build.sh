#!/bin/sh

npx vue-cli-service build

cp dist/index.html dist/edit.html

cd scripts/image-compressor
pip3 install --user pipenv
pipenv shell
pipenv install
python main.py
