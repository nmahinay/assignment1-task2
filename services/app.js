const MongoClient = require('mongodb').MongoClient;
var express=require('express')
var moment=require('moment')
var bodyParser=require('body-parser')
var multer=require('multer');
const { ObjectID, ObjectId } = require('mongodb');

var app=express()
var username="Guest"

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/photos')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'.jpg')
    },
    
  })
  var upload = multer({ storage: storage })

//Own Log Format
var log=function(message){
    var time=moment().format()
    console.log('[Server] @'+time+' '+message)
}

//get photos endpoint
app.get('/photos',(req,res) => {
    retrievePhotos(res)
})

//post photos endpoint
app.post('/photos', upload.single('photo'), (req, res, next) => {
  const file = req.file
  var commentval=[]
  file["username"]=username
  file["comment"]=commentval
  if (!file) {
    const error = new Error('Please upload a real file')
    error.httpStatusCode = 400
    return next(error)
  }
  insertPhoto(file)
    res.redirect('/')
})

//post comment endpoint
app.post('/comments', (req, res)=>{
  insertComment(req,res)
})

//get comment endpoint
app.get('/comments', (req, res)=>{
  retrieveComments(res)
})

//


var port=3000;
app.listen(port)
log('Server listening on: '+port)

//mongodb connection
const uri = "mongodb+srv://sit725:sit725@assignment1.vpqu2.mongodb.net/instagram?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

//collection objects
let collectionPhotos;


client.connect(err => {
 collectionPhotos = client.db("instagram").collection("photos")
});

//collection photos functions

const insertPhoto=(file) =>{
  //console.log(file)
  collectionPhotos.insertOne(file)
}


const retrievePhotos=(res)=>{
  collectionPhotos.find().toArray(function(err,result){

    if (err) throw err;
   // console.log(result)
    res.send(result)
  })
}

//collection comments functions
const insertComment=(req,res)=>{
  let message=req.body.message
  let photoid=req.body.photoid
  let username=req.body.username
 

  collectionPhotos.update(
    {  "_id":new ObjectId(photoid) },
    {
      $push: {
        comment: {
                'message': message,
                'username': username
              }
      }
  })
   
  res.send({
    message, username, photoid
  });
}

const retrieveComments=(res)=>{
  collectionComments.find().toArray(function(err,result){

    if (err) throw err;
    res.send(result)
  })
}

//login
app.get('/login', (req,res)=>{
  console.log('login', req.body)
})

app.post('/login', (req,res)=>{
  let data = req.body;
  username = data.name;
})

