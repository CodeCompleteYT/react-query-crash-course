import { useState } from "react";
import Posts from "./components/Posts";

type Props = {};

const App = (props: Props) => {
  const [showPosts, setShowPosts] = useState(true);

  return (
    <div className="w-screen h-screen bg-slate-50 flex flex-col p-4 items-center justify-start">
      <button
        className="p-4 h-20 border-black border-blue-800 bg-blue-500 text-white rounded-lg"
        onClick={() => {
          setShowPosts((prev) => !prev);
        }}
      >
        Toggle Posts
      </button>
      {showPosts ? <Posts /> : null}
    </div>
  );
};

export default App;
