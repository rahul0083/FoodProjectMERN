const express = require('express');
const router = express.Router();
const Order = require('../Models/Orders');
const CircularJSON = require('circular-json');

router.post('/orderData', async (req, res) => {
  try {
    let data = CircularJSON.parse(CircularJSON.stringify(req.body.order_data));
    await data.splice(0,0,{Order_date:req.body.order_date})
    let order = await Order.findOne({ email: req.body.email });

    if (order === null) {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      });
      res.json({ success: true });
    } else {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        {
          $push: { order_data: data }
        }
        
      );
      res.json({ success: true });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: 'Server Error' });
  }
});

router.post('/myorderData', async (req, res) => {

  try{
   
    let myData=await Order.findOne({'email':req.body.email})
    res.json({orderData:myData})

  }
  catch(error){

    res.status(500).send({ error: 'Server Error' });
  }

})

module.exports = router;
