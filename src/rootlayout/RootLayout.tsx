import { Outlet } from 'react-router';
import Header from './Header';

const RootLayout = () => {
  return (
    <div className='app'>
      <Header />
      <div className='pageContainer'>
        <section className='d-flex max-w-7xl mx-auto'>
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default RootLayout;
