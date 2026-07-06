const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-4xl font-bold">
          Welcome
        </h1>

        <p className="mt-3 text-gray-500">
          {user?.email}
        </p>

        <p className="mt-2 text-blue-600 font-semibold">
          {user?.role}
        </p>

      </div>

    </div>
  );
};

export default Home;