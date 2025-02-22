const CallCard = ({ patient, time, purpose }) => {
    return (
      <div className="w-full bg-white p-4 rounded-lg shadow-md border border-gray-300 flex flex-col">
        <h1 className="text-lg font-semibold">Patient: {patient}</h1>
        <h2 className="text-md font-medium">Time: {time}</h2>
        <p className="text-sm text-gray-600">Purpose: {purpose}</p>
      </div>
    );
  };
  
  export default CallCard;
  