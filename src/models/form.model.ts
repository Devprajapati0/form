import mongoose from "mongoose";
import { Schema,Document }  from "mongoose";

interface form extends Document{
    username:string,
    email:string,
    phonenumber:string,
    timeofstart:string,
    timeofend:string,
    typeofguest:string,
    meals:boolean,
    approvedbyregistrar:boolean,
    approvedbyadminstration:boolean,
}


const formSchema:Schema<form> = new Schema({
    username:{
        type:String,
        required:[true,"username is required"],
     
    },
    email:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true
    },
    timeofstart:{
        type:String,
        required:true
    },
    timeofend:{
        type:String,
        required:true
    },
    typeofguest:{
        type:String,
        required:true
    },
    meals:{
        type:Boolean,
        required:true
    },
    approvedbyregistrar:{
        type:Boolean,
        default:false
    },
    approvedbyadminstration:{
        type:Boolean,
        default:false
    },
})

export const Form = mongoose.models.Form as mongoose.Model<form> ||  mongoose.model<form>('Form',formSchema)