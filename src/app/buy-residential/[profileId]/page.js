import Profile from "@/models/Profile";
import DetailsPage from "@/template/DetailsPage";
import connectDB from "@/utils/connectDB";

const ProfileDetails = async(props) => {
    const profileId = props.params.profileId
    await connectDB()
    const profile = await Profile.findOne({_id: profileId})
    if(!profile) return <h3>مشکلی پیش آمده است</h3>
 
    return ( 
        <DetailsPage data={profile} />
    );
}

export const generateMetadata = async(props)=>{
    const profileId = props.params.profileId
    await connectDB()
    const profile = await Profile.findOne({_id: profileId})
    return(
        {   title:profile.title, 
            description: profile.description,
            authors: {name : profile.realState},
            other: {mytag:"my-tag", name:"mohammad"}
        }
    )
}
 
export default ProfileDetails;