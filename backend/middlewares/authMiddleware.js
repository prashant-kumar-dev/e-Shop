import JWT from "jsonwebtoken";
import { config } from "../config/config.js";
import userModel from "../models/userModel.js";

class AuthMiddleware {
    constructor() {
        this.jwtSecret = config.get('jwtSecret');
    }

    requireSignin = async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({ success: false, message: "No token provided" });
            }

            const decoded = JWT.verify(token, this.jwtSecret);
            req.user = decoded;
            next();
        } catch (error) {
            console.error("Error in requireSignin middleware:", error);
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
    };

    isAdmin = async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const user = await userModel.findById(userId);
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            if (user.role !== 1) {
                return res.status(403).json({ success: false, message: "Unauthorized access" });
            }

            next();
        } catch (error) {
            console.error("Error in isAdmin middleware:", error);
            return res.status(500).json({ success: false, message: "Error in admin middleware" });
        }
    };
}

export default new AuthMiddleware();
