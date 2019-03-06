import React, { Component } from "react";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import { commonApiPost } from "egov-ui-kit/utils/api";
import { translate } from "./commons/common";
import $ from "jquery";
import _ from "lodash";
import "egov-ui-kit/assets/styles/jquery.dataTables.min.css";
// import "egov-ui-kit/assets/styles/responsive.dataTables.min.css";
import "datatables-buttons";
import "datatables";
import "datatables.net";
import "datatables.net-buttons";
import "datatables.net-dt";
// import "react-jquery-datatables";
import "datatables.net-buttons-bs";
import "datatables.net-responsive";
import "datatables.net-responsive-dt";
import JSZip from "jszip/dist/jszip";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import "datatables.net-buttons/js/buttons.html5.js"; // HTML 5 file export
import "datatables.net-buttons/js/buttons.flash.js"; // Flash file export
import { getResultUrl } from "./commons/url";
import Label from "egov-ui-kit/utils/translationNode";
import commonConfig from "config/common.js";
import { getTenantId, setReturnUrl, localStorageSet } from "egov-ui-kit/utils/localStorageUtils";
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

    const { reportResult, searchForm, tabLabel, metaData } = _this.props;
    const { reportName } = _this.state;
    const reportDetails = metaData.hasOwnProperty("reportDetails") ? metaData.reportDetails : {};
    const reportHeader = reportDetails.hasOwnProperty("reportHeader") ? reportDetails.reportHeader : [];
    const columns = ":visible";
    const exportOptions = flag ? { rows: ".selected", columns } : { columns };
    let reportTitle = this.getReportTitle();
    let orientation = reportHeader.length > 6 ? "landscape" : "portrait";

    const buttons = [
      {
        text: "<span>Download as : </span>",
        className: "report-download-button-text",
      },
      {
        extend: "pdf",
        // exportOptions: {
        //             columns: [ 0, 1, 2, 5,6,7 ]
        // },
        // exportOptions,
        filename: _this.state.reportName,
        //title: reportTitle,
        messageTop: tabLabel,
        text: "PDF",
        orientation: orientation,
        pageSize: "LEGAL",
        footer: true,
        customize: function(doc) {
          // _this.PrintingCutomize(doc);
          console.log(doc.content);
          doc.content[0].text = [];
          doc.content[0].text.push({ text: "mSeva System Reports\n\n", bold: true, fontSize: 20 });
          doc.content[0].text.push({ text: reportTitle, fontSize: 18 });
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
        // exportOptions,
      },
    ];
    return buttons;
  };

  componentDidUpdate() {
    let { reportResult, tabLabel, metaData } = this.props;
    let { reportDetails = {} } = metaData;
    let { additionalConfig = {} } = reportDetails;
    let self = this;
    let displayStart = 0;
    if (rTable && rTable.page && rTable.page.info()) {
      displayStart = rTable.page.info().start;
    }
    let showTabLabel = () => {
      $(".report-result-table-header").html(`${tabLabel}`);
    };
    rTable = $("#reportTable").DataTable({
      // dom: "<'&nbsp''row'<'col-sm-3'l><'col-sm-5'f><'col-sm-4'B>><'row'<'col-sm-12'tr>><'&nbsp''row'<'col-sm-5'i><'col-sm-7'p>>",
      // dom: "<'&nbsp''row'<'report-filter'f><'report-buttons'B>><'row'<'col-sm-12'tr>><'&nbsp''row'<'col-sm-5'i><'col-sm-7'p>>",
      dom:
        "<'&nbsp''row'<'col-sm-3 col-xs-6 text-left'l><'col-sm-5 col-xs-6 text-right'f><'col-sm-4 col-xs-12 text-center'B>><'row'<'col-sm-12't>><'&nbsp''row'<'col-sm-5 col-xs-12'i><'col-xs-12'p>>",
      order: [],
      // responsive: true,
      select: true,
      displayStart: displayStart,
      buttons: self.getExportOptions(),
      searching: true,
      paging: true,
      // bInfo: false,
      // order: [[3, "desc"]],
      ordering: true,
      // bDestroy: true,
      columnDefs: [
        {
          ordering: false,
          targets: 0,
        },
      ],
      fixedColumns: true,
      // scrollResize: true,
      scrollY: 400,
      // scrollCollapse: true,
      // fnDrawCallback: function() {
      //   let tableId = "reportTable";
      //   let tableRows = document.getElementById(tableId).rows;
      //   let rowCount = tableRows.length;
      //   let cellCount = tableRows[0].cells.length;
      //   let totalsRowIndex = -1;
      //   let totalValues = [];
      //   let i;
      //   let j;
      //
      //   for (i = 0; i < rowCount; i++) {
      //     if (tableRows[i].className.indexOf("total") !== -1) {
      //       totalsRowIndex = i;
      //       for (j = 0; j < cellCount; j++) {
      //         totalValues[j] = tableRows[i].cells[j].innerText;
      //       }
      //       tableRows[i].classList.remove("total");
      //       break;
      //     }
      //   }
      //
      //   if (totalsRowIndex === -1) {
      //     return;
      //   }
      //
      //   for (i = totalsRowIndex; i < rowCount - 1; i++) {
      //     for (j = 0; j < cellCount; j++) {
      //       tableRows[i].cells[j].innerText = tableRows[i + 1].cells[j].innerText;
      //     }
      //   }
      //
      //   for (i = 0; i < cellCount; i++) {
      //     tableRows[rowCount - 1].cells[i].innerText = totalValues[i];
      //   }
      //   tableRows[rowCount - 1].classList.add("total");
      //
      //   for (i = 0; i < rowCount; i++) {
      //     $("#" + tableId)
      //       .DataTable()
      //       .row(tableRows[i])
      //       .invalidate();
      //   }
      // },
      // lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
      // "iDisplayLength": -1,
      bPaginate: true,
      iCookieDuration: 60,
      // "bStateSave": false,
      bAutoWidth: true,
      //true
      bScrollAutoCss: true,
      // "bProcessing": true,
      bRetrieve: true,
      bJQueryUI: true,
      // "sDom": "<'&nbsp''row'<'H'CTrf>t<'F'lip<'row'<'col-sm-12'tr>><'&nbsp''row'<'col-sm-5'i><'col-sm-7'p>>>",
      aLengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
      sScrollX: "100%",
      // "sScrollXInner": "110%",
      bScrollCollapse: true,
      fnInitComplete: function() {
        this.css("visibility", "visible");
        $(".dataTables_scrollBody thead tr").css({ visibility: "collapse" });
      },
      renderer: "bootstrap",
      drawCallback: function(settings) {
        $(".dataTables_scrollBody thead tr").css({ visibility: "collapse" });
      },
      ...additionalConfig,
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

      var tenantId = getTenantId() ? getTenantId() : commonConfig.tenantId;

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
            setReturnUrl(window.location.hash.split("#/")[1]);
            localStorageSet("moduleName", match.params.moduleName);
            localStorageSet(
              "searchCriteria",
              JSON.stringify({
                tenantId: tenantId,
                reportName: match.params.reportName,
                searchParams: copySearchParams,
              })
            );
            localStorageSet("searchForm", JSON.stringify(searchForm));
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
      let afterURL = object.defaultValue.split("?")[1];
      let URLparams = afterURL.split(":");
      if (URLparams.length > 1) {
        setRoute(`${URLparams[0] + encodeURIComponent(item1)}`);
      } else {
        setRoute(URLparams[0]);
      }
    }
  };

  addCommas = (num) => {
    if (isNaN(num)) {
      return num;
    }
    let value = num.toString().trim();
    const decLoc = value.indexOf(".") > -1 ? value.indexOf(".") : value.length;
    let i = decLoc - 3;
    if (i >= 1 && value.charAt(i - 1) !== "-") {
      value = value.substr(0, i) + "," + value.substr(i, value.length);
      i -= 2;
      while (i >= 1) {
        if (value.charAt(i - 1) == "-")
          // Handle for negatives
          break;
        value = value.substr(0, i) + "," + value.substr(i, value.length);
        i -= 2;
      }
    }
    return value;
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
      if (
        reportResult &&
        reportResult.reportHeader &&
        reportResult.reportHeader.length &&
        reportResult.reportHeader[i] &&
        reportResult.reportHeader[i].type == "currency"
      ) {
        return this.addCommas(Number(val).toFixed(2));
      } else {
        return val;
      }
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
          <th key={"S. No."} className="report-header-cell">
            {"S. No."}
          </th>
          {metaData && metaData.reportDetails && metaData.reportDetails.selectiveDownload && (
            <th key={"testKey"}>
              <input type="checkbox" onChange={checkAllRows} />
            </th>
          )}
          {reportResult.hasOwnProperty("reportHeader") &&
            reportResult.reportHeader.map((item, i) => {
              if (item.showColumn) {
                return (
                  <th key={i} className="report-header-cell">
                    <Label
                      className="report-header-row-label"
                      labelStyle={{ width: "60%", wordWrap: "unset", wordBreak: "unset", fontWeight: "bold" }}
                      label={item.label}
                    />
                  </th>
                );
              } else {
                return (
                  <th style={{ display: "none" }} key={i}>
                    <Label
                      className="report-header-row-label"
                      labelStyle={{ width: "60%", wordWrap: "unset", wordBreak: "unset", fontWeight: "bold" }}
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

      var tenantId = getTenantId() ? getTenantId() : commonConfig.tenantId;
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
              setReturnUrl(window.location.hash.split("#/")[1]);
              setRoute("/print/report/" + response.viewPath);
            }
          },
          function(err) {
            console.log(err);
          }
        );
    }
  }

  getStyleForCell = (i) => {
    let { reportResult } = this.props;
    if (
      reportResult &&
      reportResult.reportHeader &&
      reportResult.reportHeader.length &&
      reportResult.reportHeader[i] &&
      reportResult.reportHeader[i].type == "currency"
    ) {
      return { textAlign: "right" };
    } else {
      return { textAlign: "left" };
    }
  };
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
                {metaData && metaData.reportDetails && metaData.reportDetails.selectiveDownload && (
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
                        style={this.getStyleForCell(itemIndex)}
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
        {/*this.renderFooter()*/}
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
          columnObj["total"] = null == headerObj.total ? false : headerObj.total;
          // columnObj["total"] = true;
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

    var intVal = function(i) {
      if (typeof i === "string") {
        let a = i.replace(/,/g, "");
        a = a.replace(/[^-+0-9. ]/g, " ").split(" ")[0];
        let inta = a && Number(a);
        return inta;
      } else if (typeof i === "number") {
        return i;
      }
      //return typeof i === "string" ? i.replace(/[\$,]/g, "") * 1 : typeof i === "number" ? i : 0;
    };

    let total = [];
    for (let i = 0; i < reportResult.reportData.length; i++) {
      for (let j = 0; j < reportResult.reportData[i].length; j++) {
        let val = intVal(reportResult.reportData[i][j]);
        if (i == 0) {
          if (sumColumn[j + 1].total && typeof val === "number") {
            total.push(val);
          } else {
            total.push("");
          }
          continue;
        }
        if (sumColumn[j + 1].total) {
          if (typeof val === "number") {
            if (typeof total[j] === "string") {
              total[j] = val;
            } else {
              total[j] += val;
            }
          }
        }
      }
    }

    if (footerexist) {
      return (
        <tfoot>
          <tr className="total">
            {sumColumn.map((columnObj, index) => {
              return (
                <th style={index !== 0 ? { textAlign: "right" } : {}} key={index}>
                  {index === 0 ? "Total" : this.addCommas(Number(total[index - 1])).toFixed(2)}
                </th>
              );
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

          <table
            id="reportTable"
            style={{
              // color: "#484848",
              // fontWeight: "normal",
              // padding: "0 !important",
              // backgroundColor: "#ffffff",
              // overflowY: "auto",
              width: "100%",
            }}
            // className="mdl-data-table"
            className="table table-responsive table-striped table-bordered display nowrap dataTable"
            // style={{ width: "100%" }}
          >
            {self.renderHeader()}
            {self.renderBody()}

            {this.renderFooter()}
          </table>
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
    return isTableShow ? (
      <div>
        {!_.isEmpty(reportResult) &&
          reportResult.hasOwnProperty("reportData") &&
          metaData &&
          metaData.reportDetails &&
          metaData.reportDetails.reportName && <div className="report-title">{this.getReportTitle(metaData.reportDetails.reportName)}</div>}
        <div className="report-result-table">
          {isTableShow && !_.isEmpty(reportResult) && reportResult.hasOwnProperty("reportData") && viewTabel()}
        </div>
      </div>
    ) : null;
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
