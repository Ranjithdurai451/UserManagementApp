import { useLogout } from '@/reactquery';
import { clearUser } from '@/store/slices/authSlice';
import { AppDispatch } from '@/store/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RootLayout = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { mutateAsync, isPending } = useLogout();
  async function submitHandler() {
    const res = await mutateAsync();

    if (res.error) {
      alert(res.error || 'Logout failed');
      return;
    }
    dispatch(clearUser());
    navigate('/login');
  }
  return (
    <div className="w-dvw h-dvh ">
      <header className="flex justify-end w-full">
        <button onClick={submitHandler}>
          {isPending ? 'Logging out...' : 'Logout'}
        </button>
      </header>
    </div>
  );
};

export default RootLayout;
