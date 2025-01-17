import express from "express";
import logger from "./logger.js";
import morgan from "morgan";

const app = express();
const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello there!");
// });
// app.get("/name", (req, res) => {
//   res.send("Hello, sarthak how are you ?");
// });
// app.get("/instagram", (req, res) => {
//   res.send("@sarthakk20");
// });

app.use(express.json());
let dietData = [];
let nextItemId = 1;

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

//add data into dietData array
app.post("/items", (req, res) => {
  logger.info("A post request is made");
  const { name, price } = req.body;
  const item = { id: nextItemId++, name, price };
  dietData.push(item);
  res.status(201).send(item);
});

//show data
app.get("/items", (req, res) => {
  res.status(200).send(dietData);
});

//find the data using id
app.get("/items/:id", (req, res) => {
  const item = dietData.find((items) => items.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).send("Item not found");
  }
  res.status(200).send(item);
});

//update the item
app.put("/items/:id", (req, res) => {
  const item = dietData.find((items) => items.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).send("Item not found");
  }
  const { name, price } = req.body;
  item.name = name;
  item.price = price;
  res.status(200).send(item);
});

//delete item form the array
app.delete("/items/:id", (req, res) => {
  logger.warn("Deleted");
  const index = dietData.findIndex(
    (items) => items.id === parseInt(req.params.id)
  );
  if (index === -1) {
    return res.status(404).send(`Index not found`);
  }
  dietData.splice(index, 1);
  return res.status(204).send("Deleted");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
