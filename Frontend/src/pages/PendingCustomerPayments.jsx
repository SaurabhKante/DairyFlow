import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import PendingPersonCard from "../components/analytics/PendingPersonCard";
import { BASE_URL } from "../constants/baseUrl";

const PendingCustomerPayments = () => {
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

    fetchPendingCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPendingCustomers = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${BASE_URL}/analytics/v1/get-pending-customer-payments`,
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
    } catch (error) {
      console.error("Pending Customer Payments:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 text-red-600 h-16 flex items-center px-4 shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={22} />
        </button>

        <h1 className="ml-3 text-xl font-bold text-red-600">
          Pending Customer Payments
        </h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Summary Card */}
        <div className="bg-red-600 rounded-3xl text-white p-8 mb-8 shadow">
          <p className="uppercase tracking-wider text-sm opacity-90">
            Total Pending Amount
          </p>

          <h2 className="text-4xl font-bold mt-2">
            ₹{totalAmount}
          </h2>
        </div>

        {/* Section Heading */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold">
            Customers with Pending Payments
          </h2>

          <span className="text-gray-500 text-sm">
            {customers.length} Customers
          </span>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

            <p className="mt-4 text-gray-500">
              Loading pending customer payments...
            </p>
          </div>
        ) : customers.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <p className="text-gray-500">
              No pending customer payments found.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {customers.map((customer) => (
              <PendingPersonCard
                key={customer.customerId}
                name={customer.customerName}
                mobileNo={customer.mobileNo}
                pendingQuantity={customer.pendingQuantity}
                pendingAmount={customer.pendingAmount}
                totalTransactions={customer.totalSales}
                transactionLabel="Sales"
                quantityLabel="Pending Qty"
                amountLabel="Pending Amount"
                onClick={() => {
                  // Future navigation
                  // navigate(`/customer/${customer.customerId}`);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingCustomerPayments;