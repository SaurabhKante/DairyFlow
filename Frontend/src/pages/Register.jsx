import RegisterHeader from "../components/register/RegisterHeader";
import RegisterForm from "../components/register/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] overflow-hidden relative">
      {/* Background Blur Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-200/40 blur-3xl"></div>

        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl"></div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-10 relative z-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8">

          <RegisterHeader />

          <div className="mt-8">
            <RegisterForm />
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="pb-6 text-center relative z-10">
        <p className="text-xs uppercase tracking-[3px] text-gray-400">
          Precision Dairy Management v2.4
        </p>

        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-2"></div>
      </footer>
    </div>
  );
};

export default Register;