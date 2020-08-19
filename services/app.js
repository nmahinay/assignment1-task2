const MongoClient = require('mongodb').MongoClient;
var express=require('express')
var moment=require('moment')
var bodyParser=require('body-parser')
var multer=require('multer')

var app=express()

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}))

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/photos')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'.jpg')
    }
    
  })
  var upload = multer({ storage: storage })

//Own Log Format
var log=function(message){
    var time=moment().format()
    console.log('[Server] @'+time+' '+message)
}

//photos endpoint
app.get('/photos',(req,res) => {
    retrievePhotos(res)
})

/*
app.post('/photo', upload.single('photo'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }

    insertPhoto(file)
      res.send(file)
  })
*/

//photo upload endpoint
app.post('/photo', upload.single('photo'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a real file')
    error.httpStatusCode = 400
    return next(error)
  }

  insertPhoto(file)
    res.redirect('/')
})

var port=3000;
app.listen(port)
log('Server listening on: '+port)

const uri = "mongodb+srv://sit725:sit725@assignment1.vpqu2.mongodb.net/instagram?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

let collectionPhotos;

const insertPhoto=(file) =>{
  collectionPhotos.insertOne(file)
}

const retrievePhotos=(res)=>{
  collectionPhotos.find().toArray(function(err,result){

    if (err) throw err;
   // console.log(result)
    res.send(result)
  })
}

client.connect(err => {
 collectionPhotos = client.db("instagram").collection("photos");
});

