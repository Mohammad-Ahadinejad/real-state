import { authOptions } from "@/api/auth/[...nextauth]/route"
import User from "@/models/User"
import Profile from "@/models/Profile"
import connectDB from "@/utils/connectDB"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const DELETE = async(req, context)=>{
    try{
        await connectDB()
        const id = context.params.profileId

        const session = await getServerSession(authOptions)
        if(!session){
            return NextResponse.json({error: "ابتدا به حساب کاربری خود وارد شوید"}, {status: 401})
        }

        
        const user = await User.findOne({email: session.user.email})
        if(!user){
            return NextResponse.json({error: "حساب کاربری یافت نشد"}, {status: 404})
        }
        
        const profile = await Profile.findOne({_id:id})
        if(!user._id.equals(profile.userId)){
            return NextResponse.json({error: "دسترسی شما به این آگهی محدود شده است"},{status: 403})
        }

        await Profile.deleteOne({_id: id})

        return NextResponse.json({message: "آگهی مورد نظر حذف شد"},{status: 200})




    }catch(err){
        return NextResponse.json({error: "مشکلی در سرور به وجود آمده است"},{status:500})
    }

}