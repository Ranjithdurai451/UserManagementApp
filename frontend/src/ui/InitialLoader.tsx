const InitialLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-dvw h-dvh z-[1] flex items-center justify-center bg-black">
      <div className="newtons-cradle">
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
      </div>
    </div>
  );
};

export default InitialLoader;
