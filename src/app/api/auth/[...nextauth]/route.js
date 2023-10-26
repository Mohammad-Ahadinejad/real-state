import NextAuth from "next-auth/next";
import  CredentialsProvider  from "next-auth/providers/credentials";
import connectDB from "@/utils/connectDB";
import { verifyPassword } from "@/utils/auth";
import User from "@/models/User";

export const authOptions = {
    sessions: {strategy: "jwt"},
    providers:[
        CredentialsProvider({
            async authorize(credentials){
                const {email, password} = credentials;
                try {
                    await connectDB()
                } catch (error) {
                    throw new Error("مشکلی در سرور رخ داده است.")
                }

                if(!email || !password){
                    throw new Error("داده ها به درستی وارد نشده است.")
                }

                const user = await User.findOne({email})
                if(!user){
                    throw new Error("شما ثبت نام نکرده اید.")
                }

                const isValid = await verifyPassword(password, user.password)

                if(!isValid) throw new Error("ایمیل یا رمز عبور اشتباه است")

                return {email}
            }
        })
    ]
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}