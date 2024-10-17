import mongoose, {Schema,Document} from 'mongoose';
export interface IUser extends Document{
    email:string;
    fullName:string;
    phone:string;
    address:string;
    password:string;
    role: 'user' | 'admin' | 'verifier';
}
const user:Schema = new Schema(
    {   
        email:{
            type: String,
            required: true,
            unique:true,
        },

        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        role:{
            type: String,
            enum: ['user','admin','verifier'],
            default:'user'
        },
        password:{
            type: String,
            required: true
        }
        
       
    },
    {
        timestamps: true
    }
)

export const User = mongoose.model<IUser>('User', user);