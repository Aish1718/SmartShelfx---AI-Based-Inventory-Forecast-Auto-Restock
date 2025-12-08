// import React from "react";

// const ConfirmDialog = ({ open, title, message, onConfirm, onCancel }) => {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-xl w-96 animate-fadeIn">
//         <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
//         <p className="text-gray-600 mt-2">{message}</p>

//         <div className="mt-5 flex justify-end gap-3">
//           <button
//             onClick={onCancel}
//             className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={onConfirm}
//             className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
//           >
//             Confirm
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmDialog;


import React from "react";

const ConfirmDialog = ({ open, title, message, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="w-96 p-6 rounded-xl shadow-xl border border-white/10 bg-[#0D1322] animate-fadeIn">

        {/* Title */}
        <h2 className="text-lg font-semibold" style={{ color: "#D2C1B6" }}>
          {title}
        </h2>

        {/* Message */}
        <p className="mt-2 text-gray-300">{message}</p>

        {/* Buttons */}
        <div className="mt-5 flex justify-end gap-3">

          {/* Cancel */}
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-[#1A2234] text-gray-300 border border-white/10
                       hover:bg-[#242E42] transition"
          >
            Cancel
          </button>

          {/* Confirm */}
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
