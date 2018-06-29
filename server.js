'use strict'
const express = require('express');
const path = require('path');
const fs  = require('fs');
const bodyparser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname,'/')));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/','index.html'));
});


var server=app.listen(process.env.PORT || '8080', ()=>{
    console.log('App is listening on the port %s', server.address().port);
console.log('You know what to do to quit the server')
})