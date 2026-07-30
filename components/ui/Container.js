export default function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-[92%] max-w-[1240px] ${className}`}>{children}</div>
  );
}
