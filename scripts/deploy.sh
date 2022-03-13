#!/bin/sh

rm -rf dist
yarn
yarn build
npx gh-pages -b gh-pages -d dist
