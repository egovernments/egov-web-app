import React, { Component } from "react";
import { Card, BreadCrumbs } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import Divider from "egov-ui-kit/components/Divider";
import { connect } from "react-redux";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";
import "./index.css";
class PTExample extends Component {
  componentDidMount() {
    const { addBreadCrumbs, title } = this.props;
    title && addBreadCrumbs({ title: title, path: window.location.pathname });
  }
  render() {
    const { urls, history } = this.props;
    return (
      <div className="col-sm-12 blockBox">
        <BreadCrumbs url={urls} history={history} />
        <Card
          id="home-complaint-card"
          className="clearfix"
          textChildren={
            <div className="example-main-cont clearfix">
              <div className="col-sm-12 descriptionStyle">
                Property Tax is calculated based on rates stipulated by the Department of Local Government, Punjab. You can view the calculation rates{" "}
                <a href={require("./PT_Corporation_Notification.pdf")} target="_blank">
                  here
                </a>{" "}
                (Corporation) and{" "}
                <a href={require("./PT_Council_Notification.pdf")} target="_blank">
                  here
                </a>{" "}
                (Council).
              </div>
              <div className="col-sm-12 dividerPTExample">
                <Divider />
              </div>
              <div className="col-sm-12 descriptionPTExample">
                <Label fontSize={16} label="These examples show how the rates are applied to the property details provided through the assessment:" />
              </div>
              <div className="col-sm-12 detailPart">
                <div className="col-12 detailTitlePTExample">1. Residential, Independent House in Area 1</div>
                <div className="col-12 detailContentPTExample">
                  <div className="col-sm-12 blockBox">
                    <div className="col-sm-4 detailLeft">a. Plot Size:</div>
                    <div className="col-sm-8">200 sq yards</div>
                  </div>
                  <div className="col-sm-12 blockBox">
                    <div className="col-sm-4 detailLeft">b. Ground Floor total built-up area:</div>
                    <div className="col-sm-8">150 sq yards (1350 sq ft)</div>
                  </div>
                  <div className="col-sm-12 blockBox">
                    <div className="col-sm-4 detailLeft">c. Vacant Land (a-b):</div>
                    <div className="col-sm-8">50 sq yards (450 sq ft)</div>
                  </div>
                  <div className="col-sm-12 block">
                    <div className="col-sm-4 detailLeft">d. 1st floor total built-up area:</div>
                    <div className="col-sm-8">100 sq yards (900 sq ft)</div>
                  </div>
                  <div className="col-sm-12 block">
                    <div className="col-sm-4 detailLeft">Calculation of Property Tax:</div>
                    <div className="col-sm-8">
                      150 (b) x Rs. 2/sq yard = Rs. 300
                      <br />
                      50 (c) x Re. 1/sq yard = Rs. 50
                      <br />
                      100 (d) x Re. 1/sq yard = Rs. 100
                    </div>
                  </div>
                  <div className="col-sm-12 block">
                    <div className="col-sm-4 detailLeft">Net Property Tax:</div>
                    <div className="col-sm-8">Rs. 450</div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 dividerPTExample">
                <Divider />
              </div>
              <div className="col-sm-12 detailPart">
                <div className="col-12 detailTitlePTExample">2. Commercial, Flat/Part of Building in Area 1</div>
                <div className="col-12 detailContentPTExample">
                  <div className="col-sm-12 block">
                    <div className="col-sm-4 detailLeft">a. Total Super Built-up area:</div>
                    <div className="col-sm-8">150 sq yards</div>
                  </div>
                  <div className="col-sm-12 block">
                    <div className="col-sm-4 detailLeft">Calculation of Property Tax:</div>
                    <div className="col-sm-8">150 (a) x Rs. 36/sq yard = Rs. 675</div>
                  </div>
                  <div className="col-sm-12 block">
                    <div className="col-sm-4 detailLeft">Net Property Tax:</div>
                    <div className="col-sm-8">Rs. 5,400</div>
                  </div>
                </div>
              </div>
              <div className="col-12 detailPart">
              <iframe width="420" height="345" src="https://www.youtube.com/embed/tgbNymZ7vqY">
                </iframe>
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { common, app } = state;
  const { urls } = app;
  return { urls };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBreadCrumbs: (url) => dispatch(addBreadCrumbs(url)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PTExample);
