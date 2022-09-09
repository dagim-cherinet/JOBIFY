import { UnauthenticatedError } from "../errors/index.js";

const checkPermission = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnauthenticatedError("you are not authorized to edit this job");
};

export default checkPermission;
