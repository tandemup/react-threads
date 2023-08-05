import Thread from "./Thread";

const Feed = ({ user, setOpenPopUp, filteredThreads }) => {
  return (
    <div className="feed">
      { filteredThreads?.map(filteredThread => 
        <Thread 
          key={filteredThread.id}
          setOpenPopUp={setOpenPopUp} 
          user={user} 
          filteredThread={filteredThread}
        />) }
    </div>
  );
};

export default Feed;
