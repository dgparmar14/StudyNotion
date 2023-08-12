import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector";
import { settingEndPosints, profileEndpoints } from "../apis"; 
import { setUser } from "../../Reducer/Slices/profileSlice";
import { logout } from "./authAPI";
const {
    UPDATE_DISPLAYPICTURE_API, 
    UPDATE_PROFILE_API,
    UPDATE_PASSWORD_API,
    DELETE_PROFILE_API
} = settingEndPosints;
const {
    GET_USER_DETAILS_API
} = profileEndpoints;
export const UpdatePrifilePicture = async(file,token)=>{
    
    const toastId = toast.loading("Loading");
    let result;
    try{
        console.log("Printing file : ", file);
        const responce = await apiConnector("PUT", UPDATE_DISPLAYPICTURE_API ,file, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer${token}`,
          });
        console.log("Printing responce : ", responce);

        if(!responce.data.success){
            throw new Error(responce.data.error)
        }

        toast.success('Profile Picture Updated');
        result = responce.data.data;

    } catch(error){
        console.error("Error occured while updating profile picture");
        console.error(error);
    }
    toast.dismiss(toastId);
    return result;
}

export const GetAllDetailsOfUser = async(token) => {
    const toastId = toast.loading("Loading");
    let data;
    try{
        const responce = await apiConnector("GET", GET_USER_DETAILS_API, null, {Authorization: `Bearer${token}`});

        console.log("Printing responce : ", responce);
        if(!responce.data.success){
            throw new Error(responce.data.error);
        }

        
        data = responce.data.data;
    }catch(error){
        console.log("Error occured while getting data");
        console.error(error);
    }
    toast.dismiss(toastId);
    return data;
}

export const UpdateProfile = async(formData, token) => {
    const toastId = toast.loading("Loading..");
    let data;
    try{
        const responce = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
            "Content-Type" : "multipart/form-data", 
            Authorization : `Bearer${token}`
        });

        console.log("Printing update profile api responce : ", responce);

        if(!responce.data.success){
            throw new Error(responce.data.error);
        }

        toast.success("Profile Updated Successfully");
        data = responce.data;
    }catch(error){
        console.log("Error occured while upating profile");
        console.error(error);
    }


    toast.dismiss(toastId);
    return data;
}

export const updatePassword = async(formData, token)=>{
    const toastId = toast.loading("Loading...");
    let result;
    try{
        const responce = await apiConnector("POST", UPDATE_PASSWORD_API, formData, {
            "Content-Type" : "multiipart/form-data",
            Authorization : `Bearer${token}`
        });
        console.log("Printing changepassword api responce : ", responce);

        if(!responce.data.success){
            throw new Error(responce.message);
        }

        toast.success("Password Changed Successfully");
        result = responce.data;

    }catch(error){
        console.error(error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;

}

export const deleteProfile = async(token)=>{
    const toastId = toast.loading("Loading...");
    let data;
    try{
        const responce = await apiConnector("DELETE", DELETE_PROFILE_API, null, {Authorization : `Bearer${token}`});
        console.log("Printing delete profile api responce : ",responce);

        if(!responce.data.success){
            throw new Error(responce.data.message);
        }

        toast.success("Profile deleted successfully");
        
       
        data = responce;
    }catch(error){
        console.log("Error occured while deleting profile");
        console.error(error);
    }

    toast.dismiss(toastId);
    return data;

}