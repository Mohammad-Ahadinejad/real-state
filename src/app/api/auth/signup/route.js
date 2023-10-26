import connectDB from "@/utils/connectDB";
import { hashPassword } from "@/utils/auth";
import User from "@/models/User"
import { NextResponse } from "next/server";


export const POST = async(req) =>{
    try {

        await connectDB();
        const {email, password} = await req.json();
        
        if(!email || !password){
            return NextResponse.json({error: "داده ها به درستی وارد نشده است."},{status: 422})
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json({error: "شما قبلا ثبت نام کرده اید."}, {status: 422})
        }
        
        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({email: email, password:hashedPassword})

        return NextResponse.json({message: "ثبت نام انجام شد."}, {status: 201})

    } catch (err) {
        return NextResponse.json({error: "خطایی در سمت سرور رخ داده است."},{status: 500})     
    }
}