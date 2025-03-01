import { app } from "./app.js"
import dotenv from "dotenv"
import connctDB from "./db/db.js"

dotenv.config({
    path: './.env'
})

const port = process.env.PORT

connctDB()
    .then(() => {
        app.listen(port || 8080, () => {
            console.log(`Server is running on PORT:${port}`);
        })
    })
    .catch((error) => {
        console.log("MongoDB connection failed!!!", error);
    })

