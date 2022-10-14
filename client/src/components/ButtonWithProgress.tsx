import Spinner from "./Spinner";

interface ButtonWithProgressProps {
  disabled?: boolean;
  apiProgress?: boolean;
  onClick?: (e: React.FormEvent<EventTarget>) => void;
  children?: React.ReactNode;
}

const ButtonWithProgress = ({
  disabled,
  apiProgress,
  onClick,
  children,
}: ButtonWithProgressProps) => {
  return (
    <button
      className="btn btn-primary"
      disabled={disabled || apiProgress}
      onClick={onClick}
    >
      {apiProgress && <Spinner />}
      {children}
    </button>
  );
};

export default ButtonWithProgress;
