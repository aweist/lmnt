export default function Success() {
  return (
    <div role="alert" className="m-10">
      <div className=" bg-blue-500 text-white font-bold rounded-t px-4 py-2">
        Success
      </div>
      <div className="border border-t-0 border-blue-400 rounded-b bg-blue-100 px-4 py-3 text-blue-700">
        <p>Your request has been received.</p>
      </div>
    </div>
  );
}
