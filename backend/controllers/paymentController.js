const catchAsyncError =require("../middleware/CatchAsyncError")
const dotenv=require("dotenv");
const path= require("path");
dotenv.config({path:path.join(__dirname,"..","config/config.env")})
const stripe =require("stripe")(process.env.STRIPE_SECRET_KEY);
exports.processPayment = catchAsyncError(async(req,res,next)=>{
   const paymentIntent =await stripe.paymentIntents.create({
    amount: 10,
    currency: "ind",
    description:"TEST PAYMENT",
    metadata: {integration_check:"accept_payment"},
    shipping: req.body.shipping
   })
   res.status(200).json({
    success:true,
    client_secret:paymentIntent.client_secret
   })
})
exports.sendStripeApi= catchAsyncError(async(req,res,next)=>{
    res.status(200).json({
     stripeApiKey:process.env.STRIPE_API_KEY
    })
 })