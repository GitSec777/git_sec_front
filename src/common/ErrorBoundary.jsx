import React from "react";
import PropTypes from "prop-types";
import "../styles/components/ErrorBoundary.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    if (process.env.NODE_ENV === "development") {
      console.error("Error:", error);
      console.error("Error Info:", errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h1>Something went wrong</h1>
          {process.env.NODE_ENV === "development" && (
            <div className="error-details">
              <pre>{this.state.error && this.state.error.toString()}</pre>
              <pre>
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </div>
          )}
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
