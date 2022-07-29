export const LoginLink = () => {
  return (
    <a
      className="btn btn-secondary text-primary"
      href={`https://github.com/login/oauth/authorize?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&scope=gist&redirect_uri=${window.location.origin + window.location.pathname}`}
    >
      Login
    </a>
  );
};
