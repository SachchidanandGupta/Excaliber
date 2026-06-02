const express = require("express");
const corsDetail = require("./config/cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(corsDetail);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy"
    });
});

module.exports = app;