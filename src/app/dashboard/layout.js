import { authOptions } from "@/api/auth/[...nextauth]/route";
import DashboardSidebar from "@/layout/DashboardSidebar"
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
    title: 'پنل کاربری',
  }

const DashboardLayout = async({children}) => {
    const session = await getServerSession(authOptions);
    if(!session) redirect("/signin")

    await connectDB()
    const user = await User.findOne({email: session.user.email})
    if(!user) <h3>مشکلی پیش آمده است</h3>

    return ( 
        <DashboardSidebar role={user.role} email={user.email}>{children}</DashboardSidebar>
    );
}
 
export default DashboardLayout;