const auth = require("../middleware/auth");
const authPage = require("../middleware/authPage");
const ROLE = require("../helpers/roles.json");
const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

router.post(
  `/updatePassword`,
  [auth, authPage([ROLE.BANK, ROLE.WALLET_OWNER])],
  userController.updatePassword
);
router.post(
  `/updateServices`,
  [auth, authPage([ROLE.BANK])],
  userController.updateServices
);
router.get(
  `/getUser`,
  [auth, authPage([ROLE.BANK, ROLE.WALLET_OWNER, ROLE.ADMIN])],
  userController.getUser
);
router.get(
  `/getUsers`,
  [auth, authPage([ROLE.ADMIN])],
  userController.getUsers
);
router.get(
  `/getPendingWalletUsers`,
  [auth, authPage([ROLE.ADMIN])],
  userController.getPendingWalletUsers
);
router.get(
  `/getPendingBanks`,
  [auth, authPage([ROLE.ADMIN])],
  userController.getPendingBanks
);
router.post(`/addUser`, userController.addUser);
router.put(
  "/updateUser/:id",
  [auth, authPage([ROLE.ADMIN])],
  userController.updateUser
);
router.delete(
  "/deleteUser/:id",
  [auth, authPage([ROLE.ADMIN])],
  userController.deleteUser
);
router.post(
  `/checkPassword`,
  [auth, authPage([ROLE.BANK, ROLE.WALLET_OWNER, ROLE.ADMIN])],
  userController.checkPassword
);
router.post(
  "/addVerifierDid",
  [auth, authPage([ROLE.BANK])],
  userController.addVerifierDid
);

module.exports = router;
