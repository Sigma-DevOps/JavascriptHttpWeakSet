const catchAsyncWrapper = (controller) => {
  const newController = (req, res, next) => {
    controller(req, res, next)
      .then()
      .catch((err) => {
        next(err);
      });
  };
  return newController;
};

module.exports = catchAsyncWrapper;
