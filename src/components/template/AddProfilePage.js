"use client"
import { useEffect, useState } from "react";
import TextInput from "@/module/TextInput";
import RadioList from "@/module/RadioList";
import TextList from "@/module/TextList";
import CustomDatePicker from "@/module/CustomDatePicker";
import styles from "@/template/AddProfilePage.module.css"
import toast, { Toaster } from "react-hot-toast";
import Loader from "@/module/Loader";
import { useRouter } from "next/navigation";

const AddProfilePage = ({data}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [profileData, setProfileData] = useState({
        title: "",
        description: "",
        location: "",
        phone: "",
        price: "",
        realState: "",
        constructionDate: new Date(),
        category: "villa",
        rules: [],
        amenities: [],
    })

    useEffect(()=>{if(data) setProfileData(data)}, [])

    const router = useRouter()

    const submitHandler = async() =>{
        setIsLoading(true)
        const res = await fetch("/api/profile",{
            method: "POST",
            body:JSON.stringify(profileData),
            headers: {"Content_Type": "application/json"} 
        });

        const data = await res.json();
        if(data.error){
            toast.error(data.error)
        }else{
            toast.success(data.message)
        }
        router.refresh()
        setIsLoading(false)
    }

    const editHandler = async()=>{
        setIsLoading(true)
        const res = await fetch("/api/profile",{
            method: "PATCH",
            body: JSON.stringify(profileData),
            headers: {"Content_Type" : "application.json"}
        })
        const data = await res.json()
        if(data.error){
            toast.error(data.error)
        }else{
            toast.success(data.message)
        }
        router.refresh()
        setIsLoading(false)
    }

    return ( 
        <div className={styles.container}>
            {
                data ? <h3>ویرایش آگهی</h3> : <h3>ثبت آگهی</h3>
            }

            <TextInput
                title= "عنوان آگهی"
                name= "title"
                profileData={profileData}
                setProfileData={setProfileData}
            />
            <TextInput
                title= "توضیحات"
                name= "description"
                profileData={profileData}
                setProfileData={setProfileData}
                textarea={true}
            />
            <TextInput
                title= "آدرس"
                name= "location"
                profileData={profileData}
                setProfileData={setProfileData}
            />
            <TextInput
                title= "شماره تماس"
                name= "phone"
                profileData={profileData}
                setProfileData={setProfileData}
            />
            <TextInput
                title= "قیمت(تومان)"
                name= "price"
                profileData={profileData}
                setProfileData={setProfileData}
            />
            <TextInput
                title= "بنگاه"
                name= "realState"
                profileData={profileData}
                setProfileData={setProfileData}
            />
            <RadioList profileData={profileData} setProfileData={setProfileData} />
            <TextList title="امکانات رفاهی" profileData={profileData} setProfileData={setProfileData} type="amenities" />
            <TextList title="قوانین" profileData={profileData} setProfileData={setProfileData} type="rules" />
            <CustomDatePicker profileData={profileData} setProfileData={setProfileData}/>
            <Toaster />
            {   isLoading ? <Loader /> : data ? 
                    <button className={styles.submit} onClick={editHandler}>ویرایش اگهی</button>
                    :
                    <button className={styles.submit} onClick={submitHandler}>ثبت اگهی</button>
            }
        </div>
     );
}
 
export default AddProfilePage;