import React from "react";
import { connect } from "react-redux";
import { searchUser } from "egov-ui-kit/redux/auth/actions";
import { fetchComplaintCategories } from "egov-ui-kit/redux/complaints/actions";

const withData = (Component) => {
  class Wrapper extends React.Component {
    componentDidMount() {
      const { searchUser, fetchComplaintCategories,authenticated } = this.props;
      fetchComplaintCategories();
      if (authenticated) {
          searchUser();
      }
    }

    render() {
      const { searchUser, fetchCurrentLocation, fetchComplaintCategories, ...rest } = this.props;
      return <Component {...rest} />;
    }
  }

  const mapStateToProps = ({auth}) => {
    const { authenticated } = auth;
    return { authenticated };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      fetchComplaintCategories: () => dispatch(fetchComplaintCategories()),
      searchUser: () => dispatch(searchUser()),
    };
  };

  return connect(
    null,
    mapDispatchToProps
  )(Wrapper);
};

export default withData;
