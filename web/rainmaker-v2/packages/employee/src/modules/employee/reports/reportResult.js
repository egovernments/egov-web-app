import React, { Component } from "react";
import { connect } from "react-redux";
import MenuItem from "material-ui/MenuItem";
import { Grid, Row, Col, Table, DropdownButton } from "react-bootstrap";
import { Card, CardHeader, CardText } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import { commonApiPost } from "egov-ui-kit/utils/api";
import { translate, epochToDate } from "./commons/common";
import _ from "lodash";
import { customizePdfPrint } from "./customizePDF.js";
import "egov-ui-kit/assets/styles/jquery.dataTables.min.css";
import "datatables-buttons";
import "datatables";
import "datatables.net";
import "datatables.net-buttons";
import "datatables.net-dt";
import "react-jquery-datatables";
import "datatables.net-buttons-bs";
import { Icon } from "components";
import $ from "jquery";
import JSZip from "jszip/dist/jszip";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import "datatables.net-buttons/js/buttons.html5.js"; // HTML 5 file export
import "datatables.net-buttons/js/buttons.flash.js"; // Flash file export
import headerLogo from "egov-ui-kit/assets/images/punjab-logo.png";
import { getResultUrl } from "./commons/url";
import Label from "egov-ui-kit/utils/translationNode";
import commonConfig from "config/common.js";
import "./index.css";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
window.JSZip = JSZip;

