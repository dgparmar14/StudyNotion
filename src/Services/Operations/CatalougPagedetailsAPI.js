import { toast } from "react-hot-toast"
import { catalogData } from "../apis";
import { apiConnector } from "../apiConnector";

export const catalogPageDetails = async(catagoryId)=>{
    const toastId = toast.loading("Loading....");
    let result = []
    try{
        const responce = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {catagoryId:catagoryId});
        if(!responce?.data?.success){
            throw new Error("Can not get catadory page details");
        }

        console.log("Catagory page details api responce : ", responce);
        result = responce?.data;

    }catch(error){
        console.log('error occured in catagory page details api');
        console.error(error);
       
    }
    toast.dismiss(toastId);
    return result;
}