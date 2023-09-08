var express = require('express');
var router = express.Router();
const multer = require("multer")
const path = require("path")
const userModel = require("./users")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
function fileFilter (req, file, cb) {

if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ||file.mimetype === 'image/jpeg' ||file.mimetype === 'image/svg'){
  cb(null, true)
}
else{
  cb(new Error("file shi do bhai"), false)
}



}

const upload = multer({ storage , fileFilter , limits:{fileSize: 2097152} })

/* GET home page. */
router.get('/', function(req, res, next) {
  userModel.findOne({username:"a"})
  .then(function(a){
    res.render('index',{dets:a});
  })
});
router.post('/upload', upload.single("image"),function(req, res, next) {
  userModel.findOne({username:"a"})
  .then(function(loggedinguy){
    console.log(loggedinguy)
        loggedinguy.pic = req.file.filename,
    loggedinguy.save()
    .then(function(){
      res.redirect("back")
    })
  })
});

module.exports = router;
