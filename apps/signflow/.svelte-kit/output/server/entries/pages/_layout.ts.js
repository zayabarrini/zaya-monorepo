const prerender = true;
const load = ({ url }) => {
  return {
    pathname: url.pathname
  };
};
export {
  load,
  prerender
};
