import { Button } from '@/components/ui/button';
import { useLogout } from '@/reactquery';
import { clearUser } from '@/store/slices/authSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RootLayout = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const state: RootState = useSelector((state: RootState) => state);
  console.log(state);
  const user = {
    email: 'ranjithdurai111@gmail.com',
    username: 'Ranjith',
  };
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
          src="https://ui-avatars.com/api/?name=Ranjith&size=248"
          className="w-[145px] h-[145px] object-cover rounded-full"
        />
        <h1 className="text-5xl ">Hi , @{user.username}</h1>
        <h1 className="text-lg">{user.email}</h1>
        <Button
          onClick={submitHandler}
          className="text-white bg-red-500 hover:bg-red-800"
        >
          {isPending ? 'Logging out...' : 'Logout'}
        </Button>
      </div>
      {/* <header className="flex justify-end w-full">
        <button onClick={submitHandler}>
          {isPending ? 'Logging out...' : 'Logout'}
        </button>
      </header> */}
    </div>
  );
};

export default RootLayout;
