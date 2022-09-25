const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

// router.get(`/findByEmail`,userController.getUsers);
router.post(`/addUser`, userController.addUser);
// router.put('/updateUser/:id', userController.updateUser);
// router.delete('/deleteUser/:id',userController.deleteUser);

module.exports = router;
