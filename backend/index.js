const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

const TacGia = require('./src/model/tacgia.model');
const BoTruyen = require('./src/model/botruyen.model'); 

//parse options
app.use(express.json());
app.use(cors())


//routes
const boTruyenRoutes = require("./src/routes/botruyen.route")
app.use("/api/botruyen", boTruyenRoutes);

const tacGiaRoutes = require("./src/routes/tacgia.route")
app.use("/api/tacgia", tacGiaRoutes);

console.log(process.env)

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);

}
main().then(() => console.log("Mongodb Connected Successfully!!")).catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})