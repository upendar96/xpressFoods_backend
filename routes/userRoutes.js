const userController=require('../controllers/userController');
const express=require('express');
const router=express.Router();

router.post('/userregister',userController.userRegister);
router.post('/userlogin',userController.userLogin);
router.put('/update/:userId',userController.userEdit);


module.exports=router