const app = require("./src/app");
const {connectToDB} = require("./src/config/database");
const env = require("./src/config/env");

connectToDB();

app.listen(env.port,()=>{
    console.log(`server is running at port: ${env.port} `);
})