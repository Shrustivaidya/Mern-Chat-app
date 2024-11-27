import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";


const Chatpage = () => {
  const { user } = ChatState();
  
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      width: '95%',
      height: '90vh',
      padding: '4px',
    }}>
    {user && <MyChats />}
    {user && <Chatbox/>}
      </div>
    </div>
  )
}

export default Chatpage
