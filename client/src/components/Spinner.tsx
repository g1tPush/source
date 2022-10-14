interface SpinnerProps {
  size?: string;
}

const Spinner = ({ size }: SpinnerProps) => {
  let spanClass = "spinner-border";
  if (size !== "big") {
    spanClass += " spinner-border-sm";
  }
  return <span className={spanClass} role="status"></span>;
};
export default Spinner;
