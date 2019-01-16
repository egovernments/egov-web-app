import React, { Component } from "react";
import { data } from "./dammyDt";
import $ from "jquery";
// import "egov-ui-kit/assets/styles/jquery.dataTables.min.css";
import JSZip from "jszip/dist/jszip";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import "datatables.net-bs4";
import "datatables.net-autofill-bs4";
// import "datatables.net-buttons-bs4";
// import "datatables.net-buttons/js/buttons.colVis.js";
// import "datatables.net-buttons/js/buttons.flash.js";
// import "datatables.net-buttons/js/buttons.html5.js";
// import "datatables.net-buttons/js/buttons.print.js";
import "datatables.net-colreorder-bs4";
import "datatables.net-fixedcolumns-bs4";
import "datatables.net-fixedheader-bs4";
import "datatables.net-keytable-bs4";
import "datatables.net-responsive-bs4";
import "datatables.net-rowgroup-bs4";
import "datatables.net-rowreorder-bs4";
import "datatables.net-scroller-bs4";
import "datatables.net-select-bs4";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
window.JSZip = JSZip;

class DTTable extends Component {
  componentDidMount() {
    $(this.refs.main).DataTable({
      dom: '<"data-table-wrapper"t>'
    });
  }
  componentWillUnmount() {
    $(".data-table-wrapper")
      .find("table")
      .DataTable()
      .destroy(true);
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div>
        <table ref="main" >
            <thead>
              <tr>
              {
                data.columns.map((item,key)=>{
                  return (

                      <th key={key}>{item.label}</th>

                  )
                })
              }
              </tr>
            </thead>
            <tbody>
              {
                data.rows.map((item,key)=>{
                  return (
                    <tr key={key}>
                      <td>{item.name}</td>
                      <td>{item.position}</td>
                      <td>{item.office}</td>
                      <td>{item.age}</td>
                      <td>{item.date}</td>
                      <td>{item.salary}</td>
                    </tr>
                  )
                })
              }
            </tbody>
        </table>
      </div>
    );
  }
}

export default DTTable;
