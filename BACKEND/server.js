const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/users.routes");
const CategoryRoutes = require("./routes/category.routes");
const ProductRoutes = require("./routes/product.routes");

app.use("/user", userRoutes);
app.use("/category", CategoryRoutes);
app.use("/product", ProductRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello APi" });
});

const PORT = process.env.PORT || 4040;

app.listen(PORT, () => {
  console.log("server is listening to port " + PORT);
});
