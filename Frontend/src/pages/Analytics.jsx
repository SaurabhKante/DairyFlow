import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AnalyticsHeader from "../components/Analytics/AnalyticsHeader";
import MilkInventoryCard from "../components/Analytics/MilkInventoryCard";
import FinancialCard from "../components/Analytics/FinancialCard";
import CashFlowCard from "../components/Analytics/CashFlowCard";
import PendingSettlementCard from "../components/analytics/PendingSettlementCard";

import BottomNavbar from "../components/home/BottomNavBar";
import { BASE_URL } from "../constants/baseUrl";

const Analytics = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // Default Dates
  const today = new Date().toISOString().split("T")[0];

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-CA");
  };

  const getFirstDayOfMonth = () => {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1).toLocaleDateString(
      "en-CA",
    );
  };

  const [startDate, setStartDate] = useState(getFirstDayOfMonth());
  const [endDate, setEndDate] = useState(getCurrentDate());

  const [loading, setLoading] = useState(false);

  const [analytics, setAnalytics] = useState({
    totalPurchasedMilk: "0.00",
    totalSoldMilk: "0.00",
    totalPurchaseAmount: "0.00",
    totalSellsAmount: "0.00",
    totalPaidToFarmers: "0.00",
    totalReceivedFromCustomers: "0.00",
    pendingFarmerAmount: "0.00",
    pendingCustomerAmount: "0.00",
  });

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${BASE_URL}/analytics/v1/get-analytics`,
        {
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.SUCCESS) {
        setAnalytics(response.data.DATA);
      }
    } catch (error) {
      console.error("Analytics Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchAnalytics();
  };

  // Load analytics once on page load
  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <AnalyticsHeader />

        {/* Date Filter */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Start Date
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full h-12 rounded-xl border border-gray-300 px-3 focus:ring-2 focus:ring-blue-500 outline-none"
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
                className="w-full h-12 rounded-xl border border-gray-300 px-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full mt-5 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold transition"
          >
            {loading ? "Loading..." : "Load Analytics"}
          </button>
        </div>

        {/* Analytics Cards */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent mx-auto"></div>

            <p className="mt-4 text-gray-500">Loading analytics...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <MilkInventoryCard
              totalPurchasedMilk={analytics.totalPurchasedMilk}
              totalSoldMilk={analytics.totalSoldMilk}
              onPurchasedClick={() =>
                navigate("/milk-purchase-details", {
                  state: {
                    startDate,
                    endDate,
                    totalPurchasedMilk: analytics.totalPurchasedMilk,
                  },
                })
              }
              onSoldClick={() =>
                navigate("/milk-sells-details", {
                  state: {
                    startDate,
                    endDate,
                    totalSoldMilk: analytics.totalSoldMilk,
                  },
                })
              }
            />

            <FinancialCard
              totalPurchaseAmount={analytics.totalPurchaseAmount}
              totalSellsAmount={analytics.totalSellsAmount}
              onPurchaseClick={() =>
                navigate("/milk-purchase-details", {
                  state: {
                    startDate,
                    endDate,
                    totalPurchasedMilk: analytics.totalPurchasedMilk,
                  },
                })
              }
              onSalesClick={() =>
                navigate("/milk-sells-details", {
                  state: {
                    startDate,
                    endDate,
                    totalSoldMilk: analytics.totalSoldMilk,
                  },
                })
              }
            />

            <CashFlowCard
              totalPaidToFarmers={analytics.totalPaidToFarmers}
              totalReceivedFromCustomers={analytics.totalReceivedFromCustomers}
              onPaidFarmersClick={() =>
                navigate("/farmer-payment-details", {
                  state: {
                    startDate,
                    endDate,
                    totalAmount: analytics.totalPaidToFarmers,
                  },
                })
              }
              onReceivedCustomersClick={() =>
                navigate("/customer-payment-details", {
                  state: {
                    startDate,
                    endDate,
                    totalAmount: analytics.totalReceivedFromCustomers,
                  },
                })
              }
            />

            <PendingSettlementCard
              pendingFarmerAmount={analytics.pendingFarmerAmount}
              pendingCustomerAmount={analytics.pendingCustomerAmount}
              onFarmerClick={() =>
  navigate("/pending-farmer-payments", {
    state: {
      startDate,
      endDate,
      totalAmount: analytics.pendingFarmerAmount,
    },
  })
}
              onCustomerClick={() =>
  navigate("/pending-customer-payments", {
    state: {
      startDate,
      endDate,
      totalAmount: analytics.pendingFarmerAmount,
    },
  })
}
            />
          </div>
        )}
      </div>

      <BottomNavbar role={user?.role} />
    </div>
  );
};

export default Analytics;
