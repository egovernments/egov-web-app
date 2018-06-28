// import React from "react";
// import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table";

// const TableUi = ({ headerItems = {}, bodyItems = [], classes }) => {
//   const renderTableHead = (headerItems) => {
//     return (
//       <TableRow>
//         {Object.values(headerItems).map((value, index) => {
//           return <TableHeaderColumn>{value}</TableHeaderColumn>;
//         })}
//       </TableRow>
//     );
//   };

//   const renderTableBody = (bodyItems) => {
//     return (
//       <TableBody>
//         {bodyItems.map((bodyItem, index) => {
//           return (
//             <TableRow>
//               {Object.keys(bodyItem).map((key, index) => {
//                 return <TableRowColumn>{key}</TableRowColumn>;
//               })}
//             </TableRow>
//           );
//         })}
//       </TableBody>
//     );
//   };

//   return (
//     <div className="list-main-card">
//       <Table>
//         <TableHeader> {headerItems && renderTableHead(headerItems)} </TableHeader>
//         {bodyItems && renderTableBody(bodyItems)}
//       </Table>
//     </div>
//   );
// };

// // TableUi.propTypes = {
// //   classes: PropTypes.object.isRequired,
// // };

// export default withStyles(styles)(TableUi);
