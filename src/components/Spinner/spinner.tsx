export default function Spinner() {
  return (
    // <div className="bg-black bg-opacity-25 fixed inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-25 ">
      <div
        className="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-secondary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}
