import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, getPosts } from "../server";
import { useState } from "react";
import { useGetPosts } from "../hooks/useGetPosts";

type Props = {};

const Posts = (props: Props) => {
  const [filter, setFilter] = useState("");
  const [newPostInput, setNewPostInput] = useState("");

  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useGetPosts({ filter });

  const { mutateAsync: createPostMutation } = useMutation({
    mutationFn: createPost,
    onSuccess: ({}) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <div className="flex flex-col justify-center items-center gap-10 w-full h-full">
      <h1 className="text-3xl font-bold">📝 My Posts 📝</h1>
      <div className="flex flex-col items-center gap-4 bg-white border-black border-2 w-2/5 p-4 rounded-lg h-2/5 overflow-auto">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded-lg border-black border-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {isLoading ? (
          <h2 className="text-2xl">Loading...</h2>
        ) : isError ? (
          <h2 className="text-2xl text-red-700">Error loading data</h2>
        ) : (
          <>
            {data?.map((post) => (
              <div
                key={post.id}
                className="bg-white text-2xl p-4 rounded-lg border-black border-2 w-4/5"
              >
                {post.body}
              </div>
            ))}
          </>
        )}
      </div>
      <div className="w-2/5 flex items-center justify-center gap-2">
        <input
          type="text"
          className="p-4 rounded-lg border-black border-2"
          value={newPostInput}
          onChange={(e) => setNewPostInput(e.target.value)}
        />
        <button
          className="p-4 h-full border-black border-blue-800 bg-blue-500 text-white rounded-lg"
          onClick={async () => {
            await createPostMutation({ body: newPostInput });
            setNewPostInput("");
          }}
        >
          Add Post
        </button>
      </div>
    </div>
  );
};

export default Posts;
