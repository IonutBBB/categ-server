const { SuperAdmin } = require('./controller');
var validator = require('validator');

/**
 * @swagger
 * definitions:
 *   SuperAdmin:
 *     type: object
 *     required:
 *       - firstName
 *       - lastName
 *       - password
 *       - email
 *       - phone
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       password:
 *         type: string
 *       email:
 *         type: string
 *       phone:
 *         type: integer
 */
module.exports = (router) => {
  /**
   * @swagger
   * /v1/superadmin:
   *   post:
   *     summary: Add a SuperAdmin
   *     description: Add a SuperAdmin as a JSON object
   *     tags:
   *       - SuperAdmins
   *     produces:
   *       - routerlication/json
   *     parameters:
   *       - in: body
   *         name: body
   *         description: "SuperAdmin object that needs to be added to the store"
   *         required: true
   *         schema:
   *           "$ref": "#/definitions/SuperAdmin"
   *     responses:
   *       200:
   *         description: "successful operation"
   */
  router.post('/superadmin', (req, res) => {
    if (validator.isEmail(req.body.email)) {
      SuperAdmin
        .add(req.body)
        .then((data) => {
          res.send({
            success: true,
            data
          });
        })
        .catch((error) => {
          res.status(400).send(error);
        });
    } else {
        res.send({
            success: false,
            message: 'Please enter a valid email!'
        });
    }
  });

  /**
   * @swagger
   * /v1/superadmin:
   *   get:
   *     summary: List all SuperAdmins
   *     description: List all SuperAdmins as an JSON array
   *     tags:
   *       - SuperAdmins
   *     produces:
   *       - routerlication/json
   *     responses:
   *       200:
   *         description: "successful operation"
   *         schema:
   *           type: array
   *           items:
   *             "$ref": "#/definitions/SuperAdmin"
   */
  router.get('/superadmin', (req, res) => {
    SuperAdmin
      .list()
      .then((data) => {
        res.send({
          success: true,
          data
        });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  });

  /**
   * @swagger
   * /v1/superadmin/{id}:
   *   get:
   *     summary: Get a SuperAdmin
   *     description: Get a SuperAdmin
   *     tags:
   *       - SuperAdmins
   *     produces:
   *       - routerlication/json
   *     parameters:
   *       - name: id
   *         in: path
   *         description: "SuperAdmin id"
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: "successful operation"
   *         schema:
   *           "$ref": "#/definitions/SuperAdmin"
   *       404:
   *         description: "not found"
   *       400:
   *         description: "bad request"
   */
  router.get('/superadmin/:id', (req, res) => {
    SuperAdmin
      .get(req.params.id)
      .then((data) => {
        if (data <= 0) {
          res.sendStatus(404);
        } else {
          res.send({
            success: true,
            data
          });
        }
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  });

  /**
   * @swagger
   * /v1/superadmin/{id}:
   *   delete:
   *     summary: Removes a SuperAdmin
   *     description: Removes a SuperAdmin
   *     tags:
   *       - SuperAdmins
   *     parameters:
   *       - name: id
   *         in: path
   *         description: "SuperAdmin id"
   *         required: true
   *         type: integer
   *     produces:
   *       - routerlication/json
   *     responses:
   *       200:
   *         description: "successful operation"
   *       404:
   *         description: "not found"
   *       400:
   *         description: "bad request"
   */
  router.delete('/superadmin/:id', (req, res) => {
    SuperAdmin
      .remove(req.params.id)
      .then((data) => {
        if (data <= 0) {
          res.sendStatus(404);
        } else {
          res.send({
            success: true
          });
        }
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  });

  /**
   * @swagger
   * /v1/superadmin/{id}:
   *   patch:
   *     summary: Update a SuperAdmin
   *     description: Update a SuperAdmin
   *     tags:
   *       - SuperAdmins
   *     parameters:
   *       - name: id
   *         in: path
   *         description: "SuperAdmin id"
   *         required: true
   *         type: integer
   *       - in: body
   *         name: body
   *         description: "SuperAdmin object that needs to be added to the store"
   *         required: true
   *         schema:
   *           "$ref": "#/definitions/SuperAdmin"
   *     produces:
   *       - routerlication/json
   *     responses:
   *       200:
   *         description: "successful operation"
   *       404:
   *         description: "not found"
   *       400:
   *         description: "bad request"
   */
  router.patch('/superadmin/:id', (req, res) => {
    SuperAdmin
      .update(req.params.id, req.body)
      .then((data) => {
        if (data <= 0) {
          res.sendStatus(404);
        } else {
          res.send({
            success: true
          });
        }
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  });
};
