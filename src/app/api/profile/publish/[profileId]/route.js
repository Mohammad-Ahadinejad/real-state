import { authOptions } from "@/api/auth/[...nextauth]/route"
import User from "@/models/User"
import Profile from "@/models/Profile"
import connectDB from "@/utils/connectDB"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"


export async function PATCH(req, context){
    try {
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

        if(user.role!=="ADMIN") return NextResponse.json({error: "دسترسی شما به صفحه محدود شده است"},{status : 403})
        
        const profile = await Profile.findOne({_id:id})
        profile.published = true
        profile.save()

        return NextResponse.json({message: "آگهی مورد نظر منتشر شد"},{status: 200})



    } catch (err) {
        return NextResponse.json(
            {error:"مشکلی پیش آمده است"},
            {status:500}
        )
    }

}