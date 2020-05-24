const expect = require('chai').expect;
const assert = require('chai').assert;
const testParkingSlot = require('./cmdProcess.js');


describe('Create 6 parking slot', async function(){
   it('Need to create 6 parking slot', async function(){
        var expactedResult = 'Created a parking lot with 6 slots';
        let result = testParkingSlot.createParkingSlot(6);
        assert.equal(result, expactedResult);
   });
});

describe('Alloted slot number', async function(){
    it('Need to allot some slot', async function(){
         var expactedParkingResult = 'Alloted slot number 1';
         let resultParking = parseInt(testParkingSlot.allotParking({ regNumber: 'KA-01-HH-1234', color: 'White' }))+1;
         let resultFinalParking = 'Alloted slot number ' +  resultParking;
         console.log(resultFinalParking);
         assert.equal(resultFinalParking, expactedParkingResult);
    });
});
