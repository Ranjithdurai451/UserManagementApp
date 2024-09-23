import { Button } from '@/components/ui/button';
import { useLogout } from '@/reactquery';
import { clearUser } from '@/store/slices/authSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RootLayout = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const { mutateAsync, isPending } = useLogout();
  async function submitHandler() {
    const res = await mutateAsync();

    if (!res.status) {
      alert(res.error || 'Logout failed');
      return;
    }
    dispatch(clearUser());
    navigate('/login');
  }
  return (
    <div className="grid w-dvw h-dvh place-content-center">
      <div className="flex flex-col items-center gap-3">
        <img
          src={`https://ui-avatars.com/api/?name=${user?.username}&size=248&background=random&length=1&rounded=true&font-size=0.6 `}
          className="w-[145px] h-[145px] object-cover rounded-full outline outline-[6px]  outline-gray-700"
        />
        <h1 className="text-5xl ">Hi, @{user.username}</h1>
        <h1 className="text-lg">{user.email}</h1>
        <Button
          onClick={submitHandler}
          className="text-white bg-red-500 hover:bg-red-800"
        >
          {isPending ? 'Logging out...' : 'Logout'}
        </Button>
      </div>
    </div>
  );
};

export default RootLayout;
