const appRoot = require('app-root-path');

const { SuperAdmin } = require(`${appRoot}/src/models`);
const Promise = require('bluebird');
const bcrypt = require('bcrypt');

/**
 * Class that represents superAdmins orchestration trough database
 */
module.exports = {
  /**
   * Adds a superAdmin to database if superAdmin's email does not exist already in database
   *
   * @param {Object} superAdmin - superAdmin JSON object
   */
  add(superAdmin) {
    return new Promise((resolve, reject) => {
      SuperAdmin.find({
        where: {
          email: superAdmin.email
        }
      }).then((superAdminFound) => {
        if (superAdminFound) {
          reject({
            success: false,
            error: 'Email already exists'
          });
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(superAdmin.password, salt, (err2, hash) => {
              const superAdminWithEncryptedPAss = Object.assign(superAdmin, { password: hash });
              SuperAdmin
                .create(superAdminWithEncryptedPAss)
                .then((res) => {
                  const superAdminWithoutPass = Object.assign(res, { password: null });
                  resolve(superAdminWithoutPass);
                })
                .catch((error) => {
                  reject(error);
                });
            });
          });
        }
      }).catch((error) => {
        reject(error);
      });
    });
  },
  /**
   * List all superAdmins from database
   *
   * @returns {Array}
   */
  list() {
    return new Promise((resolve, reject) => {
      SuperAdmin
        .findAll()
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  /**
   * Get a specific superAdmin
   *
   * @param {integer} superAdminId - superAdmin id
   * @returns {Object}
   */
  get(superAdminId) {
    return new Promise((resolve, reject) => {
      SuperAdmin
        .findOne({
          where: {
            id: superAdminId
          }
        })
        .then((res) => {
          if (res) {
            const superAdminWithoutPass = Object.assign(res, { password: null });
            resolve(superAdminWithoutPass);
          } else {
            reject({ error: 'Unexistent id' });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  /**
   * Removes a superAdmin from database
   *
   * @param {integer} superAdminId - superAdmin id
   */
  remove(superAdminId) {
    return new Promise((resolve, reject) => {
      SuperAdmin
        .destroy({
          where: {
            id: superAdminId
          }
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  /**
   * Update a specific superAdmin on database if new email does not exist already in database and encrypts the new password
   *
   * @param {integer} superAdminId - superAdmin id
   * @param {Object} data - superAdmin object to update
   */
  update(superAdminId, data) {
    return new Promise((resolve, reject) => {
      SuperAdmin.findOne({
        where: {
          id: superAdminId
        }
      }).then((superAdmin) => {
        if (superAdmin) {
          SuperAdmin.findOne({
            where: {
              email: data.email
            }
          }).then((superAdminFound) => {
            if ((superAdminFound && superAdminFound.dataValues.id === parseInt(superAdminId, 10)) || (!superAdminFound)) {
              if (data && data.password) {
                bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(data.password, salt, (err2, hash) => {
                    const superAdminUpdated = Object.assign(data, { password: hash });
                    this.actualUpdate(superAdmin, superAdminUpdated)
                      .then((superAdminToSend) => {
                        resolve(superAdminToSend);
                      }).catch((error) => {
                        reject(error);
                      });
                  });
                });
              } else {
                this.actualUpdate(superAdmin, data)
                  .then((superAdminToSend) => {
                    resolve(superAdminToSend);
                  }).catch((error) => {
                    reject(error);
                  });
              }
            } else {
              reject({
                success: false,
                error: 'Email already exists'
              });
            }
          }).catch((error) => {
            reject(error);
          });
        } else {
          reject({ error: 'Unexistent id' });
        }
      }).catch((error) => {
        reject(error);
      });
    });
  },

  /**
   * Update a specific superAdmin on database - callback function
   *
   * @param {Object} superAdmin - superAdmin to update
   * @param {Object} data -  object with values that need to be updated
   */
  actualUpdate(superAdmin, data) {
    return new Promise((resolve, reject) => {
      superAdmin
        .update(data)
        .then((res) => {
          const superAdminWithoutPass = Object.assign(res, { password: null });
          resolve(superAdminWithoutPass);
        }).catch((error) => {
          reject(error);
        });
    });
  }
};
