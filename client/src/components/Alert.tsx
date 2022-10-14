interface AlertProps {
  type?: string;
  center?: boolean;
  children: React.ReactNode;
}

const Alert = ({ type = "success", center = true, children }: AlertProps) => {
  let classForAlert = `alert alert-${type}`;
  if (center) {
    classForAlert += " text-center";
  }
  return <div className={classForAlert}>{children}</div>;
};

export default Alert;
