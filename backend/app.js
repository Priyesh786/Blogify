import express from "express";
import mongoose from "mongoose";
import router from './routes/user-routes';
import blogRouter from "./routes/blog-routes";
import cors from 'cors';
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

const url =
  "mongodb+srv://priyeshanand9:<password>@cluster0.kjkojko.mongodb.net/Blog?retryWrites=true&w=majority";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(url, options)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

  if(process.env.NODE_ENV == "production") {
    app.use(express.static("frontend/build"))
  }

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
