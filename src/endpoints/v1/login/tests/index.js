const { Login } = require('../controller');
const { Register } = require('../../register/controller');

const expect = require('chai').expect;

module.exports = () => {
  const item = {
    firstname: 'Alex',
    lastname: 'Lazar',
    email: 'alex.lazar@mcro-e.com'
  };

  let itemId;
  describe('Login', () => {
    it('add an item', () => Register
      .add(item)
      .then((data) => {
        itemId = data.dataValues.id;
      })
    );

    it('find a specific item', () => Login
      .findByEmail('marius@moduscreate.com')
      .then((data) => {
        expect(data.dataValues)
          .to.be.an('object')
          .to.include.keys('id');
      })
    );

    it('remove item', () => Register
      .remove(itemId)
      .then((data) => {
        expect(data)
          .to.equal(1);
      })
    );
  });
};
