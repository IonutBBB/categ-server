const { SuperAdmin } = require('../controller');
const { SuperAdminLogin } = require('../../loginSuperAdmin/controller');
const { SuperAdminLogout } = require('../../logoutSuperAdmin/controller');

const expect = require('chai').expect;

module.exports = () => {
  const item = {
    firstName: 'AlexAdmin',
    lastName: 'Lazar',
    password: 'DICKDICK',
    email: 'alex+coaie@moduscreate.com',
    phone: '+40747215726'
  };

  const modifiedItem = {
    firstName: 'AlexAdminUpdate',
    lastName: 'Lazar',
    password: 'BAUBAU',
    email: 'alex+findmy@moduscreate.com',
    phone: '+40747215729'
  };

  let itemId;
  let itemId2;
  let token;

  describe('SuperAdmin', () => {
    it('add an item', () => SuperAdmin
      .add(item)
      .then((data) => {
        itemId = data.dataValues.id;
        expect(data.dataValues)
          .to.be.an('object')
          .to.include.keys('id');
      })
    );

    it('add another item', () => SuperAdmin
      .add(modifiedItem)
      .then((data) => {
        itemId2 = data.dataValues.id;
        expect(data.dataValues)
          .to.be.an('object')
          .to.include.keys('id');
      })
    );

    it('add another item with wrong data', () => SuperAdmin
      .add(modifiedItem)
      .catch((error) => {
        expect(error)
          .to.be.an('object');
      })
    );

    it('login with correct data', () => SuperAdminLogin
      .login({ password: 'DICKDICK', email: 'alex+coaie@moduscreate.com' })
      .then((data) => {
        token = data.token;
        expect(data)
          .to.be.an('object');
      })
    );

    it('login with wrong data', () => SuperAdminLogin
      .login({ password: 'DICKDICK', email: 'alex-coaie@moduscreate.com' })
      .catch((error) => {
        expect(error)
          .to.be.an('object');
      })
    );

    it('logout with correct data', () => SuperAdminLogout
      .logout(token)
      .then((data) => {
        expect(data)
          .to.be.equal(1);
      })
    );

    it('logout with wrong data', () => SuperAdminLogout
      .logout(token)
      .catch((error) => {
        expect(error)
          .to.be.an('object');
      })
    );

    it('list all items', () => SuperAdmin
      .list()
      .then((data) => {
        expect(data)
          .to.be.an('array')
          .to.have.length.of.at.least(1);
      })
    );

    it('get item', () => SuperAdmin
      .get(itemId)
      .then((data) => {
        expect(data.dataValues)
          .to.be.an('object')
          .to.include.keys('id');
      })
    );

    it('get item with wrong id', () => SuperAdmin
      .get(-5)
      .catch((error) => {
        expect(error)
          .to.be.an('object');
      })
    );

    it('update item', () => SuperAdmin
      .update(itemId, modifiedItem)
      .then((data) => {
        expect(data[0])
          .to.equal(1);
      }).catch((error) => {
        expect(error)
          .to.be.an('object');
      })
    );

    it('update item', () => SuperAdmin
      .update(itemId2, modifiedItem)
      .catch((error) => {
        expect(error)
          .to.be.an('object');
      })
    );

    it('remove item', () => SuperAdmin
      .remove(itemId)
      .then((data) => {
        expect(data)
          .to.equal(1);
      })
    );

    it('remove item', () => SuperAdmin
      .remove(itemId2)
      .then((data) => {
        expect(data)
          .to.equal(1);
      })
    );

    it('remove item with wrong id', () => SuperAdmin
      .remove(-5)
      .catch((error) => {
        expect(error)
          .to.be.an('object');
      })
    );
  });
};
