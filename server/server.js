const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router")
const adminRoute = require("./router/admin-router")
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");


//lets tackele cors
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true
}
app.use(cors(corsOptions));


app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/admin", adminRoute);

app.get("/", (req, res) => {
    res.status(200).send("welcome hiii");
});

app.use(errorMiddleware);

const PORT = 7001;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server running at PORT ${PORT}`);
    });
})

