import { UnauthenticatedError, UnauthorizedError,BadRequestError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");

  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === "66a9f6f9a072b39fffd6e54c";
    req.user = { userId, role,testUser };
    next();
  } catch (error) {
    if (!token) throw new UnauthenticatedError("authentication invalid");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    console.log(roles);
    if(!roles.includes(req.user.role)){
        throw new UnauthorizedError("Unauthiorised to access this route")
    }
    next();
  };
};


export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("Demo User. Read Only!");
  }
  next();
};