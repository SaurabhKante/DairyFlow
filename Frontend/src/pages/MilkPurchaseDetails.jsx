import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Droplets } from "lucide-react";

import { BASE_URL } from "../constants/baseUrl";
import ContributionCard from "../components/analytics/ContributionCard";
import SummaryCard from "../components/analytics/SummaryCard";

const MilkPurchaseDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    startDate,
    endDate,
    totalPurchasedMilk,
  } = location.state || {};

  const [loading, setLoading] = useState(true);

  const [farmers, setFarmers] = useState([]);

  const fetchPurchasedMilk = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${BASE_URL}/analytics/v1/get-purchased-milk-details`,
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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchasedMilk();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}

      <header className="sticky top-0 bg-white border-b z-50 h-16 flex text-blue-700 items-center px-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>

        <h1 className="ml-4 text-xl font-bold text-blue-700">
          Milk Purchase Details
        </h1>
      </header>

      <div className="max-w-5xl mx-auto p-4 space-y-6">

        <SummaryCard
          title="Total Purchased Milk"
          value={totalPurchasedMilk}
          unit="Liters"
          icon={<Droplets size={28} />}
        />

        <h2 className="text-xl font-bold">
          Farmer Contributions
        </h2>

        {loading ? (
          <div className="bg-white rounded-xl p-8 text-center">
            Loading...
          </div>
        ) : (
          <div className="space-y-4">
            {farmers.map((farmer) => (
              <ContributionCard
                key={farmer.farmerId}
                name={farmer.farmerName}
                mobileNo={farmer.mobileNo}
                quantity={farmer.totalQuantity}
                amount={farmer.totalAmount}
                status="Completed"
                // onClick={() =>
                //   navigate(`/farmer-purchase-history/${farmer.farmerId}`, {
                //     state: {
                //       startDate,
                //       endDate,
                //       farmer,
                //     },
                //   })
                // }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MilkPurchaseDetails;