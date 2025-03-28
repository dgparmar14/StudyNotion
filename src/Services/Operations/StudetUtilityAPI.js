import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";

import razorpayLogo from "../../assets/Logo/rzp_logo.png"

import { setPaymentLoading } from "../../Reducer/Slices/courseSlice";
import {resetCart} from "../../Reducer/Slices/cartSlice"
const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;
const loadScript = (src)=>{
    return new Promise((resolve)=>{
        const script = document.createElement("script");
        script.src = src;

        script.onload = ()=>{
            resolve(true)
        }

        script.onerror=()=>{
            resolve(false)
        }

        document.body.appendChild(script);
    })

}

export async function buyCourse(token, courses, userDetails, navigate, dispatch){
    const toastId = toast.loading("Loading..");
   
    try{
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res){
            toast.error("Razorpay SDK failed to load");
        }

        const orderResponce = await apiConnector("POST", COURSE_PAYMENT_API, {courses}, {Authorization : `Bearer${token}`});
        console.log("Printing order responce", orderResponce);

        if(!orderResponce.data.success){
            throw new Error(orderResponce.data.error);
        }

        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponce.data.message.currency,
            amount: `${orderResponce.data.message.amount}`,
            order_id:orderResponce.data.message.id,
            name:"LearningBuddy",
            description: "Thank You for Purchasing the Course",
            image:razorpayLogo,
            prefill: {
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler: function(response) {
                //send successful wala mail
                sendPaymentSuccessfullemail(response, orderResponce.data.message.amount,token );
                //verifyPayment
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }
        const paymentObjects = new window.Razorpay(options);
        paymentObjects.open();
        paymentObjects.on("payment.failed", function(responce){
            toast.error("OOPS, payment failed");
            console.log(responce.error);
        })

    }catch(error){
        console.error("PAYMENT API ERROR______", error);
        toast.error("Could not make payment");
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessfullemail(responce,amount, token)
{
    try{

        const res = await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId : responce.razorpay_order_id,
            paymentId : responce.razorpay_payment_id,
            amount : amount
        }, {Authorization : `Bearer${token}`});

    }catch(error){
        console.log("Error occured in payment successfull email api");
        console.error(error)

    }
}

async function verifyPayment(bodyData, token, navigate, dispatch){
    const toastId = toast.loading("Loading...");
    dispatch(setPaymentLoading(true));
    try{
        const res = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {Authorization:`Bearer${token}`})

        if(!res.data.success){
            throw new Error(res.messege);
        }
        toast.success("Congratulaions, you are enrolled in course");
        dispatch(resetCart());
        navigate("/dashboard/enrolled-courses")
    }
    catch(error){
        console.log("ERROR OCCURED IN VERIFIVCATION PAYMENT API____", error);
        toast.error("Can not verify payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}