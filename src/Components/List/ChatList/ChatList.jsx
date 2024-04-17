import { useEffect, useState } from "react";
import "./ChatList.css";
import AddUser from "./AddUser/AddUser";
import { useUserStore } from "../../../lib/UserStore";
import { db } from "../../../lib/Firebase";
import { onSnapshot, doc, getDoc } from "firebase/firestore";
import { useChatStore } from "../../../lib/chatStore";
import { updateDoc } from "firebase/firestore";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState("");

  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  // useEffect(() => {
  //   const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
  //     const items = res.data().chats;

  //     async (res) => {
  //       const items = res.data().chats;
  //       const promises = items.map(async (item) => {
  //         const userDocRef = doc(db, "users", item.receiverId);
  //         const userDocSnap = await getDoc(userDocRef);

  //         const user = userDocSnap.data();

  //         return { ...item, user };
  //       });

  //       const chatData = await Promise.all(promises);

  //       setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
  //     };
  //   });

  //   return () => {
  //     unSub();
  //   };
  // }, [currentUser.id]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
      const chatList = res.data().chats || []; // Handle empty chats

      const promises = chatList.map(async (item) => {
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.data();

        return { ...item, user };
      });

      const chatData = await Promise.all(promises);

      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    });

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex((c) => c.chatId === chat.chatId);

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredChats = chats.filter((c) => c.user.username.toLowerCase().includes(input.toLowerCase()));

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </div>
        <img src={addMode ? "./minus.png" : "./plus.png"} alt="" className="add" onClick={() => setAddMode((prev) => !prev)} />
      </div>
      {filteredChats.map((chat) => (
        <div
          className="item"
          key={chat.chatId}
          onClick={() => {
            handleSelect(chat);
          }}
          style={{
            backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
          }}
        >
          <img src={chat.user.blocked.includes(currentUser.id) ? "./avatar.png" : chat.user.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{chat.user.blocked.includes(currentUser.id) ? "User" : chat.user.username} </span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
