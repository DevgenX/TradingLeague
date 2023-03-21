import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-wrapper">
      <h1 className="title">404</h1>
      <h3 className="msg">Page not found</h3>
      <p>Sorry, the page you are looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">
        Go back to Game Lobby
      </Link>
    </div>
  );
};

export default NotFound;
