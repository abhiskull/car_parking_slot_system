const express = require('express')
const async = require('async');
const app = express()
const port = 3000;
var prompt = require("prompt");
var cmdProcessor = require("./cmdProcess.js");
var inputCmd = {};

inputCmd.parking = function(callback) {
    prompt.start();
    prompt.get(['Car_Parking_Slot'], function (err, result) {
        if(result.Car_Parking_Slot){
            cmdProcessor.processParking(result.Car_Parking_Slot, callback);
        }
    })
};

inputCmd.parking();

module.exports = inputCmd;

app.listen(port)