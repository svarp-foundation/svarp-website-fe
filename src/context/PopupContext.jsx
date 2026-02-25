import React, { createContext, useState, useContext, useCallback } from "react";

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
  const [popup, setPopup] = useState(null);

  const showPopup = useCallback((message, type = "info") => {
    setPopup({ message, type });
  }, []);

  const closePopup = useCallback(() => {
    setPopup(null);
  }, []);

  return (
    <PopupContext.Provider value={{ showPopup }}>
      {children}
      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-sm w-full transform transition-all animate-fade-in-up">
            <div
              className={`p-4 ${
                popup.type === "error"
                  ? "bg-red-50 text-red-700 border-b border-red-100"
                  : popup.type === "success"
                    ? "bg-green-50 text-green-700 border-b border-green-100"
                    : popup.type === "warning"
                      ? "bg-yellow-50 text-yellow-700 border-b border-yellow-100"
                      : "bg-blue-50 text-blue-700 border-b border-blue-100"
              }`}
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                {popup.type === "error" && (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
                {popup.type === "success" && (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
                {popup.type === "warning" && (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                )}
                {popup.type === "info" && (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
                <span className="capitalize">{popup.type}</span>
              </h3>
            </div>
            <div className="p-6 text-gray-700 text-center text-sm md:text-base">
              {popup.message}
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-100">
              <button
                type="button"
                className={`w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${
                  popup.type === "error"
                    ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                    : popup.type === "success"
                      ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                      : popup.type === "warning"
                        ? "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500"
                        : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                }`}
                onClick={closePopup}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
    </PopupContext.Provider>
  );
};
