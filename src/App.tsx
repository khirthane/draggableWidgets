import { Route, Routes } from 'react-router';
import Home from './pages/home/Home';
import RootLayout from './rootlayout/RootLayout';

function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index path='/' element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
