import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Feed from "./components/Feed";
import PopUp from "./components/PopUp";

const App = () => {
  const [user, setUser] = useState(null);
  const userId = "5b5aaff5-4324-4874-8970-7c375b7d889e";

  const getUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users?user_uuid=${userId}`
      );
      const data = await response.json();
      setUser(data[0]);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log(user);

  return (
    <div className="app">
      <Nav />
      <Header />
      <Feed />
      {/* <PopUp /> */}
    </div>
  );
};

export default App;
