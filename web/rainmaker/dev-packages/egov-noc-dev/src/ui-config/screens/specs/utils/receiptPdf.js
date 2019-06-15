import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const getApplicationData = (transformedData, ulbLogo, type) => {
  let borderLayout = {
    hLineWidth: function(i, node) {
      return i === 0 || i === node.table.body.length ? 0.1 : 0.1;
    },
    vLineWidth: function(i, node) {
      return i === 0 || i === node.table.widths.length ? 0.1 : 0.1;
    },
    hLineColor: function(i, node) {
      return i === 0 || i === node.table.body.length ? "#979797" : "#979797";
    },
    vLineColor: function(i, node) {
      return i === 0 || i === node.table.widths.length ? "#979797" : "#979797";
    }
    // paddingLeft: function(i, node) {
    //   return 5;
    // },
    // paddingRight: function(i, node) {
    //   return 5;
    // },
    // paddingTop: function(i, node) {
    //   return 5;
    // },
    // paddingBottom: function(i, node) {
    //   return 5;
    // }
  };

  let headerText = "Application Confirmation";
  let nocSubheadOne = [
    {
      text: [
        {
          text: "Application No. ",
          bold: true
        },
        {
          text: transformedData.applicationNumber,
          bold: false
        }
      ],
      alignment: "left"
    },
    {
      text: [
        {
          text: "Date of Application ",
          bold: true
        },
        {
          text: transformedData.applicationDate,
          bold: false
        }
      ],
      alignment: "right"
    }
  ];
  let nocSubheadTwo = [
    {
      text: [
        {
          text: "Application Mode ",
          bold: true
        },
        {
          text: transformedData.applicationMode,
          bold: false
        }
      ],
      alignment: "left"
    }
  ];
  let nocDetails = [
    {
      text: "NOC DETAILS",
      style: "noc-title"
    },
    {
      style: "noc-table",
      table: {
        widths: ["*", "*", "*"],
        body: [
          [
            {
              text: "NOC Type",
              border: [true, true, false, false],
              style: "noc-table-key"
            },
            {
              text: "Provisional NOC No.",
              border: [false, true, false, false]
            },
            {
              text: "Applicable Fire station",
              border: [false, true, true, false]
            }
          ],
          [
            {
              text: transformedData.nocType,
              border: [true, false, false, true],
              style: "receipt-table-value"
            },
            {
              text: transformedData.provisionalNocNumber,
              border: [false, false, false, true],
              style: "receipt-table-value"
            },
            {
              text: transformedData.fireStationId,
              border: [false, false, true, true],
              style: "receipt-table-value"
            }
          ]
        ]
      },
      layout: borderLayout
    }
  ];
  let propertyDetails = [
    {
      text: "PROPERTY DETAILS",
      style: "noc-title"
    },
    {
      style: "noc-table",
      table: {
        widths: ["*", "*", "*", "*"],
        body: [
          [
            {
              text: "Property Type",
              border: [true, true, false, false]
            },
            {
              text: " Name of Building",
              border: [false, true, false, false]
            },
            {
              text: "Building Usage Type",
              border: [false, true, false, false]
            },
            {
              text: "Building Usage Subtype",
              border: [false, true, true, false]
            }
          ],
          [
            {
              text: transformedData.propertyType,
              style: "receipt-table-value",
              border: [true, false, false, false]
            },
            {
              text: get(transformedData, "buildings[0].name", "NA"),
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: get(transformedData, "buildings[0].usageType", "NA"),
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: get(transformedData, "buildings[0].usageSubType", "NA"),
              style: "receipt-table-value",
              border: [false, false, true, false]
            }
          ],
          [
            {
              text: "No. of Floors",
              border: [true, false, false, false]
            },
            {
              text: " No. of Basements",
              border: [false, false, false, false]
            },
            {
              text: "Plot Size (Sq mtrs)",
              border: [false, false, false, false]
            },
            {
              text: "Builtup Area (sq mtrs)",
              border: [false, false, true, false]
            }
          ],
          [
            {
              text: get(transformedData, "NO_OF_FLOORS", "NA"),
              style: "receipt-table-value",
              border: [true, false, false, false]
            },
            {
              text: get(transformedData, "NO_OF_BASEMENTS", "NA"),
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: get(transformedData, "PLOT_SIZE", "NA"),
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: get(transformedData, "BUILTUP_AREA", "NA"),
              style: "receipt-table-value",
              border: [false, false, true, false]
            }
          ],
          [
            {
              text: "Height of Building (in mtrs)",
              border: [true, false, false, false]
            },
            {
              text: "",
              border: [false, false, false, false]
            },
            {
              text: "",
              border: [false, false, false, false]
            },

            {
              text: "",
              border: [false, false, true, false]
            }
          ],
          [
            {
              text: get(transformedData, "HEIGHT_OF_BUILDING", "NA"),
              style: "receipt-table-value",
              border: [true, false, false, true]
            },
            {
              text: "",
              style: "receipt-table-value",
              border: [false, false, false, true]
            },
            {
              text: "",
              style: "receipt-table-value",
              border: [false, false, false, true]
            },

            {
              text: "",
              style: "receipt-table-value",
              border: [false, false, true, true]
            }
          ]
        ]
      },
      layout: borderLayout
    }
  ];
  let propertyLocationDetails = [
    {
      text: "PROPERTY LOCATION DETAILS",
      style: "noc-title"
    },
    {
      style: "noc-table",
      table: {
        widths: ["*", "*", "*", "*"],
        body: [
          [
            {
              text: "Property Id",
              border: [true, true, false, false]
            },
            {
              text: "City",
              border: [false, true, false, false]
            },
            {
              text: "Door/House No.",
              border: [false, true, false, false]
            },
            {
              text: "Building/Company Name",
              border: [false, true, true, false]
            }
          ],
          [
            {
              text: transformedData.propertyId,
              style: "receipt-table-value",
              border: [true, false, false, false]
            },
            {
              text: transformedData.city,
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: transformedData.door,
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: transformedData.buildingName,
              style: "receipt-table-value",
              border: [false, false, true, false]
            }
          ],
          [
            {
              text: "Street Name",
              border: [true, false, false, false]
            },

            {
              text: " Mohalla",
              border: [false, false, false, false]
            },
            {
              text: "Pincode",
              border: [false, false, false, false]
            },
            {
              text: "Location on Map",
              border: [false, false, true, false]
            }
          ],
          [
            {
              text: transformedData.street,
              style: "receipt-table-value",
              border: [true, false, false, true]
            },
            {
              text: transformedData.mohalla,
              style: "receipt-table-value",
              border: [false, false, false, true]
            },
            {
              text: transformedData.pincode,
              style: "receipt-table-value",
              border: [false, false, false, true]
            },
            {
              text: transformedData.gis,
              style: "receipt-table-value",
              border: [false, false, true, true]
            }
          ]
        ]
      },
      layout: borderLayout
    }
  ];
  let applicantDetails = [
    {
      text: "APPLICANT DETAILS",
      style: "noc-title"
    },
    {
      style: "noc-table",
      table: {
        widths: ["*", "*", "*", "*"],
        body: [
          [
            {
              text: "Mobile No.",
              border: [true, true, false, false]
            },
            {
              text: "Name",
              border: [false, true, false, false]
            },
            {
              text: "Gender",
              border: [false, true, false, false]
            },
            {
              text: "Father/Husband's Name",
              border: [false, true, true, false]
            }
          ],
          [
            {
              text: get(transformedData, "owners[0].mobileNumber"),
              style: "receipt-table-value",
              border: [true, false, false, false]
            },
            {
              text: get(transformedData, "owners[0].name"),
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: get(transformedData, "owners[0].gender"),
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: get(transformedData, "owners[0].fatherHusbandName"),
              style: "receipt-table-value",
              border: [false, false, true, false]
            }
          ],
          [
            {
              text: "",
              border: [true, false, false, false]
            },
            {
              text: "",
              border: [false, false, false, false]
            },
            {
              text: "",
              border: [false, false, false, false]
            },

            {
              text: "",
              border: [false, false, true, false]
            }
          ],
          [
            {
              text: "Date of Birth",
              border: [true, false, false, false]
            },
            {
              text: "Email",
              border: [false, false, false, false]
            },
            {
              text: "PAN No.",
              border: [false, false, false, false]
            },
            {
              text: "Correspondence Address",
              border: [false, false, true, false]
            }
          ],
          [
            {
              text: get(transformedData, "owners[0].dob"),
              style: "receipt-table-value",
              border: [true, false, false, true]
            },
            {
              text: get(transformedData, "owners[0].email"),
              style: "receipt-table-value",
              border: [false, false, false, true]
            },
            {
              text: get(transformedData, "owners[0].pan"),
              style: "receipt-table-value",
              border: [false, false, false, true]
            },

            {
              text: get(transformedData, "owners[0].address"),
              style: "receipt-table-value",
              border: [false, false, true, true]
            }
          ]
        ]
      },
      layout: borderLayout
    }
  ];
  let documents = [];

  let owners = transformedData.owners.map(owner => [
    {
      text: "Applicant Name",
      border: [true, true, false, true],
      style: "receipt-table-value"
    },
    { text: owner.name, border: [false, true, true, true] },
    {
      text: "Mobile No.",
      border: [true, true, false, true],
      style: "receipt-table-value"
    },
    { text: owner.mobile, border: [false, true, true, true] }
  ]);
  let applicantInformation = [
    { text: "APPLICANT INFORMATION", style: "noc-title" },
    {
      style: "noc-table",
      table: {
        widths: ["*", "*", "*", "*"],
        body: owners
      },
      layout: borderLayout
    }
  ];

  let amountPaid = [
    { text: "AMOUNT PAID", style: "noc-title" },
    {
      style: "noc-table",
      table: {
        widths: ["*", "*", "*", "*"],
        body: [
          [
            {
              text: "NOC Fee",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            },
            {
              text: "Rebate/Penalty",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            },
            {
              text: "Adhoc Penalty/Rebate",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            },
            { text: "TOTAL", border: [true, true, true, true], style: "receipt-table-value", alignment: "center" }
          ],
          [
            {
              text: transformedData.nocFee,
              border: [true, true, true, true],
              alignment: "center"
            },
            { text: transformedData.nocPenaltyRebate, border: [true, true, true, true], alignment: "center" },
            {
              text: transformedData.nocAdhocPenaltyRebate,
              border: [true, true, true, true],
              alignment: "center"
            },
            { text: transformedData.totalAmount, border: [true, true, true, true], alignment: "center" }
          ]
        ]
      },
      layout: borderLayout
    }
  ];
  let paymentInformation = [
    { text: "PAYMENT INFORMATION", style: "noc-title" },
    {
      style: "noc-table",
      table: {
        widths: ["*", "*", "*"],
        body: [
          [
            {
              text: "Payment Mode",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            },
            {
              text: "Transaction ID/ Cheque/ DD No.",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            },
            {
              text: "Bank Name & Branch",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            }
          ],
          [
            {
              text: transformedData.paymentMode,
              border: [true, true, true, true],
              alignment: "center"
            },
            {
              text: transformedData.transactionNumber,
              border: [true, true, true, true],
              alignment: "center"
            },
            {
              text: transformedData.bankAndBranch,
              border: [true, true, true, true],
              alignment: "center"
            }
          ]
        ]
      },
      layout: borderLayout
    }
  ];

  let generatedApprovedBy = [
    {
      style: "receipt-approver",
      columns: [
        {
          text: [
            {
              text: "Generated by: ",
              bold: true
            },
            {
              text: transformedData.auditorName,
              bold: false
            }
          ],
          alignment: "left"
        },
        {
          text: [
            {
              text: "Commissioner/EO",
              bold: true
            }
          ],
          alignment: "right"
        }
      ]
    }
  ];

  switch (type) {
    case "application":
      applicantInformation = [];
      amountPaid = [];
      paymentInformation = [];
      generatedApprovedBy = [];
      break;
    case "receipt":
      headerText = "Payment Receipt";
      nocSubheadOne = [
        {
          text: [
            {
              text: "Application No. ",
              bold: true
            },
            {
              text: transformedData.applicationNumber,
              bold: false
            }
          ],
          alignment: "left"
        },
        {
          text: [
            {
              text: "Date of Payment ",
              bold: true
            },
            {
              text: transformedData.paymentDate,
              bold: false
            }
          ],
          alignment: "right"
        }
      ];
      nocSubheadTwo = [
        {
          text: [
            {
              text: "Payment Receipt No. ",
              bold: true
            },
            {
              text: transformedData.receiptNumber,
              bold: false
            }
          ],
          alignment: "left"
        }
      ];
      nocDetails = [];
      propertyDetails = [];
      propertyLocationDetails = [];
      applicantDetails = [];
      documents = [];
      break;
    case "certificate":
      headerText = "Certificate";
      break;
  }
  let dd = {
    content: [
      {
        style: "noc-head",
        table: {
          widths: [100, "*", 18],
          body: [
            [
              {
                image: ulbLogo,
                width: 60,
                height: 61.25,
                margin: [41, 12, 10, 10]
              },
              {
                stack: [
                  {
                    text: transformedData.corporationName,
                    style: "receipt-logo-header"
                  },
                  {
                    text: `Fire NOC ${headerText}`,
                    style: "receipt-logo-sub-header"
                  }
                ],
                alignment: "left",
                margin: [10, 23, 0, 0]
              }
            ]
          ]
        },
        layout: "noBorders"
      },
      {
        style: "noc-subhead",
        columns: nocSubheadOne
      },
      {
        style: "noc-subhead",
        columns: nocSubheadTwo
      },
      ...nocDetails,
      ...propertyDetails,
      ...propertyLocationDetails,
      ...applicantDetails,
      ...documents,
      ...applicantInformation,
      ...amountPaid,
      ...paymentInformation,
      ...generatedApprovedBy
    ],
    footer: [],
    styles: {
      "noc-head": {
        fillColor: "#F2F2F2",
        margin: [-70, -41, -81, 0]
      },
      "receipt-logo-header": {
        color: "#484848",
        fontFamily: "Roboto",
        fontSize: 16,
        bold: true,
        letterSpacing: 0.74
      },
      "receipt-logo-sub-header": {
        color: "#484848",
        fontFamily: "Roboto",
        fontSize: 13,
        letterSpacing: 0.6
      },
      "noc-subhead": {
        fontSize: 12,
        bold: true,
        margin: [-18, 8, 10, 0],
        color: "#484848"
      },
      "noc-title": {
        fontSize: 10,
        bold: true,
        margin: [-18, 16, 8, 8],
        color: "#484848",
        fontWeight: 500
      },
      "noc-table": {
        fontSize: 10,
        color: "#484848",
        margin: [-20, -2, -8, -8]
      },
      "receipt-header-details": {
        fontSize: 9,
        margin: [0, 0, 0, 8],
        color: "#484848"
      },
      "noc-table-key": {
        color: "#484848",
        bold: false,
        fontSize: 10
      },
      "receipt-table-value": {
        color: "#484848",
        bold: true,
        fontSize: 10
      },
      "receipt-footer": {
        color: "#484848",
        fontSize: 8,
        margin: [-6, 15, -15, -10]
      },
      "receipt-no": {
        color: "#484848",
        fontSize: 10
      },
      "receipt-approver": {
        fontSize: 12,
        bold: true,
        margin: [-20, 30, -10, 0],
        color: "#484848"
      }
    }
  };
  return dd;
};

