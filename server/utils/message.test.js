const expect = require('expect');

var {generateMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate message', () => {
    var from = 'Ronan';
    var text = 'Hello world';
    var message = generateMessage(from, text);
    
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  })    
});