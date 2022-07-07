import { StatusCodes } from "http-status-codes";
const errorHandler = (err, req, res, next) => {
  console.log(err);
  const defaultError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: "something went wrong",
  };
  res.status(defaultError.statusCode).json({ msg: err });
};

export default errorHandler;
