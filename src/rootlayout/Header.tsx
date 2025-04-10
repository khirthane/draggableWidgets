import Logo from './Logo';

const Header = () => {
  return (
    <header className='bg-white shadow-sm sticky top-0 z-50 mb-4'>
      <div className='max-w-7xl mx-auto px-4 py-5 flex items-center justify-between'>
        <div>
          <Logo />
        </div>
      </div>
    </header>
  );
};

export default Header;
