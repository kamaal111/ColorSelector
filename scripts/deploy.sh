#!/bin/sh

rm -rf dist node_modules
yarn
yarn build
npx gh-pages -b gh-pages -d dist
