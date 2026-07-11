import { CalendarDays } from "lucide-react";

const DateFilter = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="text-blue-600" size={20} />
        <h2 className="text-lg font-semibold text-gray-800">
          Select Date Range
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Start Date
          </label>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                       transition-all"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            End Date
          </label>

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate}
            className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                       transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default DateFilter;