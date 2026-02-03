import { LoadingSpinner } from "../../shared/LoadingSpinner";
import { useLabels } from "../hooks/useLabels";

export const LabelPicker = () => {

  const { data, isLoading } = useLabels()

  if (isLoading) {
    return (<div className="flex justify-center items-center"><LoadingSpinner /></div>)
  }

  return (
    <div className="flex flex-wrap gap-x-1 gap-y-2 items-center justify-center">
      {data?.map(label => (
        <span
          key={label.id}
          className="animate-fadeIn px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer"
          style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
