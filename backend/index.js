const express = require('express');
const path = require('path');
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const TacGia = require('./src/model/tacgia.model');
const BoTruyen = require('./src/model/botruyen.model'); 

//parse options
app.use(express.json());
app.use(cors())


//routes
const boTruyenRoutes = require("./src/routes/botruyen.route")
app.use("/api/botruyen", boTruyenRoutes);

const loaiTruyenRoutes = require("./src/routes/loaitruyen.route")
app.use("/api/loaitruyen", loaiTruyenRoutes);

const tacGiaRoutes = require("./src/routes/tacgia.route")
app.use("/api/tacgia", tacGiaRoutes);

const chapterRoutes = require('./src/routes/chapter.route');
app.use('/api/chapter', chapterRoutes);

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