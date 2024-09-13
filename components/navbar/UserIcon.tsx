import {LuUser2} from "react-icons/lu"
import { fetchProfileImageAction } from "@/utils/actions"

async function UserIcon() {
const profileImage = await fetchProfileImageAction()
if(profileImage) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={profileImage} className="w-6 h-6 bg-primary rounded-full text-white object-cover" alt='no profile image'/>
} 
  return (
    <LuUser2 className="w-6 h-6 bg-primary rounded-full text-white" />
  )
}

export default UserIcon