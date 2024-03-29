const express = require("express");
const app = express();
const tourRoutes = require('./routes/tours')

//This Section is for demo code.

// Middle wares are the fucntions which are execute before the request came into request handler.
// Middle wares are execute in the order in which they are define.
// Like for the below middle ware which is only executes for the app.post method
// not for the app.get method.
// If any middle ware are define after or before of any middle ware then it also execute after,
// or before of that middle ware.
// This Middle ware parse the request bosy into a javascript object,
// {express.json() reqturn the middleware function.}.
app.use(express.json());

// This is a middle ware function which execute after the above middle ware.
// This two middle wares are only valid for app.post not for get because
// the middle wares are define after app.get().
app.use((req, res, next) => {
  console.log(req.url);

  // The next() method forware the request to next stage.{Middleware, Request Handler}
  next();
});

app.post("/name", (req, res) => {
  const body = req.body;

  console.log(body);

  res.status(200).send();
});

// If add a question mark after param name then it will be a optional param,
// Which may have any value or not.
app.post("/name/:id/:surname?", (req, res) => {
  const body = req.body;
  // Javascript object which have all the params.
  const param = req.params;

  console.log(param);

  console.log(body);

  res.status(200).send();
});

// Natours project code.



// The router is a middleware thats why its use in this way.
// It forward the request to the router,
// then router can route the request according to the matching url and request method.
app.use("/api/v1/tours",tourRoutes);

module.exports = app;
