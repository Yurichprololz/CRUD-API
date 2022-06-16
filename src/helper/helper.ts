const isUserRoute = (url: string | undefined): boolean => {
  if (url) {
    return /\/api\/users\/\w+/gm.test(url);
  }
  return false;
};

const getUserId = (url: string | undefined): string | undefined => {
  if (url) {
    const arr = url.split('/');
    return arr[arr.length - 1];
  }
  return undefined;
};

export { isUserRoute, getUserId };
