const { connectToMongodb } = require("../src/database/database");
const app = require("./index");
require("dotenv").config();
const PORT = process.env.PORT;

app.listen(PORT, async () => {
  await connectToMongodb();
  console.log(`Server listening on ${PORT}`);
});
