import express from "express";
const app = express();
const port = 3000;

import fs from "node:fs";
import morgan from "morgan";

app.use(morgan("combined"));
app.use(express.json());
app.use(express.static("public"));

// A custom middleware to grant access only on weekdays from 9-5
app.use((req, res, next) => {
  const now = new Date();
  let day = now.getDay();
  let hour = now.getHours();
  let workingHours = hour >= 9 && hour <= 17;
  let workingDays = day >= 1 && day <= 5;
  if (workingDays && workingHours) {
    return next();
  }
  res.send("Gateway closed!");
  console.log(workingDays);
});

// home page
app.get("/", (req, res) => {
  const homeContent = fs.readFileSync("public/index.html", "utf-8");
  res.status(200).send(homeContent);
});

// Our services page
app.get("/services", (req, res) => {
  const servicesContent = fs.readFileSync("public/index2.html", "utf-8");
  res.status(200).send(servicesContent);
});

// contact us
app.get("/contact", (req, res) => {
  const contactContent = fs.readFileSync("public/index3.html", "utf-8");
  res.status(200).send(contactContent);
});

// listening server
app.listen(port, () => {
  console.log("server started");
});

// error handling middleware
app.use((err, req, res, next) => {
  console.log(err);

  res.status(500).send("Sorry an internal server error occured");
});
