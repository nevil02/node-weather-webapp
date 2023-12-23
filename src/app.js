const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views
app.set("view engine", "hbs");
app.set("views", viewsPath); // default it searches for 'views' directory, but we can customise through this way as per directory name we want to set
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Nj",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    img: "/img/robot.png",
    name: "Nj",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Nj",
  });
});

// commented code below would not work because of the above code

// app.get('', (req, res) => {
//     res.send('<h1>Hello Express!!</h1>');
// });

app.get("/weather", (req, res) => {
  if (!req.query.address || !req.query.address) {
    return res.send({
      error: "Address is required to fetch the weather data",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        return res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please provide a search term",
    });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("App is running on server on port 3000");
});
