// src/pages/CustomerList.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import CustomerListHeader from "../components/customer/CustomerListHeader";
import CustomerCard from "../components/customer/CustomerCard";

import SearchBar from "../components/SearchBar";
import FloatingAddButton from "../components/FloatingAddButton";
import DeleteCustomerModal from "../components/customer/DeleteCustomerModal";
import { BASE_URL } from "../constants/baseUrl";
import UpdateCustomerModal from "../components/customer/UpdateCustomerModal";

const CustomerList = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setfilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCustomer, setselectedCustomer] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(`${BASE_URL}/customer/v1/get-all-customers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCustomers(res.data.DATA);
      setfilteredCustomers(res.data.DATA);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.MESSAGE || "Failed to fetch customers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    const value = search.toLowerCase();

    const data = customers.filter(
      (customer) =>
        customer.customerName.toLowerCase().includes(value) ||
        customer.mobileNo.includes(value),
    );

    setfilteredCustomers(data);
  }, [search, customers]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-medium text-gray-600">Loading Customers...</p>
      </div>
    );
  }

  const isAdmin = localStorage.getItem("role") === "ADMIN";

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col">
      <CustomerListHeader />

      <main className="flex-1 px-4 py-4 pb-28">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

        <div className="space-y-4 mt-5">
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <CustomerCard
                customer={customer}
                isAdmin={isAdmin}
                onUpdate={() => {
                  setselectedCustomer(customer);
                  setShowUpdateModal(true);
                }}
                onDelete={() => {
                  setselectedCustomer(customer);
                  setShowDeleteModal(true);
                }}
                onPayment={() =>
                  navigate(`/pay-customer/${customer.customerId}`, {
                    state: customer,
                  })
                }
              />
            ))
          ) : (
            <div className="text-center mt-20">
              <h2 className="text-2xl font-semibold text-gray-700">
                No Customers Found
              </h2>

              <p className="text-gray-500 mt-2">
                Try searching with another name or add a new customer.
              </p>
            </div>
          )}
        </div>
      </main>

      {isAdmin && <FloatingAddButton to="/add-customer" />}

      <UpdateCustomerModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        selectedCustomer={selectedCustomer}
        onSuccess={fetchCustomers}
      />

      <DeleteCustomerModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        selectedCustomer={selectedCustomer}
        onSuccess={fetchCustomers}
      />
    </div>
  );
};

export default CustomerList;
