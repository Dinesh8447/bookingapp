const user = require('./modules/user.js')
const placesdb = require('./modules/places.js')
const bcrypt = require('bcryptjs')
const express = require('express')
const bodyparser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express()
const download = require('image-downloader')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const multer = require('multer')
const fs = require('fs')


const { default: mongoose } = require('mongoose')
const booking = require('./modules/booking.js')
require('dotenv').config()



app.use(cookieparser())
app.use(bodyparser.json())
// app.use(express.json())
app.use('/uploads',express.static(__dirname+'/uploads'))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

const bcryptsalt = bcrypt.genSaltSync(12);

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userdoc = await user.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptsalt),
        })
        res.json(userdoc)
    }
    catch (e) {
        res.status(422).json(e)
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body
    const userdoc = await user.findOne({ email })
    if(userdoc){
        const passok = bcrypt.compareSync(password,userdoc.password)
        if(passok){
            jwt.sign(
            {
                email:userdoc.email,
                id:userdoc._id,
                // name:userdoc.name
            },
            process.env.SECRET,{},(err,token)=>{
                if(err) throw err
                res.cookie('token','').json(userdoc)
            })
        }else{
            res.status(422).json('pass not ok')
        }
    }else{
        res.json('not found')
    }

})


app.get('/profile',(req,res)=>{
    const {token} = req.cookies
    if(token){
        jwt.verify(token,process.env.SECRET,{},async(err,userdata)=>{
            if(err) throw err;
            const {name,email,_id} = await user.findById(userdata.id)
            res.json({name,email,_id})
        })
    }else{
        res.json(null)
    }
})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true)
})





app.post('/upload-by-link',async(req,res)=>{
    const {link} = req.body
    const newname = Date.now() + '.jpg'
   await download.image({
        url: link,
        dest: __dirname +'/uploads' + newname
    })
   
})


const photosmiddleware = multer({dest:'uploads/'})
app.post('/uploads',photosmiddleware.array('photos',100),(req,res)=>{
    const uploadfiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const {path,originalname} = req.files[i]
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newpath = path + '.' + ext
        fs.renameSync(path,newpath)
        uploadfiles.push(newpath.replace("uploads/"))
    }
  res.json(uploadfiles)  
})


app.post('/places',async(req,res)=>{
    const {token} = req.cookies
    const {title,
        address,
        photos,
        description,
        perks,
        extrainfo,
        checkin,
        checkout,
        maxguests,price} = req.body

    // jwt.verify(token,process.env.SECRET,{},async(err,userdata)=>{
        // if(err) throw err;
     const placedoc =  await placesdb.create({
            // owner:userdata,
            title,
            address,
            photos,
            description,
            perks,
            extrainfo,
            checkin,
            checkout,
            maxguests,
            price
        })

        res.json(placedoc)
    // })

})


app.get('/places',(req,res)=>{
    const token = req.cookies.token
    jwt.verify(token,process.env.SECRET,{},async(err,userdata)=>{
       res.json(await placesdb.find({owner:userdata}))
    })

})


app.get('/places/:id',async(req,res)=>{
    const {id} = req.params
    res.json(await placesdb.findById(id))
})


app.put('/places/:id',async(req,res)=>{
    const {id} = req.params
    const {
        title,
        address,
        photos,
        description,
        perks,
        extrainfo,
        checkin,
        checkout,
        maxguests,price} = req.body
        
     await placesdb.findByIdAndUpdate(id,{title,address,photos,description,perks,extrainfo,checkin,checkout,maxguests,price},{new:true})
   res.json('ok')             
    // placedoc.set({title,address,photos,description,perks,extrainfo,checkin,checkout,maxguests,price})
    
    // await placedoc.save()
})
  

app.get('/places',async(req,res)=>{
    res.json(await placesdb.find() )
})

app.post('/booking',async(req,res)=>{
    const {checkin,checkout,numberofguest,name,email,phonenumber,price} = req.body
     await booking.create({checkin,checkout,numberofguest,name,email,phonenumber,price})
    .then(bookingdata=>res.json(bookingdata))
    .catch(e=>res.json(e))
})
app.get('/bookings',async(req,res)=>{
    res.json(await booking.find())
})
app.get('/bookings/:id',async(req,res)=>{
    const id = req.params.id
    res.json(await booking.findById(id))
})

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('connected'))

app.listen(4000, () => {
    console.log("server is running")
})