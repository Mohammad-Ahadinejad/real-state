import styles from "@/module/TextList.module.css"
import {MdOutlineLibraryAdd} from "react-icons/md"
import {AiOutlineDelete} from "react-icons/ai"

const TextList = ({title, profileData, setProfileData, type}) => {
    const addHandler = ()=>{
        setProfileData({...profileData, [type]: [...profileData[type], ""]})
    }
    const changeHandler = (e,n)=>{
        const newList = [...profileData[type]]
        newList[n] = e.target.value;
        setProfileData({...profileData, [type]: newList})
    }
    const deleteHandler = (n)=>{
        const newList = [...profileData[type]]
        newList.splice(n,1)
        setProfileData({...profileData, [type]: newList})
    }
    return ( 
        <div className={styles.container}>
            <p>{title}</p>
            {
                profileData[type].map((i,index)=>(
                    <div className={styles.card} key={index}>
                        <input type="text" value={i} onChange={(e)=>changeHandler(e,index)} />
                        <button onClick={()=>deleteHandler(index)}>
                            حذف
                            <AiOutlineDelete />
                        </button>
                    </div>
                ))
            }

            <button onClick={addHandler}>
                افزودن
                <MdOutlineLibraryAdd />
            </button>
        </div>
    );
}
 
export default TextList;