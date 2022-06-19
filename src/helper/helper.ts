const isUserRoute = (url: string | undefined): boolean => {
  if (url) {
    return /\/api\/users\/\w+/gm.test(url);
  }
  return false;
};

export default isUserRoute;
