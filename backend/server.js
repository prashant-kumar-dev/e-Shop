
import express from 'express'
import morgan from 'morgan'
import colors from 'colors'
import { config } from './config/config.js'
import connectDB from './config/db.js'
import authRoute from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import cors from 'cors'
import productRoutes from './routes/productRoutes.js'


//db config
connectDB();

const app = express()

//middleware
app.use(cors())
//standard middleware for parsing json request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))  // api req on console mainly use for debug no need on production

//route
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

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

