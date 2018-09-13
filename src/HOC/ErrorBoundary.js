import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends PureComponent {
  state = {
    hasError: false,
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    const {
      hasError,
    } = this.state;

    const {
      children,
    } = this.props;

    const display = hasError === true
      ? <h1>Sorry! Something went wrong!</h1>
      : (children);

    return display;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ErrorBoundary;
