const express = require('express');

const applyHealhCheckEndpoint = require('./utils/applyHealthCheck');

const controllers = require('./controller');

const router = express.Router({ mergeParams: true });

// router health check endpoint
applyHealhCheckEndpoint(router);

router
  .route('/')
  .post(controllers.insertController)
  .get(controllers.getController);

module.exports = router;
