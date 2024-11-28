import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import { useState } from "react";


const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
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
    {user && <MyChats fetchAgain={fetchAgain}/>}
    {user && <Chatbox/>}
      </div>
    </div>
  )
}

export default Chatpage
