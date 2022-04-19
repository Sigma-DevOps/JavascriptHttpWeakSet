const applyHealthCheck = (router) => {
  router.route('/health').get((req, res) => {
    res.status(200).json({
      status: 'success',
      uid: req.uid,
      router_status: 'healthy',
    });
  });
};

module.exports = applyHealthCheck;
