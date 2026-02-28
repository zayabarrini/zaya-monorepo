const load = async ({ fetch }) => {
  const response = await fetch("/api/home");
  const posts = await response.json();
  return {
    posts
  };
};
export {
  load
};
