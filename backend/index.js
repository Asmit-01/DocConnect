const express = require('express')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')
const multer = require('multer')
const nodemailer = require('nodemailer')

app.use(express.json());
app.use(bodyParser.json());
app.use("/", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(express.urlencoded({
    extended: false
}));
app.use("/uploads", express.static("./public/uploads"));
const { patient, doctor, appointment, lab, test } = require('./db')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniquePrefix + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

app.use(cors())
app.use(express.json());





/************************************** home ****************************************/
app.get('/', (req, resp) => {
    return resp.send({ result: 'hello world' })
})

/************************************** pregister ****************************************/
app.post('/pregister', async (req, resp) => {
    //console.log(req.body)
    if (!req.body.name || !req.body.gender || !req.body.phone || !req.body.address || !req.body.paswd || !req.body.age || !req.body.email) {
        return resp.send({ result: 'invalid input' })
    }

    let temp = await patient.findOne({ email: req.body.email });
    if (temp) {
        return resp.send({ user: 'already exist' })
    }

    req.body.paswd = await bcrypt.hash(req.body.paswd, 10);

    const obj = new patient(req.body)
    await obj.save();
    return resp.send(obj)
})
/************************************** plogin ****************************************/

app.post('/plogin', async (req, resp) => {
    if (!req.body.email || !req.body.paswd) {
        return resp.send({ result: 'invalid input' })
    }

    let temp = await patient.findOne({ email: req.body.email });
    if (!temp) {
        return resp.send({ result: 'Invalid Credentials' })
    }

    let f = await bcrypt.compare(req.body.paswd, temp.paswd);
    if (!f) return resp.send({ result: 'Invalid Credentials' })

    return resp.send(temp)
})


/************************************** phome ****************************************/

app.get('/phome', (req, resp) => {
    resp.send({ result: 'hello world' })
})


/************************************** dregister ****************************************/

app.post('/dregister', upload.array('file', 1), async (req, resp, next) => {
    if (!req.body.name || !req.body.phone || !req.body.paswd || !req.body.email || !req.body.address || !req.body.exp || !req.body.specialization || !req.files) {
        return resp.send({ result: 'invalid input' })
    }

    const license = req.files[0].filename;
    let temp = await doctor.findOne({ name: req.body.name, email: req.body.email });
    if (temp) {
        return resp.send({ user: 'already exist' })
    }

    req.body.paswd = await bcrypt.hash(req.body.paswd, 10);

    let x = { ...req.body, license, status: 'check' };
    const obj = new doctor(x);
    await obj.save();
    resp.json(obj);
})


/************************************** dlogin ****************************************/

app.post('/dlogin', async (req, resp) => {
    if (!req.body.email || !req.body.paswd) {
        return resp.send({ result: 'invalid input' })
    }

    let temp = await doctor.findOne({ email: req.body.email });
    if (!temp) {
        return resp.send({ result: 'Invalid Credentials' })
    }

    let f = await bcrypt.compare(req.body.paswd, temp.paswd);
    if (!f) {
        return resp.send({ result: 'Invalid Credentials' })
    }

    if (temp.status != "verified") {
        return resp.send({ check: "You are not verified by the admin" })
    }

    resp.send(temp)
})


/************************************** dhome ****************************************/

app.get('/dhome', (req, resp) => {
    resp.send({ result: 'hello world' })
})


/************************************** dsearch ****************************************/
app.get('/dsearch', async (req, resp) => {
    const d = await doctor.find({ status: 'verified' }, { license: 0, paswd: 0 });
    //console.log(d);
    return resp.json(d)
})


/************************************** appointment ****************************************/
app.post('/appointment', async (req, resp) => {
    const temp = await appointment.findOne({ pEmail: req.body.pemail, dEmail: req.body.demail, date: req.body.day, time: req.body.tim });
    if (temp) {
        return resp.json({ error: 'appointment already booked' })
    }
    const obj = new appointment({ dEmail: req.body.demail, pEmail: req.body.pemail, date: req.body.day, time: req.body.tim, status: 'active' });

    await obj.save();


    // var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'youremail@gmail.com',
    //         pass: 'yourpassword'
    //     }
    // });

    // var mailOptions = {
    //     from: 'youremail@gmail.com',
    //     to: 'myfriend@yahoo.com',
    //     subject: 'Sending Email using Node.js',
    //     text: 'That was easy!'
    // };

    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // });


    resp.send({ result: 'hello world' })
})


/************************************** pupdate ****************************************/
app.post('/pupdate', async (req, resp) => {
    const d = await patient.findOne({ email: req.body.cuemail })
    if (!d) return resp.json({ error: 'error' })

    let nam = d.name, gen = d.gender, mob = d.phone, add = d.address, pwd = d.paswd, ag = d.age, e = d.email;

    if (req.body.name != '') nam = req.body.name;
    if (req.body.gender != '') gen = req.body.gender;
    if (req.body.phone != '') mob = req.body.phone;
    if (req.body.address != '') add = req.body.address;
    if (req.body.age != '') ag = req.body.age;
    if (req.body.email != '') e = req.body.email;
    if (req.body.paswd != '') {
        pwd = req.body.paswd;
        pwd = await bcrypt.hash(pwd, 10);
    }

    var newvalues = { $set: { name: nam, gender: gen, phone: mob, address: add, paswd: pwd, age: ag, email: e } };
    await patient.updateOne({ email: req.body.cuemail }, newvalues)
    await appointment.updateMany({ email: req.body.cuemail }, { $set: { pName: nam, pMob: mob, age: ag, email: e } })
    resp.send({ result: 'hello world' })
})


/************************************** dupdate ****************************************/
app.post('/dupdate', async (req, resp) => {
    const d = await doctor.findOne({ email: req.body.cuEmail })
    if (!d) return resp.json({ error: 'error' })

    let nam = d.name, mob = d.phone, add = d.address, pwd = d.paswd, em = d.email, ex = d.exp, spec = d.specialization, ct = d.city;

    if (req.body.name != '') nam = req.body.name;
    if (req.body.email != '') em = req.body.email;
    if (req.body.phone != '') mob = req.body.phone;
    if (req.body.address != '') add = req.body.address;
    if (req.body.exp != '') ex = req.body.exp;
    if (req.body.specialization != '') spec = req.body.specialization;
    if (req.body.city != '') ct = req.body.city;
    if (req.body.paswd != '') {
        pwd = req.body.paswd;
        pwd = await bcrypt.hash(pwd, 10);
    }

    var newvalues = { $set: { name: nam, email: em, phone: mob, address: add, paswd: pwd, exp: ex, specialization: spec, city: ct } };
    await doctor.updateOne({ email: req.body.cuEmail }, newvalues)
    await appointment.updateMany({ dEmail: req.body.cuEmail }, { $set: { dName: nam, dEmail: em, specialization: spec } })
    resp.send({ result: 'hello world' })
})


/************************************** dappointlist ****************************************/
app.post('/dappointlist', async (req, resp) => {
    //console.log(req.body.dem)
    const res = await appointment.find({ dEmail: req.body.dem });
    const de = req.body.dem;
    const d = await doctor.findOne({ email: de }, { name: 1, email: 1, phone: 1, specialization: 1, _id: 0 });

    let temp = [];
    for (let i = 0; i < res.length; i++) {
        const pe = res[i].pEmail;
        const p = await patient.findOne({ email: pe }, { name: 1, email: 1, phone: 1, age: 1, _id: 0 });
        const ans = { dName: d.name, dMob: d.phone, specialization: d.specialization, pName: p.name, pMob: p.phone, age: p.age, date: res[i].date, time: res[i].time, pEmail: res[i].pEmail, dEmail: res[i].dEmail, status: res[i].status }
        temp.push(ans);
    }
    if (!res) {
        return resp.json({ error: 'error' })
    }
    resp.json(temp);
})


/************************************** pappointlist ****************************************/
app.post('/pappointlist', async (req, resp) => {
    const res = await appointment.find({ pEmail: req.body.pemail });
    //console.log(res);
    const pe = req.body.pemail;
    const p = await patient.findOne({ email: pe }, { name: 1, email: 1, phone: 1, age: 1, _id: 0 });

    let temp = [];
    for (let i = 0; i < res.length; i++) {
        const de = res[i].dEmail;
        const d = await doctor.findOne({ email: de }, { name: 1, email: 1, phone: 1, specialization: 1, _id: 0 });
        const ans = { dName: d.name, dMob: d.phone, specialization: d.specialization, pName: p.name, pMob: p.phone, age: p.age, date: res[i].date, time: res[i].time, pEmail: res[i].pEmail, dEmail: res[i].dEmail, status: res[i].status }
        temp.push(ans);
    }

    if (!res) {
        return resp.json({ error: 'error' })
    }
    resp.json(temp);
})


/************************************** cancelappointment ****************************************/
app.post('/cancelappointment', async (req, resp) => {
    //console.log(req.body);
    const x = req.body.pEmail;
    const y = req.body.dEmail;
    const z = req.body.date;
    await appointment.updateOne({ pEmail: x, dEmail: y, date: z }, { $set: { status: 'cancelled' } })
    resp.send({ result: 'result' })
})


/************************************** help ****************************************/
app.get('/help', (req, resp) => {
    resp.send({ result: 'hello world' })
})


/************************************** labregister ****************************************/
app.post('/labregister', upload.array('file', 1), async (req, resp, next) => {
    if (!req.body.name || !req.body.phone || !req.body.email || !req.body.address || !req.files || !req.body.city || !req.body.paswd) {
        return resp.send({ result: 'invalid input' })
    }

    const license = req.files[0].filename;
    let temp = await lab.findOne({ name: req.body.name, email: req.body.email });
    if (temp) {
        return resp.send({ user: 'already exist' })
    }

    let x = { ...req.body, license, status: 'check' };
    const obj = new lab(x);
    await obj.save();
    resp.json(obj);
})


/************************************** testlist ****************************************/
app.get('/testlist', async (req, resp) => {
    const res = await test.find();
    //console.log(res)
    resp.json(res)
})

/**************************************  ****************************************/

app.listen(5000, () => { console.log("server Listen at 5000") });
