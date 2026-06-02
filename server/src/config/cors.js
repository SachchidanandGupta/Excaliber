const cors = require("cors");
const env = require("./env");

const corsDetail = cors({
    origin:env.clientUrl,
    credentials:true,
    methods:[
        "POST","GET","PUT","PATCH","OPTIONS","DELETE"
    ],
    allowedHeaders:[
        "Content-Type",
        "Authorization ",
        "Cookie"
    ],
    exposedHeaders:[
        "Authorization"
    ]
})

module.exports = corsDetail;

