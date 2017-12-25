const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
   it('should reject non-string values', () => {
      var result = isRealString(98);
      expect(result).toBe(false);
   }); 
   it('should reject string with only space', () => {
       var result = isRealString('        ');
       expect(result).toBe(false);
   });
    
   it('should return with non-space character', () => {
       var result = isRealString('     Ronan    ');
       expect(result).toBe(true);
   });
});