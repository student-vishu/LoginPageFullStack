import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// app.use(cors({
//     origin: "*",
//    credentials: true
// }))
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || origin.startsWith("http://localhost")) {
            callback(null, true); // Allow requests from any localhost domain
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // Allow cookies & authentication headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

//import routes
import userRouter from "./routes/user.routes.js"

//routes declaration
app.use("/api/v1/users", userRouter)


export { app }