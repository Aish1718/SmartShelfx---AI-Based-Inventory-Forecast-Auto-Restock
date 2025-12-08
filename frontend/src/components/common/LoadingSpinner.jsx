// import React from "react";

// const LoadingSpinner = ({ size = 40 }) => {
//   return (
//     <div className="flex justify-center items-center w-full py-5">
//       <div
//         className="animate-spin rounded-full border-t-4 border-blue-600 border-solid"
//         style={{
//           width: size,
//           height: size,
//           borderRightColor: "transparent",
//           borderLeftColor: "transparent",
//         }}
//       ></div>
//     </div>
//   );
// };

// export default LoadingSpinner;

import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="p-6 rounded-xl shadow-lg border border-red-500/40"
          style={{
            backgroundColor: "#0D1322",
          }}
        >
          <h2
            className="text-lg font-bold mb-2"
            style={{ color: "#D2C1B6" }}
          >
            Something went wrong
          </h2>

          <p className="text-gray-300">
            {this.state.message || "Unexpected error occurred."}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
