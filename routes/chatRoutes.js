const express=require('express');

const {sendMessage,receiveMessage}=require('../controllers/chatController')
const router=express.Router();

router.post('/send',sendMessage);
router.get('/get',receiveMessage);

module.exports = router;