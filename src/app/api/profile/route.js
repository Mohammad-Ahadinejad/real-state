const { default: Profile } = require("@/models/Profile");
const { default: User } = require("@/models/User");
const { default: connectDB } = require("@/utils/connectDB");
const { Types } = require("mongoose");
const { getServerSession } = require("next-auth");
const { NextResponse } = require("next/server")

export const GET = async()=>{
    try{
        await connectDB()
        const profiles = await Profile.find({published: true}).select("-userId")
        return NextResponse.json({data:profiles},{status:200})
    }catch(err){
        return NextResponse.json({error:"مشکلی در سرور به وجود آمده است"},{status: 500})
    }
}

export const POST = async(req)=>{
    try {
        await connectDB();
        const body = await req.json();
        const {
            title,
            description,
            location,
            phone,
            price,
            realState,
            constructionDate,
            category,
            rules,
            amenities,} = body;

        const session = await getServerSession(req)
        if(!session){
            return NextResponse.json({error:"ابتدا به حساب کاربری خود وارد شوید"},{status: 401})
        }

        const user = await User.findOne({email: session.user.email})
        if(!user){
            return NextResponse.json({error:"اطلاعات شما در سرور وجود ندارد"},{status:404})
        }

        if( !title ||
            !description ||
            !location ||
            !phone ||
            !price ||
            !realState ||
            !constructionDate ||
            !category){
            return NextResponse.json({error: "داده ها به درستی وارد نشده اند"},{status: 400})
        }
            

        const newProfile = await Profile.create({
            title,
            description,
            location,
            phone,
            price: +price,
            realState,
            constructionDate,
            category,
            rules,
            amenities,
            userId: new Types.ObjectId(user._id),            
        })
        return NextResponse.json({message:"آگهی شما با موفقیت ثبت شد"},{status:201})

    } catch (err) {
        return NextResponse.json({error:"مشکلی در سرور به وجود آمده است"},{status: 500})
    }
}

export const PATCH = async(req)=>{
    try {
        await connectDB();
        const body = await req.json();
        const {
            _id,
            title,
            description,
            location,
            phone,
            price,
            realState,
            constructionDate,
            category,
            rules,
            amenities,} = body;

        const session = await getServerSession(req)
        if(!session){
            return NextResponse.json({error:"ابتدا به حساب کاربری خود وارد شوید"},{status: 401})
        }

        const user = await User.findOne({email: session.user.email})
        if(!user){
            return NextResponse.json({error:"اطلاعات شما در سرور وجود ندارد"},{status:404})
        }

        if( !_id ||
            !title ||
            !description ||
            !location ||
            !phone ||
            !price ||
            !realState ||
            !constructionDate ||
            !category){
            return NextResponse.json({error: "داده ها به درستی وارد نشده اند"},{status: 400})
        }

        const profile = await Profile.findOne({_id})
        if(!user._id.equals(profile.userId)){
            return NextResponse.json({error: "دسترسی شما به این آگهی محدود شده است"},{status: 403})
        }

        profile.title = title
        profile.description = description
        profile.location = location
        profile.price = price
        profile.phone = phone
        profile.realState = realState
        profile.constructionDate = constructionDate
        profile.category = category
        profile.rules = rules
        profile.amenities = amenities
        profile.save()

        return NextResponse.json({message:"آگهی با موفقیت ویرایش شد"},{status:200})

    } catch (err) {
        return NextResponse.json({error:"مشکلی در سرور به وجود آمده است"},{status: 500})
    }
}






