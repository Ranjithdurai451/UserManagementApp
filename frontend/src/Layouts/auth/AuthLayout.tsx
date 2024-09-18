import { Outlet } from 'react-router-dom';
export function AuthLayout() {
  return (
    <div className=" w-dvw h-dvh lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center h-full py-12 bg-black ">
        <Outlet />
      </div>
      <div className="hidden bg-muted lg:block bg"></div>
    </div>
  );
}
