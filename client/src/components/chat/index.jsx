import React from "react";
// import React, { useEffect } from "react";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";
import Header from "@/components/customHeader";
import StandardMessageForm from "@/components/customMessageForms/StandardMessageForm";
import Ai from "@/components/customMessageForms/Ai";
import AiCode from "@/components/customMessageForms/AiCode";
import AiAssist from "@/components/customMessageForms/AiAssist";
 
const storedTitle = localStorage.getItem('chatFormTitle');


const chatFormTitle = document.querySelector('.ce-chat-form-title');
if (chatFormTitle) {
  try {
    chatFormTitle.textContent = storedTitle || 'Lawyers';
  } catch (error) {
    console.error('Error updating chat form title:', error);
  }
}

if (storedTitle !== 'Lawyers') {
  try {
    localStorage.setItem('chatFormTitle', 'Lawyers');
  } catch (error) {
    console.error('Error saving chat form title to local storage:', error);
  }
}



const LeftSidebar = ({ chats, setActiveChat }) => {
  return (
    <div className="ce-chat-list-column">
      <h2></h2>
      <ul>
        {chats.map(chat => (
          <li key={chat.id} onClick={() => setActiveChat(chat.id)}>
            {chat.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Chat = ({ user, secret }) => {
  const chatProps = useMultiChatLogic(
    import.meta.env.VITE_PROJECT_ID,
    user,
    secret
  );


  const handleLogout = () => {
    console.log("Logged out");
  };

  const handleLogin = () => {
    console.log("Logged in");
  };

  const handleSettings = () => {
    console.log("Settings clicked");
  };

  return (
    <div className="modern-layout">

      <div className="sidebar">
        <div className="additional-menu">
          <h2>Menu</h2>
          <ul>
            <li>
              <button onClick={handleSettings}>Settings</button>
            </li>
            <li>
              <button onClick={handleLogout}>home</button>
            </li>
            <li>
              <button onClick={handleLogin} className="btn-log">Logout</button>
            </li>
          </ul>
        </div>
      </div>

      <div className="main-content">
        <MultiChatSocket {...chatProps} />
        <MultiChatWindow
          {...chatProps}
          
          style={{ height: "100vh" }}
          renderChatHeader={(chat) => (
            <Header chat={chat} user={user} onLogout={handleLogout} />
          )}
          renderMessageForm={(props) => {
            if (chatProps.chat?.title.startsWith("AiChat_")) {
              return <Ai props={props} activeChat={chatProps.chat} />;
            }
            if (chatProps.chat?.title.startsWith("AiCode_")) {
              return <AiCode props={props} activeChat={chatProps.chat} />;
            }
            if (chatProps.chat?.title.startsWith("AiAssist_")) {
              return <AiAssist props={props} activeChat={chatProps.chat} />;
            }
    
            return (
              <StandardMessageForm props={props} activeChat={chatProps.chat} />
            );
          }}
        />
      </div>
   </div>
  );
};

export default Chat;
