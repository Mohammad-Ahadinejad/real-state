import Profile from "@/models/Profile";
import AddProfilePage from "@/template/AddProfilePage";
import connectDB from "@/utils/connectDB";

const Edit = async({params: {profileId}}) => {
    await connectDB()
    const profile = await Profile.findOne({_id: profileId})

    if(!profile) return <h3>لطفا مجددا سعی کنید</h3>

    return ( 
        <AddProfilePage data={profile}/>
     );
}
 
export default Edit;