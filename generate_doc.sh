#!/bin/sh

node_modules/jsdoc/jsdoc.js --configure node_modules/angular-jsdoc/common/conf.json  --template node_modules/angular-jsdoc/angular-template --destination docs --readme README.md --recurse app/ 
