import express from "express";
import AuthController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; //object // to protect routes

const router = express.Router();
const authController = new AuthController();

//routes

// Register (POST Method)
router.post('/register', async (req, res) => {
    await authController.registerUser(req, res);
});

// Login (POST Method)
router.post('/login', async (req, res) => {
    await authController.loginUser(req, res);
});

//test route
router.get('/test', authMiddleware.requireSignin, authMiddleware.isAdmin, async (req, res) => {
    await authController.testUser(req, res);
});
//forgot password (POST)

router.post('/forgot-password', async (req, res) => {
    await authController.forgotPasswordUser(req, res);
})

//protected user route
router.get('/user-auth', authMiddleware.requireSignin, async (req, res) => {
    await authController.dashboardUser(req, res);
});
//protected admin route
router.get('/admin-auth', authMiddleware.requireSignin, authMiddleware.isAdmin, async (req, res) => {
    await authController.dashboardAdmin(req, res);
});
export default router;
