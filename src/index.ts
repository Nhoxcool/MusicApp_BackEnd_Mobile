import  express  from "express";
import 'dotenv/config'
import './db'
import authRouter from "./routers/auth"

const app = express();

// register midleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/auth", authRouter)

const PORT = process.env.PORT || 8989;

app.listen(PORT, () => {
    console.log('PORT is listening on port ' + PORT)
})

