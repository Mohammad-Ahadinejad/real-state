import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import styles from "@/module/CustomDatePicker.module.css"

const CustomDatePicker = ({profileData, setProfileData}) => {
    const changeHandler = (e)=>{
        const newDate = new Date(e)
        setProfileData({...profileData, constructionDate: newDate})
    }
    return ( 
        <div className={styles.container}>
        <DatePicker
            calendar={persian}
            locale={persian_fa}
            value={profileData.constructionDate}
            onChange={changeHandler}
        />
        </div>
    );
}
 
export default CustomDatePicker;