import { useState } from "react";
import { ArrowLeft, Tractor, CheckCircle } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants/baseUrl";

const RecordMilkDeliver = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const customer = state;

  const [quantity, setQuantity] = useState("");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);

  const append = (value) => {
    if (value === "." && quantity.includes(".")) return;
    setQuantity((prev) => prev + value);
  };

  const backspace = () => {
    setQuantity((prev) => prev.slice(0, -1));
  };

  const setQuick = (value) => {
    setQuantity(value.toString());
  };

  const handleSubmit = async () => {
    if (!quantity) {
      toast.error("Please enter quantity");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const payload = {
        quantity: Number(quantity),
      };

      if (remarks.trim()) {
        payload.remarks = remarks;
      }

      await axios.post(`${BASE_URL}/customer/v1/milk-sells/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Milk intake recorded successfully.");

      navigate(-1);
    } catch (error) {
      toast.error(
        error.response?.data?.MESSAGE || "Failed to record milk intake.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      {/* Header */}

      <header className="sticky top-0 bg-white border-b flex items-center gap-4 px-4 h-14">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="text-blue-700" />
        </button>

        <h1 className="text-xl font-bold text-blue-700">Record Delivery</h1>
      </header>

      <main className="max-w-xl mx-auto p-4 pb-36">
        {/* Customer Card */}

        <div className="bg-white rounded-xl border p-5 flex gap-4 items-center shadow-sm">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Tractor className="text-blue-700" />
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase">Delivering To</p>

            <h2 className="font-bold text-xl">{customer?.customerName}</h2>

            <p className="text-gray-500">{customer?.mobileNo}</p>
          </div>
        </div>

        {/* Quantity */}

        <div className="bg-white rounded-xl border mt-6 p-5 ">
          <h3 className="font-semibold mb-4">Deliver Quantity</h3>

          <div className="flex items-center justify-center gap-1 bg-blue-50 border rounded-xl text-center py-8 border-dashed border-outline-variant">
            <span className="inline-flex items-center justify-center min-w-12 px-2 h-10 bg-gray-50 text-center text-2xl md:text-4xl font-bold tracking-tight text-blue-600">
              {quantity || "0"}
            </span>

            <span className="text-2xl font-normal text-slate-500">LITERS</span>
          </div>

          {/* Quick */}

          <div className="grid grid-cols-4 gap-2 mt-5">
            {[2, 5, 10, 20].map((item) => (
              <button
                key={item}
                onClick={() => setQuick(item)}
                className="active:scale-95 transition-all focus:outline-none border border-gray-300 rounded-lg h-11 hover:bg-blue-50 font-semibold text-blue-700"
              >
                {item}L
              </button>
            ))}
          </div>

          {/* Numpad */}

          <div className="grid grid-cols-3 gap-2 mt-6">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"].map(
              (n) => (
                <button
                  key={n}
                  onClick={() => append(n)}
                  className="hover:bg-gray-200 active:scale-95 transition-all focus:outline-none h-16 border rounded-xl bg-gray-100  text-2xl font-semibold"
                >
                  {n}
                </button>
              ),
            )}

            <button onClick={backspace} className="hover:bg-gray-200 active:scale-95 text-2xl transition-all focus:outline-none h-16 border border-gray-300 rounded-xl bg-blue-50 font-semibold text-blue-700">
              ⌫
            </button>
          </div>
        </div>

        {/* Remarks */}

        <div className="mt-6">
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Remarks (Optional)"
            rows={4}
            className="w-full rounded-xl border p-4"
          />
        </div>
      </main>

      {/* Bottom */}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="w-full h-12 rounded-xl bg-blue-700 text-white flex justify-center items-center gap-2"
        >
          <CheckCircle size={20} />

          {loading ? "Saving..." : "Confirm Delivery"}
        </button>
      </div>
    </div>
  );
};

export default RecordMilkDeliver;
