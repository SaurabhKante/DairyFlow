import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, ShoppingCart } from "lucide-react";

import { BASE_URL } from "../constants/baseUrl";
import SummaryCard from "../components/Analytics/SummaryCard";
import ContributionCard from "../components/Analytics/ContributionCard";

const MilkSellsDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    startDate,
    endDate,
    totalSoldMilk,
  } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);

  const fetchSoldMilk = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${BASE_URL}/analytics/v1/get-sold-milk-details`,
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
        setCustomers(res.data.DATA);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSoldMilk();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <header className="sticky top-0 z-50 h-16 bg-white border-b text-blue-700 flex items-center px-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>

        <h1 className="ml-4 text-xl font-bold text-blue-700">
          Milk Sells Details
        </h1>
      </header>

      <div className="max-w-5xl mx-auto p-4 space-y-6">

        <SummaryCard
          title="Total Sold Milk"
          value={totalSoldMilk}
          unit="Liters"
          icon={<ShoppingCart size={28} />}
        />

        <h2 className="text-xl font-bold">
          Customer Contributions
        </h2>

        {loading ? (
          <div className="bg-white rounded-xl p-8 text-center">
            Loading...
          </div>
        ) : (
          <div className="space-y-4">
            {customers.map((customer) => (
              <ContributionCard
                key={customer.customerId}
                name={customer.customerName}
                mobileNo={customer.mobileNo}
                quantity={customer.totalQuantity}
                amount={customer.totalAmount}
                status="Completed"
                // onClick={() =>
                //   navigate(
                //     `/customer-sells-history/${customer.customerId}`,
                //     {
                //       state: {
                //         startDate,
                //         endDate,
                //         customer,
                //       },
                //     }
                //   )
                // }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MilkSellsDetails;