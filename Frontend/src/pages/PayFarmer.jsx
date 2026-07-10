// src/pages/PayFarmer.jsx

import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import PaymentHeader from "../components/farmer/payFarmer/PaymentHeader";
import PaymentSummaryCard from "../components/farmer/payFarmer/PaymentSummaryCard";
import PurchaseCard from "../components/farmer/payFarmer/PurchaseCard";
import PaymentModal from "../components/farmer/payFarmer/PaymentModal";
import { BASE_URL } from "../constants/baseUrl";


const PayFarmer = () => {
  const { farmerId } = useParams();
  const location = useLocation();

  const farmer = location.state;

  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState(null);

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const fetchPaymentData = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${BASE_URL}/admin/v1/get-farmer-milk-purchase/${farmerId}`,
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

      setPaymentData(res.data.DATA);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.MESSAGE || "Failed to fetch payment details."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentData();
    // eslint-disable-next-line
  }, []);

  const handleSearch = () => {
    fetchPaymentData();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-semibold text-gray-600">
          Loading Payment Details...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9ff] pb-24">
      <PaymentHeader
        title={farmer?.farmerName || "Farmer Payment"}
      />

      <main className="px-4 py-5 space-y-6">
        {/* Farmer Information */}
<section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
  <div className="flex items-center gap-4">
    {/* Avatar */}
    <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-bold">
      {farmer?.farmerName
        ?.split(" ")
        .map((word) => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()}
    </div>

    {/* Details */}
    <div>
      <p className="text-xs font-semibold tracking-wider uppercase text-gray-500">
        Summary Of:
      </p>

      <h2 className="text-2xl font-bold text-gray-800">
        {farmer?.farmerName}
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        📞 {farmer?.mobileNo}
      </p>

      {farmer?.address && (
        <p className="text-sm text-gray-500">
          📍 {farmer.address}
        </p>
      )}
    </div>
  </div>
</section>
        {/* Date Filters */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
            Reporting Period
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Start Date
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full h-12 rounded-xl border border-gray-300 px-3"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                End Date
              </label>

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full h-12 rounded-xl border border-gray-300 px-3"
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="w-full mt-5 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Load Records
          </button>
        </section>

        {/* Summary */}
        <PaymentSummaryCard
          summary={paymentData?.summary}
        />
        {/* Proceed Payment */}
        {paymentData?.purchases?.length > 0 && (
          <button
            onClick={() => setShowPaymentModal(true)}
            className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg shadow-md"
          >
            Proceed to Payment
          </button>
        )}

        {/* Purchase List */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              Pending Payments
            </h2>

            <span className="text-sm text-blue-600 font-semibold">
              {paymentData?.purchases?.length || 0} Records
            </span>
          </div>

          {paymentData?.purchases?.length > 0 ? (
            <div className="space-y-4">
              {paymentData.purchases.map((purchase) => (
                <PurchaseCard
                  key={purchase.purchaseId}
                  purchase={purchase}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 py-16 text-center">
              <h3 className="text-xl font-semibold text-gray-700">
                No Records Found
              </h3>

              <p className="text-gray-500 mt-2">
                No milk purchases are available for the selected
                date range.
              </p>
            </div>
          )}
        </section>

        
      </main>

      <PaymentModal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        farmerId={farmerId}
        startDate={startDate}
        endDate={endDate}
        totalAmount={paymentData?.summary?.totalAmount}
        onSuccess={() => {
          setShowPaymentModal(false);
          fetchPaymentData();
        }}
      />
    </div>
  );
};

export default PayFarmer;