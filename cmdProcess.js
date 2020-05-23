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
    if(searchSlot === -1){
        console.log("Sorry, parking lot is full");
    }
    parkingSlot[searchSlot] = vechicleDetail;
    return searchSlot;
};

var createParkingSlot = function(reqSlots) {
    for(var i= 1; i<parseInt(reqSlots)+1; i++){
        parkingSlot.push(null);
    }
    return;
}

var leaveParkingSlot = function(leavingSlotNumber){
    if(parkingSlot[parseInt(leavingSlotNumber)-1] == undefined){
        console.log("Requested slot are not available");
    }else{
        parkingSlot[parseInt(leavingSlotNumber)-1] = null;
    }
}

var getStatus = function(){
    console.log("Slot" + "   " + "Regestration" + "   " + "Color");
    console.log("--------------------------------");
    var i = 1;
    _.forEach(parkingSlot, function(eachSlot){
        if(eachSlot != null){
            console.log("   " + i++ + "    " + eachSlot.regNumber + "    " + eachSlot.color);
        }else{
            console.log("   " + i++ + "        " + null + "         " + null);
        }
    })
}

var getRegNumberByColor = function(reqColor){
    var listOfReg = [];
    _.forEach(parkingSlot, function(eachSlot){
        if(eachSlot.color == reqColor){
            listOfReg.push(eachSlot.regNumber);
        }
    })
    return listOfReg;
}

var getListOfSlotByColor = function(reqColor){
    var listOfSlots = [];
    for(var i = 0; i<parkingSlot.length; i++){
        if(parkingSlot[i].color == reqColor){
            listOfSlots.push(i+1);
        }
    }
    return listOfSlots;
}

var getSlotNoForReg = function(reqRegNo){
    var getRegNumber = _.findIndex(parkingSlot, function(eachParkingSlot){
        if(eachParkingSlot != null){
            return eachParkingSlot.regNumber == reqRegNo;
        }
    })
    return getRegNumber;
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
            var slotNumber = allotParking(vechicleDetail);
            slotNumber++;
            console.log("Alloted slot number", slotNumber);
            parking();
            break;
        case 'leave':
            leaveParkingSlot(splitInputCMD[1])
            console.log("Slot number " + splitInputCMD[1] + " is free");
            parking();
            break;
        case 'status':
            getStatus();
            parking();
            break;
        case 'registration_numbers_for_cars_with_colour':
            var listofRegNo = getRegNumberByColor(splitInputCMD[1]);
            if(listofRegNo.length){
                var strListofReg = listofRegNo.toString();
                console.log(strListofReg); 
            }else{
                console.log("NO Data found");
            }
            parking();
            break;  
        case 'slot_numbers_for_cars_with_colour':
            var listOfSlot = getListOfSlotByColor(splitInputCMD[1]);
            if(listOfSlot.length){
                var strListOfSlot = listOfSlot.toString();
                console.log(strListOfSlot);
            }else{
                console.log("NO Data found");
            }
            parking();
            break;
        case 'slot_number_for_registration_number':
            var slotNumber = getSlotNoForReg(splitInputCMD[1]);
            if(slotNumber == -1){
                console.log("Not Found");
            }else{
                console.log(parseInt(slotNumber) + 1);
            }
            parking();
        default:
            console.log("wrong input provided by user");
            process.exit(0);
    }
}

module.exports = cmdProcess;
