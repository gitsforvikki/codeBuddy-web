export const Spinner = ({ size = 40 }) => {
  return (
    <div className="flex items-center min-h-screen justify-center">
      <div
        className="border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default Spinner;
