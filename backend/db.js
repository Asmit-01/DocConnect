const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/docConnect", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connected")
}).catch((err) => {
    console.log(err)
})

const schema = new mongoose.Schema({}, { strict: false })
const sch1 = new mongoose.Schema({ labs: [String] }, { strict: false })
const sch2 = new mongoose.Schema({ tests: [String] }, { strict: false })

const patient = new mongoose.model('patient', schema)
const doctor = new mongoose.model('doctor', schema)
const appointment = new mongoose.model('appointment', schema)
const lab = new mongoose.model('lab', sch2)
const test = new mongoose.model('test', sch1)

module.exports = { 'patient': patient, 'doctor': doctor, 'appointment': appointment, 'lab': lab, 'test': test };