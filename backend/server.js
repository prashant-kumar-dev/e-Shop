
import express from 'express'
import morgan from 'morgan'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import colors from 'colors'
import { config } from './config/config.js'
import connectDB from './config/db.js'
import authRoute from './routes/authRoute.js'
import cartRoutes from './routes/cartRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import cors from 'cors'
import productRoutes from './routes/productRoutes.js'

// Initialize Express app
const app = express()

//db config
connectDB();

// MongoDB URI from the config
const mongoURI = config.get('mongoURL');

// Set up session store with MongoDB
const mongoStore = MongoStore.create({
    mongoUrl: mongoURI,
    collectionName: 'sessions',
    ttl: 2 * 60 * 60 // Session time to live in seconds (2 hours)
});

// Session Middleware
app.use(session({
    secret: config.get('sessionSecret') || 'your_secret_key', // Use environment variable or default
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 2 * 60 * 60 * 1000, // Cookie expiration time (2 hours)
        sameSite: 'Lax', // // Must be None for cross-site cookies with secure: true
        path: '/' // Available site-wide
    }
}));


//middleware
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend domain
    credentials: true // Allow cookies to be sent
}));

//standard middleware for parsing json request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))  // api req on console mainly use for debug no need on production

//route
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoutes);

//rest api
app.get("/", (req, res) => {
    res.send({
        message: "welcome to world od ecommerce"
    })
})

//port
const PORT = config.get('port') || 8080;

app.listen(PORT, () => {
    console.log(`server running on ${config.get('devMode')} mode on PORT ${PORT} `.bgCyan.white)
})

