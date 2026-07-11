import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import PaymentPersonCard from "../components/analytics/PaymentPersonCard";
import { BASE_URL } from "../constants/baseUrl";

const FarmerPaymentDetails = () => {
  const navigate = useNavigate();

    const { state } = useLocation();

  const startDate = state?.startDate;
  const endDate = state?.endDate;
  const totalAmount = state?.totalAmount;

  const [farmers, setFarmers] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${BASE_URL}/analytics/v1/get-paidto-farmer-details`,
        {
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.SUCCESS) {
        setFarmers(res.data.DATA);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}

      <div className="sticky top-0 bg-white border-b text-blue-700 h-16 flex items-center px-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>

        <h2 className="ml-3 text-xl font-bold text-blue-700">
          Farmer Payments
        </h2>
      </div>

      <div className="max-w-5xl mx-auto p-5">
        {/* Summary */}

        <div className="bg-blue-600 rounded-3xl text-white p-8 mb-8">
          <p className="uppercase tracking-wider text-sm">
            Total Paid
          </p>

          <h1 className="text-4xl font-bold mt-2">
            ₹{totalAmount}
          </h1>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            {farmers.map((item) => (
              <PaymentPersonCard
                key={item.farmerId}
                name={item.farmerName}
                mobileNo={item.mobileNo}
                totalPayments={item.totalPayments}
                totalAmount={item.totalPaidAmount}
                lastPaymentDate={item.lastPaymentDate.split(
                  " "
                )[0]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerPaymentDetails;