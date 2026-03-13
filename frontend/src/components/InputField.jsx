import { motion } from "framer-motion";

function InputField({
  label,
  icon: Icon,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-[#b3b3c6]"
        >
          {label}
        </label>
      )}

      <motion.div
        whileFocus={{ scale: 1.01 }}
        className={`group flex items-center gap-3 rounded-md border px-3 py-2.5 bg-[#151520] text-white transition-colors duration-200 ${
          error
            ? "border-red-500/70 focus-within:border-red-400"
            : "border-white/10 focus-within:border-[#7c3aed]"
        }`}
      >
        {Icon && (
          <Icon className="h-4 w-4 text-[#b3b3c6] group-focus-within:text-[#a78bfa]" />
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm placeholder:text-[#b3b3c6] focus:outline-none"
        />
      </motion.div>

      {error && (
        <span className="text-xs text-red-400 mt-0.5">{error}</span>
      )}
    </div>
  );
}

export default InputField;

