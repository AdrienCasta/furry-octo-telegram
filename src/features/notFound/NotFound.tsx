import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div>
      <h1>Are you lost pal ?</h1>
      <Link to="/register/1">Start to register 😀</Link>
    </div>
  );
};

export default NotFound;
