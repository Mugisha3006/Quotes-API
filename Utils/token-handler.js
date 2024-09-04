import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import "dotenv/config";

const createJWTToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: "48h" });
};

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
                if (err) {
                    return res.status(StatusCodes.FORBIDDEN).json({ message: "Invalid Token Provided" });
                }
                req.tokenData = decode;
                next();
            });
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Auth Token is Missing" });
        }
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Missing Authorization Header" });
    }
};

export { createJWTToken, verifyToken };