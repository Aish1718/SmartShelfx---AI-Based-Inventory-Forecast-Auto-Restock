// import React from "react";

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, message: "" };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true, message: error.message };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error("ErrorBoundary caught:", error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div className="p-6 bg-red-50 border-l-4 border-red-600 rounded">
//           <h2 className="text-red-700 font-bold text-lg">Something went wrong</h2>
//           <p className="text-gray-700 mt-2">{this.state.message}</p>
//         </div>
//       );
//     }
//     return this.props.children;
//   }
// }

// export default ErrorBoundary;



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
            {this.state.message || "An unexpected error has occurred."}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
