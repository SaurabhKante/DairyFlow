import AddFarmerForm from "../components/farmer/addFarmer/AddFarmerForm";
import AddFarmerHeader from "../components/farmer/addFarmer/AddFarmerHeader";


const AddFarmer = () => {
  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      <AddFarmerHeader />

      <main className="max-w-xl mx-auto px-5 py-6">
        {/* Hero Card */}

        <div className="bg-blue-50 rounded-2xl border border-blue-100 p-8 text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-blue-700 text-white flex items-center justify-center mx-auto mb-4 text-3xl">
            👨‍🌾
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Farmer Registration
          </h2>

          <p className="text-gray-500 mt-2">
            Register a new farmer into the DairyFlow system.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <AddFarmerForm />
        </div>
      </main>
    </div>
  );
};

export default AddFarmer;