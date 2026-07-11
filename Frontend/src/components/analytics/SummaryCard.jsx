import { Droplets } from "lucide-react";

const SummaryCard = ({
  title,
  value,
  unit = "Liters",
  icon = <Droplets size={28} />,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 flex justify-between items-center shadow-sm">
      <div>
        <p className="uppercase text-xs text-gray-500 tracking-wider">
          {title}
        </p>

        <div className="flex items-end gap-2 mt-2">
          <h2 className="text-4xl font-bold text-blue-700">
            {value}
          </h2>

          <span className="text-gray-500 mb-1">
            {unit}
          </span>
        </div>
      </div>

      <div className="h-16 w-16 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
        {icon}
      </div>
    </div>
  );
};

export default SummaryCard;