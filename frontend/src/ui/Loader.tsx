import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const Loader = () => {
  const { isAuthLoading } = useSelector((state: RootState) => state.loader);
  return (
    <div className={`loader-container ${isAuthLoading ? 'active' : ''}`}>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
