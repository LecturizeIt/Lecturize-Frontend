import React from "react";

interface IConfirmationDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<IConfirmationDialogProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg text-center">
        <p className="mb-4">{message}</p>
        <div className="flex justify-center gap-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onConfirm}>
            Sim
          </button>
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onCancel}>
            Não
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
