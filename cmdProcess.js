var callParking = require("./server.js");
var _ = require('lodash');
var cmdProcess = {};var prompt = require("prompt");
var parkingSlot = [];

var parking = function(callback) {
    prompt.start();
    prompt.get(['inputCmd'], function (err, result) {
        if(result.inputCmd){
            cmdProcess.processParking(result.inputCmd, callback);
        }
    })
};

var allotParking = function(vechicleDetail){
    var searchSlot = _.findIndex(parkingSlot, function(eachSlot){
        return eachSlot == null
    });
    parkingSlot[searchSlot] = vechicleDetail;
    return;
};

var createParkingSlot = function(reqSlots) {
    
    for(var i= 1; i<parseInt(reqSlots)+1; i++){
        parkingSlot.push(null);
    }
    return;
}

var leaveParkingSlot = function(leavingSlotNumber){
    if(parkingSlot[parseInt(leavingSlotNumber)] == undefined){
        console.log("Requested slot are not available");
    }else{
        parkingSlot[parseInt(leavingSlotNumber)] = null; 
    }
}

var getStatus = function(){
    console.log("Slot" + "   " + "Regestration" + "   " + "Color");
    console.log("--------------------------------");
    _.forEach(parkingSlot, function(eachSlot){
        console.log(eachSlot);
    })
}

cmdProcess.processParking = function(cmd, callback){
    var splitInputCMD = cmd.split(" ");
    switch(splitInputCMD[0]) {
        case 'create_parking_lot':
            createParkingSlot(splitInputCMD[1]);
            console.info("Created a parking lot with " + splitInputCMD[1] + " slots");
            parking();
            break;
        case 'park':
            var vechicleDetail = {};
            vechicleDetail.regNumber = splitInputCMD[1];
            vechicleDetail.color = splitInputCMD[2];
            allotParking(vechicleDetail);
            console.log(parkingSlot);
            parking();
            break;
        case 'leave':
            leaveParkingSlot(splitInputCMD[1])
            console.log("Slot number " + splitInputCMD[1] + " is free");
            parking();
            break;
        case 'status':
            getStatus();
            break;  
        default:
            

    }
}

module.exports = cmdProcess;
