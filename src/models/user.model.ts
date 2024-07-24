import mongoose ,{Schema,Document} from "mongoose"


interface User extends Document{
    username:string,
    email:string,
    password:string,
    formemail:string
}

const userSchema:Schema<User> =new Schema({
    username:{
        type:String,
        required:[true,"usernmae is required"],
        trim:true,
        lowercase:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
    
        // match:[/.+\@.+\..+/,'please use a valid email']
    },
    password:{
        type:String,
        required:[true,"password is required"],
        min:[6,"password should contain atleast 6 letters"],
        max:[12,"password should contain atleast 6 letters"]
    },
    formemail:{
        type:String,
        
    }
})

export const User = mongoose.models.User as mongoose.Model<User> ||  mongoose.model<User>('User',userSchema)