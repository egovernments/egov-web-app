import {
  getCommonHeader,
  getCommonContainer
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { employeeReviewDetails } from "./viewResource/employee-review";

export const header = getCommonContainer({
  header: getCommonHeader({
    labelName: `Create New Employee - Summary`,
    labelKey: "HR_SUMMARY_HEADER"
  })
});

const tradeReview = employeeReviewDetails(true);

const screenConfig = {
  uiFramework: "material-ui",
  name: "review",
  // beforeInitScreen: (action, state, dispatch) => {
  //   dispatch(
  //     prepareFinalObject("Employee", [
  //       {
  //         user: {
  //           name: "Avijeet ",
  //           mobileNumber: "9999999999",
  //           fatherOrHusbandName: "Father",
  //           gender: "Male",
  //           dob: "1991-06-28",
  //           correspondenceAddress: "asd",
  //           roles: [
  //             {
  //               name: "Employee",
  //               code: "EMPLOYEE",
  //               description: "Employee in the ULB"
  //             }
  //           ],
  //           // tenantId: "pb.amritsar"
  //         },
  //         code: "123",
  //         dateOfAppointment: "2019-01-01",
  //         employeeType: "Male",
  //         employeeStatus: "Permanent",
  //         jurisdictions: [
  //           {
  //             hierarchy: "Value 1",
  //             boundaryType: "Value 1",
  //             boundary: "Value 1",
  //             // tenantId: "pb.amritsar"
  //           }
  //         ],
  //         assignments: [
  //           {
  //             fromDate: "2019-01-01",
  //             toDate: "2020-01-01",
  //             department: "Value 1",
  //             designation: "Male",
  //             reportingTo: "baba"
  //           }
  //         ],
  //         // serviceHistory: [
  //         //   {
  //         //     serviceStatus: "Value 1",
  //         //     serviceFrom: "2019-01-01",
  //         //     serviceTo: "2020-01-01",
  //         //     location: "Value 1",
  //         //     orderNo: "ordr123"
  //         //   }
  //         // ],
  //         // education: [
  //         //   {
  //         //     qualification: "Male",
  //         //     yearOfPassing: 1548671668,
  //         //     university: "Male",
  //         //     stream: "Male",
  //         //     remarks: "asd"
  //         //   }
  //         // ],
  //         // tests: [{ test: "Male", yearOfPassing: 1548671668, remarks: "asd" }],
  //         // tenantId: "pb.amritsar"
  //       }
  //     ])
  //   );
  //   return action;
  // },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 10
              },
              ...header
            }
          }
        },
        tradeReview
      }
    }
  }
};

export default screenConfig;
