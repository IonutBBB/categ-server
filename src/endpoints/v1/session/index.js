const appRoot = require('app-root-path');
const tokenValidation = require(`${ appRoot }/src/services/TokenService`);
const { Contacts } = require('../contacts/controller');


module.exports = (router) => {
  /**
   * @swagger
   * /v1/verifyToken:
   *   post:
   *     summary: Verify if the token is valid
   *     description: Verify if the token is valid
   *     produces:
   *       - routerlication/json
   *     parameters:
   *       - in: header
   *         name: authorization
   *         type: string
   *         description: "The token"
   *         required: true
   *     responses:
   *       200:
   *         description: "successful operation"
   *       401:
   *         description: "bad request"
   */
  router.post('/verifyToken', (req, res) => {
    const tokenValidity = tokenValidation.validateToken(req);
    
    if (tokenValidity.success === true) {
      Contacts
        .findByEmail(tokenValidity.data.email)
        .then((response) => {
          if(response) {
          res.status(200).send({
            success: true,
            user: response
          });
          } else {
            res.status(400).send({
              success: false
            });
          }
        }).catch((error) => {
        res.status(400).send({
          success: false,
          error
        });
      });
    } else {
      res.status(401).send(tokenValidity)
    }
  });
  
};