var sumColumn = [];
var footerexist = false;
let rTable;
class ShowField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ck: {},
      rows: {},
      showPrintBtn: false,
      // logopath:""
      // logoBase64: "",
      // ulbname: "",
    };
  }

  componentWillUnmount() {
    $("#reportTable")
      .DataTable()
      .destroy(true);
  }

  componentWillUpdate() {
    // console.log('will update');
    let { flag } = this.props;
    if (flag == 1) {
      flag = 0;
      $("#reportTable")
        .dataTable()
        .fnDestroy();
    }
  }

  componentDidMount() {
    let _this = this;
    _this.setState({
      reportName: _this.props.match.params.reportName,
      moduleName: _this.props.match.params.moduleName,
    });
    _this.subHeader(_this.props.match.params.moduleName);
    // var tenantId = localStorage.getItem("tenant-id") ? localStorage.getItem("tenant-id") : "";
    // commonApiPost("/tenant/v1/tenant/_search?tenantId=" + tenantId + "&code=" + tenantId + "&pageSize=200").then(
    //   function(response) {
    //     let imgpath = response.tenant[0].logoId.substr(1);
    //     if (response.tenant && response.tenant[0].logoId) {
    //       _this.convertImgToBase64URL("https://raw.githubusercontent.com/egovernments/egov-web-app/master/web/ui-app/public/" + imgpath, (data) => {
    //         _this.setState({
    //           logoBase64: data,
    //         });
    //       });

    //       _this.setState({
    //         ulbname: response.tenant[0].name,
    //       });
    //     }
    //     // setForm();
    //   },
    //   function(err) {
    //     alert("Try again later");
    //   }
    // );
  }

  componentWillReceiveProps(nextprops) {
    this.setState({
      reportName: nextprops.match.params.reportName,
      moduleName: nextprops.match.params.moduleName,
      ck: {},
    });
    this.subHeader(nextprops.match.params.moduleName);
    // }
  }

  // PrintingCutomize(doc) {
  //   let _this = this;
  //   if (_this.state.moduleName == "lcms" && doc && doc.content) {
  //     doc.content.map((item) => {
  //       if (item.style == "title") {
  //         return (doc.content[0].text = _this.state.ulbname);
  //       }
  //     });
  //     doc.content.splice(1, 0, {
  //       table: {
  //         widths: ["auto", "*", "auto"],
  //         body: [
  //           [
  //             {
  //               image: _this.state.logoBase64,
  //               height: 100,
  //               width: 100,
  //             },
  //             {
  //               alignment: "center",
  //               stack: [
  //                 {
  //                   margin: [0, 10, 0, 0],
  //                   fontSize: 16,
  //                   bold: true,
  //                   text: _this.state.reportSubTitle,
  //                 },
  //               ],
  //             },
  //             {
  //               alignment: "right",
  //               image: headerLogo,
  //               height: 100,
  //               width: 100,
  //             },
  //           ],
  //         ],
  //       },
  //       layout: {
  //         hLineWidth: function(line) {
  //           return 0;
  //         },
  //         vLineWidth: function() {
  //           return 0;
  //         },
  //         paddingBottom: function() {
  //           return 5;
  //         },
  //       },
  //     });
  //   }
  // }

  convertImgToBase64URL = (url, callback) => {
    var img = new Image();
    var dar;
    img.crossOrigin = "Anonymous";
    img.onload = function() {
      var canvas = document.createElement("CANVAS"),
        ctx = canvas.getContext("2d"),
        dataURL;
      canvas.height = this.height;
      canvas.width = this.width;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL();
      callback(dataURL);
      //console.log(dataURL);
      canvas = null;
      dar = dataURL;
    };
    img.src = url;
  };

  getExportOptions = () => {
    let _this = this;
    let flag = false;

    for (let key in _this.state.ck) {
      if (_this.state.ck[key]) {
        flag = true;
        break;
      }
    }

    const { reportResult, searchForm, tabLabel } = _this.props;
    const { reportName } = _this.state;
    const reportHeader = reportResult.hasOwnProperty("reportHeader") ? reportResult.reportHeader : [];
    const columns = ":visible";
    const exportOptions = flag ? { rows: ".selected", columns } : { columns };
    let reportTitle =  this.getReportTitle();

    const buttons = [
      {
        text: "<span>Download as : </span>",
        className: "report-download-button-text",
      },
      {
        extend: "pdf",
        exportOptions,
        filename: _this.state.reportName,
        //title: reportTitle,
        messageTop: tabLabel,
        text: "PDF",
        orientation: "portrait",
        pageSize: "A4",
        footer: true,
        customize: function(doc) {
         // _this.PrintingCutomize(doc);
         console.log(doc.content)
         doc.content[0].text = [];
         doc.content[0].text.push({text:"mSeva System Reports\n\n",bold:true,fontSize:20});
         doc.content[0].text.push({text:reportTitle,fontSize:18})
        },
        className: "report-pdf-button",
      },
      {
        extend: "excel",
        text: "XLS",
        filename: _this.state.reportName,
        title: reportTitle,
        messageTop: tabLabel,
        footer: true,
        className: "report-excel-button",
        exportOptions,
      },
    ];

    // if (reportName == "DumpingGroundDetailReport") {
    //   const customizedPrint = {
    //     extend: "pdfHtml5",
    //     exportOptions,
    //     filename: _this.state.reportName,
    //     title: _this.state.reportSubTitle,
    //     text: "Print Report",
    //     orientation: "landscape",
    //     pageSize: "A4",
    //     footer: true,
    //     customize: function(doc) {
    //       customizePdfPrint(doc, ulbname, logoBase64, headerLogo, searchForm.wasteprocess, reportResult);
    //     },
    //   };
    //   buttons.push(customizedPrint);
    // }
    return buttons;
  };

  componentDidUpdate() {
    let { reportResult, tabLabel } = this.props;
    let self = this;
    let displayStart = 0;
    if (rTable && rTable.page && rTable.page.info()) {
      displayStart = rTable.page.info().start;
    }
    let showTabLabel = () => {
      $(".report-result-table-header").html(`${tabLabel}`);
    };
    rTable = $("#reportTable").DataTable({
      dom: '<".col-sm-8 report-result-table-header"l><"col-sm-4"B><"col-sm-4"f>rtip',
      order: [],
      select: true,
      displayStart: displayStart,
      buttons: self.getExportOptions(),
      searching: false,
      paging: false,
      bInfo: false,
      // order: [[3, "desc"]],
      ordering: true,
      bDestroy: true,
      footerCallback: function(row, data, start, end, display) {
        var api = this.api(),
          data,
          total,
          pageTotal;

        {
          sumColumn.map((columnObj, index) => {
            if (columnObj.total) {
              // Remove the formatting to get integer data for summation

              var intVal = function(i) {
                if (typeof i === "string") {
                  let pat2 = i.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g);
                  if (pat2) {
                    let a = i.split(pat2[0])[0];
                    let inta = a && Number(a);
                    return inta;
                  } else {
                    return Number(i);
                  }
                } else if (typeof i === "number") {
                  return i;
                }
                //return typeof i === "string" ? i.replace(/[\$,]/g, "") * 1 : typeof i === "number" ? i : 0;
              };

              // Total over all pages
              total = api
                .column(index)
                .data()
                .reduce(function(a, b) {
                  if (typeof b === "string" && b.match(/[A-za-z]/g)) {
                    return;
                  } else {
                    return intVal(a) + intVal(b);
                  }
                }, 0);

              // Total over this page
              pageTotal = api
                .column(index, { page: "current" })
                .data()
                .reduce(function(a, b, ind) {
                  if (typeof b === "string" && b.match(/[A-za-z]/g)) {
                    return;
                  } else if (typeof b === "string" && b.split("/") && b.split("/").length === 2) {
                    let fraction = b.split("/");
                    if (ind == end - 1) {
                      let sum = intVal(a) + intVal(Number(fraction[0]));
                      let avg = (sum / end).toPrecision(3);
                      return Math.abs(avg) + "/" + fraction[1];
                    } else {
                      return intVal(a) + intVal(Number(fraction[0]));
                    }
                  } else {
                    return intVal(a) + intVal(b);
                  }
                }, 0);
              let hideFooter = false;
              if (isNaN(pageTotal) && typeof pageTotal === "number") {
                hideFooter = true;
              }

              // Update footer
              //$(api.column(index).footer()).html(pageTotal.toLocaleString("en-IN") + " (" + total.toLocaleString("en-IN") + ")");
              typeof pageTotal !== "undefined" && !hideFooter && $(api.column(index).footer()).html(pageTotal.toLocaleString("en-IN"));
              //}
            }
            // }
          });
        }
      },
    });
    showTabLabel();
  }

  drillDown = (e, i, i2, item, item1) => {
    let {
      reportResult,
      searchForm,
      setReportResult,
      setFlag,
      toggleSnackbarAndSetText,
      searchParams,
      setRoute,
      match,
      metaData,
      pushReportHistory,
    } = this.props;
    let object = reportResult.reportHeader[i2];
    let copySearchParams = _.clone(searchParams);

    if (object.defaultValue && object.defaultValue.search("_parent") > -1) {
      let splitArray = object.defaultValue.split("&");

      for (var i = 1; i < splitArray.length; i++) {
        let key, value;
        if (splitArray[i].search("{") > -1) {
          key = splitArray[i].split("=")[0];
          let inputparam = splitArray[i].split("{")[1].split("}")[0];
          for (var j = 0; j < reportResult.reportHeader.length; j++) {
            if (reportResult.reportHeader[j].name == inputparam) {
              value = item[j];
            }
          }
        } else {
          key = splitArray[i].split("=")[0];
          if (key == "status") {
            value = splitArray[i].split("=")[1].toUpperCase();
          } else {
            value = splitArray[i].split("=")[1];
          }
        }
        searchParams.push({ name: key, input: value });
      }

      var tenantId = localStorage.getItem("tenant-id") ? localStorage.getItem("tenant-id") : commonConfig.tenantId;

      let response = commonApiPost(
        // "/report/" + match.params.moduleName + "/_get",
        "/report/" + "pgr" + "/_get",
        {},
        {
          tenantId: tenantId,
          reportName: splitArray[0].split("=")[1],
          searchParams,
        }
      ).then(
        function(response) {
          if (response.viewPath && response.reportData && response.reportData[0]) {
            localStorage.reportData = JSON.stringify(response.reportData);
            localStorage.setItem("returnUrl", window.location.hash.split("#/")[1]);
            localStorage.setItem("moduleName", match.params.moduleName);
            localStorage.setItem(
              "searchCriteria",
              JSON.stringify({
                tenantId: tenantId,
                reportName: match.params.reportName,
                searchParams: copySearchParams,
              })
            );
            localStorage.setItem("searchForm", JSON.stringify(searchForm));
            setRoute("/print/report/" + response.viewPath);
          } else {
            pushReportHistory({
              tenantId: tenantId,
              reportName: splitArray[0].split("=")[1],
              searchParams,
            });
            setReportResult(response);
            setFlag(1);
          }
        },
        function(err) {
          console.log(err);
        }
      );
    } else if (object.defaultValue && object.defaultValue.search("_url") > -1) {
      // console.log(item1);
      let afterURL = object.defaultValue.split("?")[1];
      let URLparams = afterURL.split(":");
      // console.log(URLparams, URLparams.length);
      if (URLparams.length > 1) {
        setRoute(`${URLparams[0] + encodeURIComponent(item1)}`);
      } else {
        setRoute(URLparams[0]);
      }
    }
  };

  checkIfDate = (val, i) => {
    let { reportResult } = this.props;
    if (
      reportResult &&
      reportResult.reportHeader &&
      reportResult.reportHeader.length &&
      reportResult.reportHeader[i] &&
      reportResult.reportHeader[i].type == "epoch"
    ) {
      var _date = new Date(Number(val));
      return ("0" + _date.getDate()).slice(-2) + "/" + ("0" + (_date.getMonth() + 1)).slice(-2) + "/" + _date.getFullYear();
    } else {
      return val;
    }
  };

  checkAllRows = (e) => {
    let { reportResult } = this.props;
    let ck = { ...this.state.ck };
    let rows = { ...this.state.rows };
    let showPrintBtn = true;

    if (reportResult && reportResult.reportData && reportResult.reportData.length) {
      if (e.target.checked)
        for (let i = 0; i < reportResult.reportData.length; i++) {
          ck[i] = true;
          rows[i] = reportResult.reportData[i];
        }
      else {
        ck = {};
        rows = {};
        showPrintBtn = false;
      }

      this.setState({
        ck,
        rows,
        showPrintBtn,
      });
    }
  };

  renderHeader = () => {
    let { reportResult, metaData } = this.props;
    let { checkAllRows } = this;
    return (
      <thead style={{ backgroundColor: "#f8f8f8", color: "#767676", fontSize: "12px", fontWeight: 500 }}>
        <tr className="report-table-header">
          <th key={"S. No."}>{"S. No."}</th>
          {metaData &&
            metaData.reportDetails &&
            metaData.reportDetails.selectiveDownload && (
              <th key={"testKey"}>
                <input type="checkbox" onChange={checkAllRows} />
              </th>
            )}
          {reportResult.hasOwnProperty("reportHeader") &&
            reportResult.reportHeader.map((item, i) => {
              if (item.showColumn) {
                return (
                  <th key={i}>
                    <Label
                      className="report-header-row-label"
                      labelStyle={{ width: "60%", wordWrap: "unset", wordBreak: "unset" }}
                      label={item.label}
                    />
                  </th>
                );
              } else {
                return (
                  <th style={{ display: "none" }} key={i}>
                    <Label
                      className="report-header-row-label"
                      labelStyle={{ width: "60%", wordWrap: "unset", wordBreak: "unset" }}
                      label={item.label}
                    />
                  </th>
                );
              }
            })}
        </tr>
      </thead>
    );
  };

  printSelectedDetails() {
    let rows = { ...this.state.rows };
    let { reportResult, searchForm, setReportResult, setFlag, toggleSnackbarAndSetText, searchParams, setRoute, match, metaData } = this.props;
    let header = this.props.reportResult.reportHeader;
    let defaultValue = "";
    for (let key in header) {
      if (header[key].defaultValue && header[key].defaultValue.search("_parent") > -1) {
        defaultValue = header[key].defaultValue;
      }
    }

    if (defaultValue) {
      let splitArray = defaultValue.split("&");
      let values = [],
        key;
      for (var k in rows) {
        for (var i = 1; i < splitArray.length; i++) {
          let value;
          if (splitArray[i].search("{") > -1) {
            key = splitArray[i].split("=")[0];
            let inputparam = splitArray[i].split("{")[1].split("}")[0];
            for (var j = 0; j < reportResult.reportHeader.length; j++) {
              if (reportResult.reportHeader[j].name == inputparam) {
                value = rows[k][j];
              }
            }
          } else {
            key = splitArray[i].split("=")[0];
            if (key == "status") {
              value = splitArray[i].split("=")[1].toUpperCase();
            } else {
              value = splitArray[i].split("=")[1];
            }
          }
          values.push(value);
        }
      }

      searchParams.push({ name: key, input: values });
      let resulturl = getResultUrl(match.params.moduleName);

      var tenantId = localStorage.getItem("tenant-id") ? localStorage.getItem("tenant-id") : commonConfig.tenantId;
      let response =
        resulturl &&
        commonApiPost(
          // "/report/" + match.params.moduleName + "/_get",
          resulturl,
          {},
          {
            tenantId: tenantId,
            reportName: splitArray[0].split("=")[1],
            searchParams,
          }
        ).then(
          function(response) {
            if (response.viewPath && response.reportData) {
              localStorage.reportData = JSON.stringify(response.reportData);
              localStorage.setItem("returnUrl", window.location.hash.split("#/")[1]);
              setRoute("/print/report/" + response.viewPath);
            }
          },
          function(err) {
            console.log(err);
          }
        );
    }
  }

  renderBody = () => {
    sumColumn = [];
    let { reportResult, metaData } = this.props;
    let { drillDown, checkIfDate } = this;
    return (
      <tbody>
        {reportResult.hasOwnProperty("reportData") &&
          reportResult.reportData.map((dataItem, dataIndex) => {
            //array of array
            let reportHeaderObj = reportResult.reportHeader;
            return (
              <tr key={dataIndex} className={this.state.ck[dataIndex] ? "selected" : ""}>
                <td>{dataIndex + 1}</td>
                {metaData &&
                  metaData.reportDetails &&
                  metaData.reportDetails.selectiveDownload && (
                    <td>
                      <input
                        type="checkbox"
                        checked={this.state.ck[dataIndex] ? true : false}
                        onClick={(e) => {
                          let ck = { ...this.state.ck };
                          ck[dataIndex] = e.target.checked;
                          let rows = this.state.rows;
                          if (e.target.checked) {
                            rows[dataIndex] = dataItem;
                          } else {
                            delete rows[dataIndex];
                          }

                          let showPrintBtn;
                          if (Object.keys(rows).length) showPrintBtn = true;
                          else showPrintBtn = false;
                          this.setState({
                            ck,
                            rows,
                            showPrintBtn,
                          });
                        }}
                      />
                    </td>
                  )}
                {dataItem.map((item, itemIndex) => {
                  var columnObj = {};
                  //array for particular row
                  var respHeader = reportHeaderObj[itemIndex];
                  if (respHeader.showColumn) {
                    columnObj = {};
                    return (
                      <td
                        key={itemIndex}
                        onClick={(e) => {
                          drillDown(e, dataIndex, itemIndex, dataItem, item);
                        }}
                      >
                        {respHeader.defaultValue ? <a href="javascript:void(0)">{checkIfDate(item, itemIndex)}</a> : checkIfDate(item, itemIndex)}
                      </td>
                    );
                  } else {
                    return (
                      <td
                        key={itemIndex}
                        style={{ display: "none" }}
                        onClick={(e) => {
                          drillDown(e, dataIndex, itemIndex, dataItem, item);
                        }}
                      >
                        {respHeader.defaultValue ? <a href="javascript:void(0)">{checkIfDate(item, itemIndex)}</a> : checkIfDate(item, itemIndex)}
                      </td>
                    );
                  }
                })}
              </tr>
            );
          })}
      </tbody>
    );
  };

  renderFooter = () => {
    let { reportResult } = this.props;
    let reportHeaderObj = reportResult.reportHeader;
    if (reportResult && reportResult.reportData && reportResult.reportData.length > 0) {
      footerexist = true;
    } else {
      footerexist = false;
    }
    {
      reportHeaderObj.map((headerObj, index) => {
        let columnObj = {};
        if (headerObj.showColumn) {
          columnObj["showColumn"] = headerObj.showColumn;
          //  columnObj["total"] = headerObj.total;
          columnObj["total"] = true;
          sumColumn.push(columnObj);
        }
        // if (headerObj.total) {
        //   footerexist = true;
        // }
      });
      //for 1st column (Sr.No)
      let firstColObj = {};
      firstColObj["total"] = false;
      sumColumn.unshift(firstColObj);
    }

    if (footerexist) {
      return (
        <tfoot>
          <tr>
            {sumColumn.map((columnObj, index) => {
              return <th key={index}>{index === 0 ? "Total" : ""}</th>;
            })}
          </tr>
        </tfoot>
      );
    }
  };

  subHeader = (moduleName) => {
    let { metaData, searchParams } = this.props;
    let paramsLength = searchParams.length;
    if (_.isEmpty(metaData)) {
      return;
    }

    let result = metaData && metaData.reportDetails && metaData.reportDetails.summary ? metaData.reportDetails.summary : "";

    this.setState({ reportSubTitle: result });
  };
  getReportTitle = (rptName) => {
    // let { reportName } = this.state;
    let reportName = rptName || this.state.reportName;
    let reportTitleArr = reportName && reportName.split(/(?=[A-Z])/);
    let reportTitle = "";
    if (reportTitleArr) {
      reportTitle = reportTitleArr.map((char) => {
        if (char.length == 1) {
          reportTitle = char + "";
        } else {
          reportTitle = " " + char;
        }
        return reportTitle;
      });
    }
    return reportTitle;
  };
  render() {
    let { drillDown, checkIfDate } = this;
    let { isTableShow, metaData, reportResult, tabLabel } = this.props;
    let self = this;
    let { reportName } = this.state;

    const viewTabel = () => {
      let { searchForm } = this.props;

      return (
        <div>
          {/* <Card> */}
          {/* <CardHeader title={self.state.reportSubTitle} /> */}
          {/* <CardText> */}

          <Table
            id="reportTable"
            style={{
              color: "#484848",
              fontWeight: "normal",
              padding: "0 !important",
              backgroundColor: "#ffffff",
              overflowY: "auto",
            }}
            responsive
          >
            {self.renderHeader()}
            {self.renderBody()}
            {self.renderFooter()}
          </Table>
          {metaData.reportDetails && metaData.reportDetails.viewPath && metaData.reportDetails.selectiveDownload && self.state.showPrintBtn ? (
            <div style={{ textAlign: "center" }}>
              <RaisedButton
                style={{ marginTop: "10px" }}
                label={translate("reports.print.details")}
                onClick={() => {
                  self.printSelectedDetails();
                }}
                primary={true}
              />
            </div>
          ) : (
            ""
          )}
          {/* </CardText> */}
          {/* </Card> */}
          <br />
          {/* {metaData.reportDetails.summary == "Cash Collection Report" && (
            <Grid>
              <Row>
                <Col xs={12} md={8} mdOffset={2}>
                  <Card>
                    <CardHeader title={<strong>{"Denomination Report"} </strong>} />
                    <CardText>
                      <Table
                        style={{
                          color: "black",
                          fontWeight: "normal",
                          padding: "0 !important",
                        }}
                        bordered
                        responsive
                      >
                        <thead>
                          <tr>
                            <th>{translate("Denomination")}</th>
                            <th>{translate("*")}</th>
                            <th>{translate("Number")}</th>
                            <th>{translate("Total")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>2000</td>
                            <td>*</td>
                            <td />
                            <td />
                          </tr>
                          <tr>
                            <td>500</td>
                            <td>*</td>
                            <td />
                            <td />
                          </tr>
                          <tr>
                            <td>200</td>
                            <td>*</td>
                            <td />
                            <td />
                          </tr>
                          <tr>
                            <td>100</td>
                            <td>*</td>
                            <td />
                            <td />
                          </tr>
                          <tr>
                            <td>50</td>
                            <td>*</td>
                            <td />
                            <td />
                          </tr>
                          <tr>
                            <td>20</td>
                            <td>*</td>
                            <td />
                            <td />
                          </tr>
                          <tr>
                            <td>10</td>
                            <td>*</td>
                            <td />
                            <td />
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>*</td>
                            <td />
                            <td />
                          </tr>
                          <tr>
                            <td>1</td>
                            <td>*</td>
                            <td />
                            <td />
                          </tr>
                          <tr>
                            <td colSpan={3} style={{ textAlign: "center" }}>
                              <strong>{translate("Total Amount Collected")}</strong>
                            </td>
                            <td style={{ textAlign: "right" }} />
                          </tr>
                        </tbody>
                      </Table>
                    </CardText>
                  </Card>
                </Col>
              </Row>
            </Grid>
          )} */}
        </div>
      );
    };
    return (
      <div>
        {isTableShow &&
          !_.isEmpty(reportResult) &&
          reportResult.hasOwnProperty("reportData") &&
          metaData &&
          metaData.reportDetails &&
          metaData.reportDetails.reportName && <div className="report-title">{this.getReportTitle(metaData.reportDetails.reportName)}</div>}
        <div className="report-result-table">
          {isTableShow && !_.isEmpty(reportResult) && reportResult.hasOwnProperty("reportData") && viewTabel()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isTableShow: state.formtemp.showTable,
    metaData: state.report.metaData,
    reportResult: state.report.reportResult,
    flag: state.report.flag,
    searchForm: state.formtemp.form,
    searchParams: state.report.searchParams,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setReportResult: (reportResult) => {
    dispatch({ type: "SET_REPORT_RESULT", reportResult });
  },
  setFlag: (flag) => {
    dispatch({ type: "SET_FLAG", flag });
  },
  toggleSnackbarAndSetText: (snackbarState, toastMsg) => {
    dispatch({ type: "TOGGLE_SNACKBAR_AND_SET_TEXT", snackbarState, toastMsg });
  },
  setRoute: (route) => dispatch({ type: "SET_ROUTE", route }),
  pushReportHistory: (history) => {
    dispatch({ type: "PUSH_REPORT_HISTORY", reportData: history });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowField);
