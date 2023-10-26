"use client"
import Link from "next/link";
import { useState } from "react";
import styles from "@/template/SignupPage.module.css"
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "@/module/Loader";

const SignupPage= () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const [loading, setLoading] = useState(false)


    const router = useRouter()

    const signupHandler = async(e)=>{
        e.preventDefault();

        if(password !== rePassword){
            toast.error("رمز عبور و تکرار آن یکسان نیست.")
            return
        }

        setLoading(true)
        const res = await fetch("/api/auth/signup",{
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {"Content_Type": "application/json"},
        })

        const data = await res.json();
        setLoading(false)

        if(res.status===201){
            router.push("/signin")
        }else{
            toast.error(data.error)
        }


    }

    return (  
        <div className={styles.form}>
            <h4>فرم ثبت نام</h4>
            <form>
                <label>ایمیل:</label>
                <input 
                    type="text"
                    value={email}
                    onChange={e=>setEmail(e.target.value)} 
                />
                <label>رمز عبور:</label>
                <input 
                    type="password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)} 
                />
                <label>تکرار رمز عبور:</label>
                <input 
                    type="password"
                    value={rePassword}
                    onChange={e=>setRePassword(e.target.value)} 
                />
                {
                    loading ? 
                    <Loader />
                     : 
                    <button onClick={signupHandler}>ثبت نام</button>
                }
                
            </form>
            <p>آیا ثبت نام کرده اید؟ 
                <Link href="/signin">ورود</Link>
            </p>
            <Toaster />
        </div>
    );
}
 
export default SignupPage;