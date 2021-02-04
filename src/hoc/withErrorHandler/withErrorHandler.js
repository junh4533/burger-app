import React from "react";
import { Fragment, Component } from "react";
import Modal from "../../components/UI/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentWillMount() {
      axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Fragment>
          <Modal
            show={this.state.error}
            body={this.state.error && this.state.error.message}
            hide={this.errorConfirmedHandler}
          />
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };
};

export default withErrorHandler;
