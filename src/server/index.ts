export type Post = {
  id: number;
  body: string;
};

const posts = [
  { id: 1, body: "This is post #1" },
  { id: 2, body: "This is post #2" },
  { id: 3, body: "This is post #3" },
  { id: 4, body: "This is post #4" },
  { id: 5, body: "This is post #5" },
];

const wait = async () => {
  return new Promise((r) => setTimeout(r, 1000));
};

export const getPosts = async ({
  query = "",
}: {
  query?: string;
}): Promise<Post[]> => {
  console.log("Running getPosts...");

  await wait();

  // throw new Error();

  return posts.filter((post) =>
    post.body.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );
};

export const createPost = async ({ body }: { body: string }): Promise<Post> => {
  console.log("Running createPost...");

  await wait();

  const post = { id: posts.length + 1, body };

  posts.push(post);

  return post;
};
