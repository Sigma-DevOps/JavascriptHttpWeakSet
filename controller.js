const catchAsyncWrapper = require('./utils/catchAsync');
const AppError = require('./utils/appError');

const WeakSet = require('./utils/weakSet');

const set = new WeakSet();

const getController = async (req, res, next) => {
  if (req.query.key) {
    res.status(200).json({
      status: 'success',
      key: req.query.key,
      present: set.contains(req.query.key),
    });
  } else next(new AppError(400, 'No Key Provided'));
};

const insertController = async (req, res, next) => {
  if (req.query.key) {
    if (set.contains(req.query.key))
      return next(new AppError(400, 'Duplicated Key'));
    set.insert(req.query.key, req.query.age);
    res.status(200).json({
      status: 'success',
      key: req.query.key,
    });
  } else next(new AppError(400, 'No Key Provided'));
};

exports.getController = catchAsyncWrapper(getController);
exports.insertController = catchAsyncWrapper(insertController);
