import dotenv from "dotenv";
import Database from "./src/Utils/Database.js";
import app from "./app.ts";

// dotenv.config({ path: "./.env" });
dotenv.config()

app.post("/home", (req, res) => {
  res.send("hello");
});

Database()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
