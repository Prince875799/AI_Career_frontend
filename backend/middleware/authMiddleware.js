/**import jwt from 'jsonwebtoken'

 const authMiddleware = async (req,res, next)=>{
    try {
        let { token } = req.cookies
        if (!token) {
            return res.status(400).json({ message: "Not Authorized admin login" })
        }
        let verifyToken = jwt.verify(token, process.env.JWT_SECRET)

        if (!verifyToken) {
            return res.status(400).json({ message: "Not Authorized Login again, Invalid token" })
        }

        req.userId = verifyToken.id;
        next()
    } catch (error) {
        console.log(error);
    return res.status(500).json({ message: `isAuth error ${error}` });
    }
}

export default authMiddleware **/

import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, please login"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token, login again"
      });
    }

    req.userId = decoded.id;

    next();

  } catch (error) {

    console.error("Auth Error:", error.message);

    return res.status(401).json({
      message: `isAuth error ${error.message}`
    });
  }
};

export default authMiddleware;