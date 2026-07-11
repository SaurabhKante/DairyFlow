import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

import PaymentPersonCard from "../components/Analytics/PaymentPersonCard";
import { BASE_URL } from "../constants/baseUrl";

const CustomerPaymentDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const startDate = state?.startDate;
  const endDate = state?.endDate;
  const totalAmount = state?.totalAmount;

  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (!startDate || !endDate) {
      navigate("/analytics");
      return;
    }

    fetchCustomerPayments();
  }, []);

  const fetchCustomerPayments = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${BASE_URL}/analytics/v1/get-received-from-customer-details`,
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

      if (response.data.SUCCESS) {
        setCustomers(response.data.DATA);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b h-16 flex text-blue-700 items-center px-4 shadow-sm">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>

        <h2 className="ml-3 text-xl font-bold text-blue-700">
          Customer Payments
        </h2>
      </div>

      <div className="max-w-5xl mx-auto p-5">
        {/* Summary Card */}
        <div className="bg-blue-600 rounded-3xl text-white p-8 mb-8">
          <p className="uppercase tracking-wider text-sm opacity-90">
            Total Received Amount
          </p>

          <h1 className="text-4xl font-bold mt-2">
            ₹{totalAmount}
          </h1>
        </div>

        <h3 className="text-xl font-semibold mb-4">
          Customer Payments
        </h3>

        {loading ? (
          <div className="text-center py-12">
            Loading...
          </div>
        ) : (
          <div className="space-y-4">
            {customers.map((customer) => (
              <PaymentPersonCard
                key={customer.customerId}
                name={customer.customerName}
                mobileNo={customer.mobileNo}
                totalPayments={customer.totalPayments}
                totalAmount={customer.totalReceivedAmount}
                lastPaymentDate={customer.lastPaymentDate.split(" ")[0]}
                amountLabel="Total Received"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerPaymentDetails;