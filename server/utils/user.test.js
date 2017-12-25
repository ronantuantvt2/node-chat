const expect = require('expect');
const {Users} = require('./user');

describe('Users', () => {
   var users = new Users();
   
    
   beforeEach(() => {
       users.users = [{
           id: '1',
           name: 'Ronan',
           room: 'A'
       }, {
           id: '2',
           name: 'Jen',
           room: 'A'
       }, {
           id: '3',
           name: 'Paul',
           room: 'B'
       }];
   });
    
   it('should add new user', () => {
       var users = new Users();
       var user  = {
           id: '123',
           name: 'Ronan',
           room: 'abc'
       };
       
       var responseUser = users.addUser(user.id, user.name, user.room);
       
       expect(users.users).toEqual([user]);
   }); 
    
   it('should return list names of a room', () => {
      var userList = users.getUserList('A');
      expect(userList).toEqual(['Ronan', 'Jen']); 
   });
    
   it('should find user', () => {
      var userId = '1';
      var user = users.getUser(userId); 
      expect(user.id).toBe(userId);
   });
    
   it('should not find user', () => {
      var userId = '99';
      var user = users.getUser(userId);
      expect(user).toNotExist();
   });
    
   it('should remove user', () => {
      var userId = '1';
      var user = users.removeUser(userId);
       
      expect(user.id).toBe(userId);
      expect(users.users.length).toBe(2);
   });
    
   it('should not remove user', () => {
      var userId = '99';
      var user = users.removeUser(userId);
       
      expect(user).toNotExist();
      expect(users.users.length).toBe(3);       
   }); 
});