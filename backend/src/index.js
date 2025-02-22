import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
})

const PORT = process.env.PORT || 8000

app.get('/hello', (req, res) => {
    res.send("Hello")
})

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);

})
