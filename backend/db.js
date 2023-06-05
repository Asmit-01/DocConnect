const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/docConnect", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connected")
}).catch((err) => {
    console.log(err)
})

const schema = new mongoose.Schema({}, { strict: false })

const patient = new mongoose.model('patient', schema)
const doctor = new mongoose.model('doctor', schema)
const appointment = new mongoose.model('appointment', schema)
const lab = new mongoose.model('lab', schema)
const test = new mongoose.model('test', schema)
const testbooked = new mongoose.model('testbooked', schema);

module.exports = { 'patient': patient, 'doctor': doctor, 'appointment': appointment, 'lab': lab, 'test': test, 'testbooked': testbooked };