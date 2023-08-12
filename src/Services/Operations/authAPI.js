import { useDispatch, useSelector } from "react-redux"
import { apiConnector } from "../apiConnector";
import { settingEndPosints } from "../apis";
import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../Reducer/Slices/authSlice"
import {endpoints} from "../apis"
import { resetCart } from "../../Reducer/Slices/cartSlice"
import { setUser } from "../../Reducer/Slices/profileSlice"
const {SENDOTP_API,  SIGNUP_API, LOGIN_API} = endpoints;

export function SendOTP(email, navigate){
   
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
        const response = await apiConnector("POST", SENDOTP_API, {
            email,
            checkUserPresent: true,
        })
        console.log("SENDOTP API RESPONSE............", response)

        console.log(response.data.success)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        toast.success("OTP Sent Successfully")
        navigate("/emailVerification")
        } catch (error) {
        console.log("SENDOTP API ERROR............", error)
        toast.error("Could Not Send OTP")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)

    }
}

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmpassword,
    otp,
    navigate
  ) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
     
      console.log(firstName, lastName, email, password, confirmpassword, otp);
      try {
        const response = await apiConnector("POST",  SIGNUP_API, { 
          firstName,
          lastName,
          email,
          password,
          confirmpassword,
          accountType,
          otp,
        })
  
        console.log("SIGNUP API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Signup Successful")
        navigate("/login")
      } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        toast.error("Signup Failed")
        navigate("/signup")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
  
  export function login(email, password, navigate) {
   
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", LOGIN_API, {
          email,
          password,
        })
  
        console.log("LOGIN API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        const userImage = response.data?.user?.image
          ? response.data.user.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
        dispatch(setUser({ ...response.data.user, image: userImage }));
        
        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("user", JSON.stringify(response.data.user))
        navigate("/dashboard/my-profile")
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Login Failed")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
  
export const getPasswordResetToken = (email, setEmailSent) => {
   
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
        const responce = await apiConnector("POST", settingEndPosints.RESET_PASSWORD_TOKEN_API, {email});

        console.log("Printing send email token : ", responce);

        if(!responce.data.success){
            throw new Error(responce.data.message);
        }

        setEmailSent(true);
        
        toast.success("Email sent");

        }
        catch(error){
            console.log("Failed to change password");
            console.error(error);
            toast.error("Failed to send email");
        }
        dispatch(setLoading(false));

    }
    
}

export const changePassword = (password, confirmPassword, token, navigate) => {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
            console.log("Printing token : ", token);
            const responce = await apiConnector("POST", settingEndPosints.CHANGE_PASSWORD_API, {password, confirmPassword, token});

            console.log("Printing change Password responce : ", responce);
            if(!responce.data.success){
                throw new Error(responce.data.message);
            }
            toast.success("Password updated successfully");
            navigate("/login");


        }catch(error){
            console.log("Error occured in sending email");
            console.error(error);
            toast.error("Failed to reset password");

        }
        dispatch(setLoading(false));
    }
}

export function logout(navigate) {
   
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      dispatch(resetCart())
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
  }