import express from "express";
import morgan from "morgan";
import logger from "./logging.js";
const app = express();
const PORT = 3000;
app.use(express.json());
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

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Get request received");
});
app.post("/post", (req, res) => {
  res.send("Post request received");
});
app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`);
});
