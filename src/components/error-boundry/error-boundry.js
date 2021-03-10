import React, { Component } from "react";
import ErrorIndicator from '../error-indicator'
import './error-boundry.css'

export default class ErrorBoundry extends Component {
  state = { applicationError: false };

  componentDidCatch() {
    console.log("boundry catched error");
    this.setState({ applicationError: true });
  }
  render() {
    if (this.state.applicationError) {
      return <ErrorIndicator />;
    }
    return this.props.children;
  }
}