const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./server/models");
const dbConfig = require("./server/config/db.config");
const Role = db.role;
// initialize Roles
const initial = require("./server/script/intitialize");

const app = express();

const corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

// Serve up static assets (production use client/build)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Database

db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Successfully connected to MongoDB DB");
    initial();
})
.catch(err => {
    console.error("DB Connection error:", err);
    // process.exit()
})

// // Routes
require("./server/routes/auth.routes")(app);
require("./server/routes/user.routes")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});