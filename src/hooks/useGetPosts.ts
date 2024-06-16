import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../server";

export const useGetPosts = ({ filter = "" }: { filter?: string }) => {
  return useQuery({
    queryFn: () => getPosts({ query: filter }),
    queryKey: ["posts", { filter }],
    retry: 0,
  });
};
