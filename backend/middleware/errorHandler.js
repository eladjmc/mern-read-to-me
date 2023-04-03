import { errorType } from "../constants/errorResponses.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  const message = res.message ? res.message : err.message;
  console.log("here", err);
  if (process.env.NODE_ENV === "development") {
    console.log(message, err.stack);
  }

  switch (statusCode) {
    case errorType.VALIDATION_ERROR:
      res.json({ title: "Validation Failed", message: message });
      break;
    case errorType.UNAUTHORIZED:
      res.json({ title: "Unauthorized", message: message });
      break;
    case errorType.FORBIDDEN:
      res.json({ title: "Forbidden", message: message });
      break;
    case errorType.NOT_FOUND:
      res.json({ title: "Forbidden", message: message });
      break;
    case errorType.SERVER_ERROR:
      res.json({ title: "Server Error", message: message });
      break;
    default:
      console.log("Uncaught Error");
      res.json({ title: "Uncaught Error", message: message });
      break;
  }

};
