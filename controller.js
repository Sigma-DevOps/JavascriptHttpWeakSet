const catchAsyncWrapper = require('./utils/catchAsync');
const AppError = require('./utils/appError');

const WeakSet = require('./utils/weakSet');

const set = new WeakSet();

const getController = (req, res, next) => {
  if (req.params.key) {
    res.status(200).json({
      status: 'success',
      key: req.params.key,
      present: set.contains(req.params.key),
    });
  } else next(new AppError(400, 'No Key Provided'));
};

const insertController = (req, res, next) => {
  if (req.params.key) {
    if (set.contains(req.params.key))
      return next(new AppError(400, 'Duplicated Key'));
    res.status(200).json({
      status: 'success',
      key: req.params.key,
    });
  } else next(new AppError(400, 'No Key Provided'));
};

exports.getController = catchAsyncWrapper(getController);
exports.insertController = catchAsyncWrapper(insertController);
