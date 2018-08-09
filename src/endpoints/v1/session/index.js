const appRoot = require('app-root-path');
/* eslint-disable */
const tokenValidation = require(`${ appRoot }/src/services/TokenService`);
/* eslint-enable */

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
      res.status(200).send({
        success: true,
        user: {} // here return user
      });
    } else {
      res.status(401).send(tokenValidity);
    }
  });
};

