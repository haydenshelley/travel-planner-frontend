import React from "react";

export class MyErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    logError(error, errorInfo);
  }
  render() {
    return this.state.hasError ? <FallbackUI /> : this.props.children;
  }
}
