import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="grid w-dvw h-dvh place-content-center">
      <Outlet />
    </div>
  );
};

export default RootLayout;
