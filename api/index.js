const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose")
const cors = require("cors");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const tagRoute = require("./routes/tags");
const postRoute = require("./routes/posts");
require('dotenv').config()

const url = "mongodb+srv://learnLink:2j4CSOphrlcrhrqZ@learnlinkapi.rbhai0r.mongodb.net/?retryWrites=true&w=majority&appname=LearnLink";
const connectionString = process.env.DB_CONNECTION_STRING

mongoose.connect(url,{
  dbName: 'LearnLink',
}).then(() =>
console.log("DB connnection successful")).catch((err) => {
    console.log("Some error occured");
});
/*
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://learnLink:2j4CSOphrlcrhrqZ@learnlinkapi.rbhai0r.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
  */

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// The next dev server runs on localhost:3000, so we need the CORS policy to allow
// requests from it
const allowedOrigins = ['localhost:3000'];
app.use(cors({
    origin: function(origin, callback){
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }

        return callback(null, true);
    }
}));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/tags", tagRoute);
app.use("/api/posts", postRoute);

app.get("/",(req,res)=> {
    res.send("Hello World");
});

app.listen(8800,()=>{
    console.log("Backend server is running on port 8800");
});