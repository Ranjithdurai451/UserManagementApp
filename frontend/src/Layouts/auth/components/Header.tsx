import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="flex items-center justify-end gap-5 px-5 py-3">
      <Link to={'/login'}>Login</Link>
      <Link to={'/signup'}>Signup</Link>
    </div>
  );
};

export default Header;
