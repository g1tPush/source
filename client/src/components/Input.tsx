interface InputProps {
  id: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  help?: string;
  type?: string;
  initialValue?: string;
}

const Input = ({
  id,
  label,
  onChange,
  help,
  type,
  initialValue,
}: InputProps) => {
  let inputClass = "form-control";
  if (help) {
    inputClass += " is-invalid";
  }

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        name={id}
        placeholder={label}
        className={inputClass}
        onChange={onChange}
        type={type || "text"}
        defaultValue={initialValue}
      />
      {help && <span className="invalid-feedback">{help}</span>}
    </div>
  );
};

export default Input;
