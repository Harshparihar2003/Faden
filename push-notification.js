// var admin = require("firebase-admin");
// var fcm = require("fcm-notification");
const Device = require("./deviceSchema")

// var serviceAccount = require("./testing-fadf6-firebase-adminsdk-iuta9-0688c05a73.json");
// const certPath = admin.credential.cert(serviceAccount);
// var FCM = new fcm(certPath)

const saveMacAddress = async (req,res) => {
    const { macAddress, fcmToken } = req.body;
    if (!macAddress || !fcmToken) {
      return res.status(400).json({ message: 'MAC address not provided.' });
    }
  
  try {

    let device = await Device.findOne({ macAddress: macAddress });
    if (!device) {
        device = new Device({ macAddress: macAddress });
    }else {
        if (device.fcmTokens.includes(fcmToken)) {
          return res.status(200).json({ message: 'FCM token already stored.' });
        }
      }
    
    device.fcmTokens.push(fcmToken);
    await device.save();

    // sendPushNotification(macAddress);

    return res.status(200).json({ message: 'MAC address stored successfully.' });
  } catch (error) {
    console.error('Error storing MAC address:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

const getMacAddress = async(req,res) => {
  try {
    const getMac = await Device.find();
    res.json(getMac)
} catch (error) {
    throw new Error(error)
}
}


async function getFCMTokensForMAC(macAddress) {
    try {
      const device = await Device.findOne({ macAddress: macAddress }).select('fcmTokens');
      if (device) {
        return device.fcmTokens || []; 
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(error);
    }
  }

const sendPushNotification = async (req,res,next) => {
  const { macAddress } = req.body;
  // if (!macAddress) {
  //     return res.status(400).json({ message: 'MAC address not provided.' });
  // }
  try {
    const fcmTokens = await getFCMTokensForMAC(macAddress);
    console.log(fcmTokens);

    const tokenToDeviceMap = {};

    for (const token of fcmTokens) {
        tokenToDeviceMap[token] = macAddress;
    }
    console.log('FCM token to device mapping:', tokenToDeviceMap);

      for (const token of fcmTokens) {
        let message = {
            notification: {
                title: "Test Notification",
                body: "Notification Message"
            },
            // token: token // Send message to each token individually
        };

      
        // FCM.send(message,function(err,res){
        //     if(err){
        //         return res.status(500).send({
        //             message : err
        //         });
        //     }
        //     else{
        //         return  res.status(200).send({
        //             message : "Notification Sent"
        //         })
        //     }
        // })
      }
        res.status(200).json({ message: 'Push notifications sent successfully.' });
    }
    catch(err){
        throw err;
    }
}

module.exports = {saveMacAddress, getMacAddress, sendPushNotification}


















// app.post('/store-mac-address', async (req, res) => {
//     const { macAddress, fcmToken } = req.body;
//     if (!macAddress || !fcmToken) {
//       return res.status(400).json({ message: 'MAC address not provided.' });
//     }
  
//   try {

//     let device = await Device.findOne({ macAddress: macAddress });
//     if (!device) {
//         device = new Device({ macAddress: macAddress });
//     }else {
//         if (device.fcmTokens.includes(fcmToken)) {
//           return res.status(200).json({ message: 'FCM token already stored.' });
//         }
//       }
    
//     device.fcmTokens.push(fcmToken);
//     await device.save();

//     sendPushNotification(macAddress);

//     return res.status(200).json({ message: 'MAC address stored successfully.' });
//   } catch (error) {
//     console.error('Error storing MAC address:', error);
//     return res.status(500).json({ message: 'Internal server error.' });
//   }
// });

// function sendPushNotification(macAddress) {
//     const fcmTokens = getFCMTokensForMAC(macAddress);
//     try {
//         let message = {
//             notification : {
//                 title : "Test Notification",
//                 body : "Notification Message"
//             },
//             // data : {
//             //     orderId : "123456",
//             //     orderDate : "2024-04-25"
//             // },
//             token : fcmTokens,
//         };
//         FCM.send(message,function(err,res){
//             if(err){
//                 return res.status(500).send({
//                     message : err
//                 });
//             }
//             else{
//                 return  res.status(200).send({
//                     message : "Notification Sent"
//                 })
//             }
//         })
//     }
//     catch(err){
//         throw err;
//     }
// }

// async function getFCMTokensForMAC(macAddress) {
//     try {
     
//       const device = await Device.findOne({ macAddress: macAddress }).select('fcmTokens');
//       if (device) {
//         return device.fcmTokens || []; 
//       } else {
//         return [];
//       }
//     } catch (error) {
//       throw new Error(error);
//     }
//   }

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });