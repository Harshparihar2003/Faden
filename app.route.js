const express = require("express");
const { saveMacAddress } = require("./push-notification");
const router = express.Router();

// router.post("/send-notication", pushNotificationController.sendPushNotification)
router.post("/store-mac-address", saveMacAddress)


module.exports = router;