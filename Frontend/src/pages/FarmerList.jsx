// src/pages/FarmerList.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import FarmerListHeader from "../components/farmer/FarmerListHeader";
import FarmerCard from "../components/farmer/FarmerCard";

import SearchBar from "../components/SearchBar";
import FloatingAddButton from "../components/FloatingAddButton";
import DeleteFarmerModal from "../components/farmer/DeleteFarmerModal";
import { BASE_URL } from "../constants/baseUrl";
import UpdateFarmerModal from "../components/farmer/UpdateFarmerModal";

const FarmerList = () => {
  const navigate = useNavigate();

  const [farmers, setFarmers] = useState([]);
  const [filteredFarmers, setFilteredFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const fetchFarmers = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(`${BASE_URL}/farmer/v1/get-all-farmers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFarmers(res.data.DATA);
      setFilteredFarmers(res.data.DATA);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.MESSAGE || "Failed to fetch farmers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  useEffect(() => {
    const value = search.toLowerCase();

    const data = farmers.filter(
      (farmer) =>
        farmer.farmerName.toLowerCase().includes(value) ||
        farmer.mobileNo.includes(value),
    );

    setFilteredFarmers(data);
  }, [search, farmers]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-medium text-gray-600">Loading Farmers...</p>
      </div>
    );
  }

  const isAdmin = localStorage.getItem("role") === "ADMIN";

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col">
      <FarmerListHeader />

      <main className="flex-1 px-4 py-4 pb-28">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

        <div className="space-y-4 mt-5">
          {filteredFarmers.length > 0 ? (
            filteredFarmers.map((farmer) => (
              <FarmerCard
                farmer={farmer}
                isAdmin={isAdmin}
                onUpdate={() => {
                  setSelectedFarmer(farmer);
                  setShowUpdateModal(true);
                }}
                onDelete={() => {
                  setSelectedFarmer(farmer);
                  setShowDeleteModal(true);
                }}
                onPayment={() =>
                  navigate(`/pay-farmer/${farmer.farmerId}`, {
                    state: farmer,
                  })
                }
              />
            ))
          ) : (
            <div className="text-center mt-20">
              <h2 className="text-2xl font-semibold text-gray-700">
                No Farmers Found
              </h2>

              <p className="text-gray-500 mt-2">
                Try searching with another name or add a new farmer.
              </p>
            </div>
          )}
        </div>
      </main>

      {isAdmin && <FloatingAddButton to="/add-farmer" />}

      <UpdateFarmerModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        selectedFarmer={selectedFarmer}
        onSuccess={fetchFarmers}
      />

      <DeleteFarmerModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        selectedFarmer={selectedFarmer}
        onSuccess={fetchFarmers}
      />
    </div>
  );
};

export default FarmerList;
