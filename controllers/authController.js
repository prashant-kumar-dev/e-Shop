import userModel from "../models/userModel.js";
import passwordManager from "../helpers/authHelper.js";  // Import passwordManager object
import JWT from "jsonwebtoken";
import { config } from "../config/config.js";

class AuthController {
    constructor() {
        this.passwordManager = passwordManager;
        this.secretKey = config.get('jwtSecret');
    }

    registerUser = async (req, res) => {
        try {
            const { name, email, password, phone, address, answer } = req.body;

            // Check required fields
            if (!name || !email || !password || !phone || !address || !answer) {
                return res.status(400).send({ message: 'All fields are required' });
            }

            // Check if user already exists
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(409).send({
                    success: false,
                    message: 'User already exists. Please login instead.'
                });
            }

            // Hash password
            const hashedPassword = await this.passwordManager.hashPassword(password);

            // Create new user
            //Creating a New User Object
            const newUser = new userModel({ name, email, phone, address, password: hashedPassword, answer });
            // Saving the User Document to MongoDB
            await newUser.save();

            res.status(201).send({
                success: true,
                message: 'User registered successfully!',
                user: newUser
            });

        } catch (error) {
            console.error('Error in register process:', error);
            res.status(500).send({
                success: false,
                message: 'Error in register process',
                error: error.message
            });
        }
    }

    loginUser = async (req, res) => {
        try {
            const { email, password } = req.body;

            //validation
            if (!email || !password) {
                return res.status(404).send({
                    success: false,
                    message: "Invalid email or password!"
                })
            }
            // Find user by email
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: 'User not found. Please register first.'
                });
            }

            // Compare passwords
            const passwordMatch = await this.passwordManager.comparePassword(password, user.password);
            if (!passwordMatch) {
                return res.status(401).send({
                    success: false,
                    message: 'Invalid password'
                });
            }

            // Generate JWT token
            const token = JWT.sign({ userId: user._id }, this.secretKey);

            res.status(200).send({
                success: true,
                message: 'Login successful!',
                user: {
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    address: user.address
                },
                token
            });

        } catch (error) {
            console.error('Error in login process:', error);
            res.status(500).send({
                success: false,
                message: 'Error in login process',
                error: error.message
            });
        }
    }
    forgotPasswordUser = async (req, res) => {
        try {
            const { email, newPassword, securityQuestion } = req.body
            if (!email) {
                res.status(400).send({
                    success: false,
                    message: 'Question is required'
                })
            }
            if (!securityQuestion) {
                res.status(400).send({
                    success: false,
                    message: 'Answer is required'
                })
            }
            if (!newPassword) {
                res.status(400).send({
                    success: false,
                    message: 'New Password is required'
                })
            }
            //check
            const user = await userModel.findOne({ email, answer: securityQuestion })
            console.log("huiiop[poiuhiopokj");
            //validation
            if (!user) {
                res.status(404).send({
                    success: false,
                    message: 'Wrong Email or Answer'
                })
            }
            // Hash password
            const hashedPassword = await this.passwordManager.hashPassword(newPassword);
            await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });
            res.status(200).send({
                success: true,
                message: "Password Reset Successfully"
            });


        } catch (error) {
            console.log(error)
            res.status(500).send({
                success: false,
                message: "some thing went wrong",
                error
            })
        }
    }
    async testUser(req, res) {
        res.send('protected routes')
    }
    async dashboardUser(req, res) {
        // res.send('protected routes')
        res.status(200).send({ ok: true });
    }
}

export default AuthController;
