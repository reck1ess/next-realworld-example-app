import React from "react";

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <style>
      {`
        @keyframes spin {
          0% { transform : rotate(0deg); }
          100% { transform : rotate(360deg); }
        }

        .loading-spinner {
          position: relative;
          width: 40px;
          height: 40px;
          margin: 90px auto;
          border-radius: 50%;
          border-top: 3px solid rgba(0, 0, 0, 0.1);
          border-right: 3px solid rgba(0, 0, 0, 0.1);
          border-bottom: 3px solid rgba(0, 0, 0, 0.1);
          border-left: 3px solid #818a91;
          transform: translateZ(0);
          animation: spin 0.5s infinite linear;
        }
        `}
    </style>
  </div>
);

export default LoadingSpinner;
