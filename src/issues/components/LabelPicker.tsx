import { LoadingSpinner } from "../../shared/LoadingSpinner";
import { useLabels } from "../hooks/useLabels";

interface Props {
  selectedLabels: string[],
  onLabelSelected: (label: string) => void
}

export const LabelPicker = ({ onLabelSelected, selectedLabels }: Props) => {

  const { data, isLoading } = useLabels()

  if (isLoading) {
    return (<div className="flex justify-center items-center"><LoadingSpinner /></div>)
  }

  return (
    <div className="flex flex-wrap gap-x-1 gap-y-2 items-center justify-center">
      {data?.map(label => (
        <span
          onClick={() => onLabelSelected(label.name)}
          key={label.id}
          className={`animate-fadeIn px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer
            ${selectedLabels.includes(label.name) ? "selected-label" : ""}
            `}
          style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
