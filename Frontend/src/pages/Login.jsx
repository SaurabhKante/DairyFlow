import LoginHeader from "../components/login/LoginHeader";
import LoginForm from "../components/login/LoginForm";
import LoginFooter from "../components/login/LoginFooter";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] overflow-hidden">

      {/* Background Blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
      </div>

      <main className="flex-1 flex justify-center items-center px-4 py-10 relative z-10">

        <div className="w-full max-w-md">

          <LoginHeader />

          <LoginForm />

          <div className="mt-10 opacity-40 grayscale hover:grayscale-0 transition duration-500">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVeWrVDDjBqUjBi-v9Woo4uS1lQylUxQgGTzSVFaCDWzLYnE-lC7bgvVLrRrMU9YtJrXcxGrpZ_9zfqVqvrEM7D3VL2We3MLssnt24S8WMy2qepbRGHckv0cr1ci8yCZ0UPgawGZvElrTOPu-iOo6L8BXr7zpvPRFkus-eE3lqg0jA0AZwou69HV_Byp2fEtWgEMCp1BR5sVB-JApxUoHstNXEt6C466HeAUyKW_UhtHsaaZTzNuByp8Xav5cygRbPrdS4yT0cntsE"
              alt="Dairy Illustration"
              className="w-full h-32 object-contain"
            />
          </div>

        </div>

      </main>

      <LoginFooter />

    </div>
  );
};

export default Login;