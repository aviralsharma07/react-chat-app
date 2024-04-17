import Detail from "./Components/Detail/Detail";
import List from "./Components/List/List";
import Chat from "./Components/Chat/Chat";
import Login from "./Components/Login/Login";
import Notification from "./Components/Notification/Notification";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/Firebase";
import { useUserStore } from "./lib/UserStore";
import { useChatStore } from "./lib/chatStore";
const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  console.log(currentUser);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
