interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div
        className={`w-5 h-5 rounded flex items-center justify-center transition-colors duration-150 ${
          checked
            ? "bg-[#00D4FF] border border-[#00D4FF]"
            : "bg-[#0d0d0d] border border-[#1a1a1a] group-hover:border-[rgba(0,212,255,0.5)]"
        }`}
        onClick={onChange}
      >
        {checked && <CheckIcon />}
      </div>
      <span className="text-sm text-[#444444] group-hover:text-white transition-colors duration-150">
        {label}
      </span>
    </label>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
