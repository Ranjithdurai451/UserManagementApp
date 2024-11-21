import { Button } from '@/components/ui/button';
import { useLogout } from '@/reactquery';
import { clearUser } from '@/store/slices/authSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user);

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
    <div className="flex flex-col items-center gap-3">
      <img
        src={user.profileImg}
        className="w-[145px] h-[145px] object-cover rounded-full outline outline-[6px]  outline-gray-700"
      />
      <h1 className="text-5xl ">Hi, @{user.username}</h1>
      <h1 className="text-lg">{user.email}</h1>

      <div className="flex gap-4">
        <Button
          onClick={submitHandler}
          className="text-white bg-red-500 hover:bg-red-800"
        >
          {isPending ? 'Logging out...' : 'Logout'}
        </Button>
        <Button variant={'secondary'}>Edit Profile</Button>
        {user.role === 'ADMIN' && (
          <Link
            to={'/in/admin'}
            className="px-4 py-1 text-white bg-red-500 rounded-md hover:bg-red-800 h-9"
          >
            Admin
          </Link>
        )}
      </div>
    </div>
  );
};

export default Profile;
