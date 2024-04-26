const express = require("express");
const { saveMacAddress, getMacAddress, sendPushNotification } = require("./push-notification");
const router = express.Router();

router.post("/send-notication", sendPushNotification)
router.post("/store-mac-address", saveMacAddress)
router.get("/mac-address", getMacAddress)


module.exports = router;