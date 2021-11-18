const utils = require('../utils');

describe('test utils', () => {
    it('should return true if str is name', function() {
        let str = 'John D\'Largy';
        expect(utils.validation.checkIfName(str)).toBeTruthy();
    });
    it('should return true if str is name', function() {
        let str = 'get27';
        expect(utils.validation.checkIfName(str)).toBeTruthy();
    });
    it('should return true if str is name', function() {
        let str = 'get-27';
        expect(utils.validation.checkIfName(str)).toBeTruthy();
    });
    it('should return true if str is name', function() {
        let str = 'je suis un nom de société';
        expect(utils.validation.checkIfName(str)).toBeTruthy();
    });
    it('should return true if str is name', function() {
        let str = '12322';
        expect(utils.validation.checkIfName(str)).toBeFalsy();
    });
    it('should return true if str is name', function() {
        let str = '&é"\'(';
        expect(utils.validation.checkIfName(str)).toBeFalsy();
    });
    it('should return an array of n element passed in params', function() {
        expect(utils.arrayifyNbr.arrayifyNbr(3)).toEqual([ 0, 1, 2]);
    });
})
