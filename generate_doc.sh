#!/bin/sh

while [ 1 ]
do
    node_modules/jsdoc/jsdoc.js --configure node_modules/angular-jsdoc/common/conf.json  --template node_modules/angular-jsdoc/angular-template --destination docs --readme README.md --recurse app/
    sleep 3
done

#node_modules/jsdoc/jsdoc.js --configure node_modules/angular-jsdoc/common/conf.json  --template node_modules/angular-jsdoc/angular-template --destination docs --readme README.md --recurse app/ 
