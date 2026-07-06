import { Droplets } from "lucide-react";

const RegisterHeader = () => {
  return (
    <header className="text-center space-y-2">

      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
          <Droplets size={34} className="text-white" />
        </div>
      </div>

      <h1 className="text-4xl font-bold text-blue-700 tracking-tight">
        DairyFlow
      </h1>

      <p className="text-gray-500 text-base">
        Join our efficient agricultural ecosystem.
      </p>

    </header>
  );
};

export default RegisterHeader;