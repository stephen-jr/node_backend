/* jshint esversion: 6 */
const router = require('express').Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, './uploads');
    },
    filename: (req, file, callback)=>{
        callback(null, Math.random().toString(36).substring(6) + '-' + file.originalname )
    }
});

const fileFilter = (req, file, callback) =>{
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        callback(null, true)
    }else{
        callback(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter
});

const ProductController = require('../controllers/product');

router.get('/', ProductController.getAllProducts);

router.get('/:productId', ProductController.getProduct);

router.post('/', checkAuth, upload.single('productImage'), ProductController.createProduct);

router.patch('/:productId', checkAuth, ProductController.editProduct);

router.delete('/:productId', checkAuth, ProductController.deleteProduct);

module.exports = router;