const generatePdf = async (state, dispatch, type) => {
  let applicationData = get(state.screenConfiguration.preparedFinalObject, "applicationDataForPdf", {});
  let paymentData = get(state.screenConfiguration.preparedFinalObject, "receiptDataForPdf", {});
  let mdmsData = get(state.screenConfiguration.preparedFinalObject, "mdmsDataForPdf", {});
  let ulbLogo = get(state.screenConfiguration.preparedFinalObject, "base64UlbLogoForPdf", "");
  let auditorData = get(state.screenConfiguration.preparedFinalObject, "userDataForPdf", {});
  if (isEmpty(applicationData)) {
    console.log("Error in application data");
    return;
  } else if (isEmpty(mdmsData)) {
    console.log("Error in mdms data");
    return;
  } else if (isEmpty(ulbLogo)) {
    console.log("Error in image data");
    return;
  } else if (isEmpty(auditorData)) {
    console.log("Error in auditor user data");
    return;
  } else if (type.startsWith("receipt") && isEmpty(paymentData)) {
    console.log("Error in payment data");
    return;
  }
  let transformedData = {
    ...applicationData,
    ...paymentData,
    ...mdmsData,
    ...auditorData
  };
  switch (type) {
    case "application_download":
      let application_data = getApplicationData(transformedData, ulbLogo, "application");
      application_data && pdfMake.createPdf(application_data).download("noc_application.pdf");
      break;
    case "application_print":
      application_data = getApplicationData(transformedData, ulbLogo, "application");
      application_data && pdfMake.createPdf(application_data).print();
      break;
    case "receipt_download":
      application_data = getApplicationData(transformedData, ulbLogo, "receipt");
      application_data && pdfMake.createPdf(application_data).download("noc_application.pdf");
      break;
    case "receipt_print":
      application_data = getApplicationData(transformedData, ulbLogo, "receipt");
      application_data && pdfMake.createPdf(application_data).print();
      break;
    case "certificate_download":
      application_data = getApplicationData(transformedData, ulbLogo, "certificate");
      application_data && pdfMake.createPdf(application_data).download("noc_application.pdf");
      break;
    case "certificate_print":
      application_data = getApplicationData(transformedData, ulbLogo, "certificate");
      application_data && pdfMake.createPdf(application_data).print();
      break;

    default:
      break;
  }
};

export default generatePdf;
