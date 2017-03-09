#!/usr/bin/env node

var program = require('commander');
var shell   = require('shelljs');
var Table   = require('easy-table')

program
  .version('0.0.1')
  .option('-a, --alternate', 'Make the display a list not a table')
  .parse(process.argv);

var mainPackage = require( shell.pwd().stdout + '/package.json' );

var t = new Table

for( var depName in mainPackage.dependencies ){

    var dep = require(shell.pwd().stdout + "/node_modules/" + depName + '/package.json');

    if( program.alternate ){
        console.log( depName );
        console.log( "Source Code : " + dep.homepage );
        console.log( "License Type : " + dep.license );
        console.log( "License Url : \n" );
    } else {
        t.cell('Library Name', dep.name)
        t.cell('License Type', dep.license ? dep.license : 'NA')
        t.cell('Library Url', dep.homepage)
        t.newRow()
    }



}

console.log(t.toString())
