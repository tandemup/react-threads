import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Feed from "./components/Feed";
import PopUp from "./components/PopUp";
import WriteIcon from "./components/WriteIcon";

const App = () => {
  const [user, setUser] = useState(null);
  const [threads, setThreads] = useState(null);
  const [viewThreadsFeed, setViewThreadsFeed] = useState(true);
  const [filteredThreads, setFilteredThreads] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);  

  const userId = "5b5aaff5-4324-4874-8970-7c375b7d889e";

  const getUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users?user_uuid=${userId}`
      );
      const data = await response.json();
      setUser(data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const getThreads = async () => {
    try {
      const response = await fetch(`http://localhost:3000/threads?threads?thread_from=${userId}`)
      const data = await response.json()
      setThreads(data)
    } catch (error) {
      console.error(error);
    }
  }

  const getThreadsFeed = async () => {
    if (viewThreadsFeed) {
      const standAloneThreads = threads?.filter(thread => thread.reply_to === null)
      setFilteredThreads(standAloneThreads)
    }
    if (!viewThreadsFeed) {
      const replyThreads = threads?.filter(thread => thread.reply_to !== null)
      setFilteredThreads(replyThreads)
    }
  }

  useEffect(() => {
    getUser();
    getThreads();
  }, []);

  useEffect(() => {
    getThreadsFeed(); 
  }, [user, threads, viewThreadsFeed])
 
  return (
    <>
      {user && (
        <div className="app">
          <Nav url={user.instagram_url} />
          <Header 
            user={user}
            viewThreadsFeed={viewThreadsFeed}
            setViewThreadsFeed={setViewThreadsFeed} 
          />
          <Feed 
              user={user}
              setOpenPopUp={setOpenPopUp} 
              filteredThreads={filteredThreads}
              getThreads={getThreads}
          />
          {openPopUp && 
            <PopUp 
              user={user} 
              setOpenPopUp={setOpenPopUp}
            />}
          <div onClick={() => setOpenPopUp(true)}>
              <WriteIcon />
          </div>

        </div>
      )}
    </>
  );
};

export default App;
