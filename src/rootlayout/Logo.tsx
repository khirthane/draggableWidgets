import { Link } from 'react-router';

const Logo = () => {
  return (
    <>
      <Link to='/'>
        <h1 className='text-2xl font-bold'>Personal Dashboard</h1>
      </Link>
    </>
  );
};

export default Logo;
