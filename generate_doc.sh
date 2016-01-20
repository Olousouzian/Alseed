#!/bin/sh

node_modules/jsdoc/jsdoc.js --configure node_modules/angular-jsdoc/common/conf.json  --template app/app-content/docTemplate --destination docs --readme README.md --recurse app/

