import { Droplets } from "lucide-react";

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">

      <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto shadow-md">

        <Droplets
          size={34}
          className="text-white "
        />

      </div>

      <h1 className="text-4xl font-bold text-blue-700 mt-4">
        DairyFlow
      </h1>

      <p className="text-gray-500 mt-2">
        Reliable precision for modern farming.
      </p>

    </div>
  );
};

export default LoginHeader;