import React from "react";
import { connect } from "react-redux";
import { searchUser } from "egov-ui-kit/redux/auth/actions";
import { fetchComplaintCategories } from "egov-ui-kit/redux/complaints/actions";
import { fetchpgrConstants } from "egov-ui-kit/redux/common/actions";

const withData = (Component) => {
  class Wrapper extends React.Component {
    componentDidMount() {
      const { searchUser, fetchComplaintCategories, authenticated, fetchpgrConstants } = this.props;
      if (localStorage.getItem("token")) {
        fetchComplaintCategories();
        searchUser();
        fetchpgrConstants();
      }
    }

    render() {
      const { searchUser, fetchCurrentLocation, fetchComplaintCategories, ...rest } = this.props;
      return <Component {...rest} />;
    }
  }

  const mapStateToProps = ({ auth }) => {
    const { authenticated } = auth;
    return { authenticated };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      fetchComplaintCategories: () => dispatch(fetchComplaintCategories()),
      searchUser: () => dispatch(searchUser()),
      fetchpgrConstants: () => dispatch(fetchpgrConstants())
    };
  };

  return connect(
    null,
    mapDispatchToProps
  )(Wrapper);
};

export default withData;
