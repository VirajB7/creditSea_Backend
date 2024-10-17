import mongoose,{Schema,Document} from 'mongoose';

export interface ILoan extends Document{
    user:string,
    loanAmount:number,
    loanTenure:number,
    employementStatus: 'unemployed'| 'employed',
    employementAddress1:string,
    employementAddress2:string,
    reason:string,
    termsAccepted: boolean,
    creditInfoDisclosure: boolean,
    assignedVerifier: string,
    status: 'pending' | 'verified' |'approved' | 'rejected'
}


const LoanSchema:Schema= new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
    },

    loanAmount:{
        type: Number,
        required: true
    },
    loanTenure:{
        type: Number,
        required: true
    },
    employementStatus:{
        type: String,
        enum: ['unemployed','employed'],
        required: true
    },
    employmentAddress1:{
        type: String,
        required: true
    },
    employmentAddress2:{
        type: String,
        required: true
    },
    reason:{
        type: String,
        required: true
    },
    termsAccepted:{
        type: Boolean,
        required: true
    },
    creditInfoDisclosure:{
        type: Boolean,
        required: true
    },
    assignedVerifier:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status:{
        type: String,
        enum: ['pending','verified','approved','rejected'],
        default: 'pending',
        required:true
    }
},
{
    timestamps: true
});

export const Loan= mongoose.model<ILoan>('Loan', LoanSchema);