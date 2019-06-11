import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const getApplicationData = (transformedData, ulbLogo) => {
  let dd = {
    content: [
      {
        style: "tl-head",
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
                    text: "Fire-NOC Application Confirmation",
                    style: "receipt-logo-sub-header"
                  }
                ],
                alignment: "left",

                margin: [10, 23, 0, 0]
              }
            ]
          ]
        },
        layout: {}
      },
      {
        style: "pt-reciept-citizen-header",
        columns: [
          {
            text: [
              {
                text: "Application No.  ",
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
        ]
      },
      {
        style: "pt-reciept-citizen-header",
        columns: [
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
        ]
      },
      {
        text: "NOC DETAILS",
        style: "pt-reciept-citizen-subheader"
      },
      {
        style: "pt-reciept-citizen-table",
        table: {
          widths: ["*", "*", "*"],
          body: [
            [
              {
                text: "NOC Type",
                border: [true, true, false, false],
                style: "receipt-table-key",
                " alignment": "left"
              },

              {
                text: "Provisional NOC No.",
                border: [false, true, false, false]
              },
              {
                text: "Applicable Fire station",
                border: [
                  false, //left
                  true, //top
                  true, //right
                  false //bottom
                ]
              }
            ],
            [
              {
                text: transformedData.nocType,
                border: [true, false, false, true],
                style: "receipt-table-value",
                " alignment": "center"
              },
              {
                text: transformedData.provisionalNocNumber,
                style: "receipt-table-value",
                border: [false, false, false, true],
                style: "receipt-table-value"
              },
              {
                text: transformedData.fireStationId,
                style: "pt-reciept-citizen-table-row",
                border: [false, false, true, true],

                style: "receipt-table-value",
                " alignment": "center"
              }
            ]
          ]
        }
      },
      {
        text: "PROPERTY DETAILS",
        style: "pt-reciept-citizen-subheader"
      },
      {
        style: "pt-reciept-citizen-table",
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
                border: [
                  false, //left
                  true, //top
                  false, //right
                  false //bottom
                ]
              },
              {
                text: "Building Usage Subtype",
                border: [
                  false, //left
                  true, //top
                  true, //right
                  false //bottom
                ]
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
                text: "",
                style: "receipt-table-value",
                border: [true, false, false, false]
              },
              {
                text: "",
                style: "receipt-table-value",
                border: [false, false, false, false]
              },
              {
                text: "",
                style: "receipt-table-value",
                border: [false, false, false, false]
              },

              {
                text: "",
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
                border: [
                  false, //left
                  false, //top
                  false, //right
                  false //bottom
                ]
              },
              {
                text: "Builtup Area (sq mtrs)",
                border: [
                  false, //left
                  false, //top
                  true, //right
                  false //bottom
                ]
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
                text: "",
                style: "pt-reciept-citizen-table-row",
                border: [true, false, false, false]
              },
              {
                text: "",
                style: "pt-reciept-citizen-table-row",
                border: [false, false, false, false]
              },
              {
                text: "",
                style: "pt-reciept-citizen-table-row",
                border: [false, false, false, false]
              },

              {
                text: "",
                style: "pt-reciept-citizen-table-row",
                border: [false, false, true, false]
              }
            ],
            [
              {
                text: "Height of Building (in mtrs)",
                style: "pt-reciept-citizen-table-row",
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
                style: "pt-reciept-citizen-table-row",
                border: [false, false, false, true]
              },
              {
                text: "",
                style: "pt-reciept-citizen-table-row",
                border: [false, false, false, true]
              },

              {
                text: "",
                style: "pt-reciept-citizen-table-row",
                border: [false, false, true, true]
              }
            ]
          ]
        }
      },
      {
        text: "PROPERTY LOCATION DETAILS",
        style: "pt-reciept-citizen-subheader"
      },
      {
        style: "pt-reciept-citizen-table",
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
                border: [
                  false, //left
                  true, //top
                  false, //right
                  false //bottom
                ]
              },
              {
                text: "Building/Company Name",
                border: [
                  false, //left
                  true, //top
                  true, //right
                  false //bottom
                ]
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
                text: "",
                style: "pt-reciept-citizen-table-row",
                border: [true, false, false, false]
              },
              {
                text: "",
                style: "pt-reciept-citizen-table-row",
                border: [false, false, false, false]
              },
              {
                text: "",
                style: "pt-reciept-citizen-table-row",
                border: [false, false, false, false]
              },

              {
                text: "",
                style: "pt-reciept-citizen-table-row",
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
                border: [
                  false, //left
                  false, //top
                  false, //right
                  false //bottom
                ]
              },
              {
                text: "Location on Map",
                border: [
                  false, //left
                  false, //top
                  true, //right
                  false //bottom
                ]
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
        }
      },
      {
        text: "APPLICANT DETAILS",
        style: "pt-reciept-citizen-subheader"
      },
      {
        style: "pt-reciept-citizen-table",
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
                border: [
                  false, //left
                  true, //top
                  false, //right
                  false //bottom
                ]
              },
              {
                text: "Father/Husband's Name",
                border: [
                  false, //left
                  true, //top
                  true, //right
                  false //bottom
                ]
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
                style: "receipt-table-value",
                border: [true, false, false, false]
              },
              {
                text: "",
                style: "pt-reciept-citizen-table-row",
                border: [false, false, false, false]
              },
              {
                text: "",
                style: "pt-reciept-citizen-table-row",
                border: [false, false, false, false]
              },

              {
                text: "",
                style: "pt-reciept-citizen-table-row",
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
                border: [
                  false, //left
                  false, //top
                  false, //right
                  false //bottom
                ]
              },
              {
                text: "Correspondence Address",
                border: [
                  false, //left
                  false, //top
                  true, //right
                  false //bottom
                ]
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
        }
      },
      {
        text: "",
        style: "pt-reciept-citizen-subheader"
      },
      {
        text: "",
        style: "pt-reciept-citizen-subheader"
      },
      {
        style: "pt-reciept-citizen-header",
        columns: [
          {
            text: [
              {
                text: "",
                bold: true
              }
            ]
          }
        ]
      }
    ],
    footer: [],

    styles: {
      "tl-head": {
        fillColor: "#F2F2F2",
        margin: [-70, -41, -81, 0]
      },
      "pt-reciept-citizen-header": {
        fontSize: 12,
        bold: true,
        margin: [-18, 8, 10, 0],
        color: "#484848"
      },
      "pt-reciept-citizen-subheader": {
        fontSize: 12,
        bold: true,
        margin: [-18, 16, 8, 8],
        color: "#484848"
      },
      "pt-reciept-citizen-table": {
        fontSize: 10,
        color: "#484848",
        margin: [-20, -2, -8, -8]
      },
      "receipt-header-details": {
        fontSize: 9,
        margin: [0, 0, 0, 8],
        color: "#484848"
      },
      "receipt-table-key": {
        color: "#484848",
        bold: false,
        fontSize: 10
      },
      "receipt-table-value": {
        color: "#484848",
        bold: true,
        fontSize: 12
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
      "pt-reciept-citizen-footer": {
        color: "#484848",
        fontSize: 12,
        margin: [15, -5, 10, 5]
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
        margin: [-10, -60, 10, -8],
        color: "#484848"
      }
    }
  };
  return dd;
};

const generatePdf = async (state, dispatch, type) => {
  let data1 = get(state.screenConfiguration.preparedFinalObject, "applicationDataForPdf", {});
  let data2 = get(state.screenConfiguration.preparedFinalObject, "mdmsDataForPdf", {});
  let ulbLogo = get(state.screenConfiguration.preparedFinalObject, "base64UlbLogoForPdf", "");
  if (isEmpty(data1)) {
    console.log("Error in application data");
    return;
  } else if (isEmpty(data2)) {
    console.log("Error in mdms data");
    return;
  } else if (isEmpty(ulbLogo)) {
    console.log("Error in image data");
    return;
  }
  let transformedData = {
    ...data1,
    ...data2
  };
  switch (type) {
    case "application_download":
      let application_data = getApplicationData(transformedData, ulbLogo);
      application_data && pdfMake.createPdf(application_data).download("noc_application.pdf");
      break;
    case "application_print":
      application_data = getApplicationData(transformedData, ulbLogo);
      application_data && pdfMake.createPdf(application_data).print();
      break;
    default:
      break;
  }
};

export default generatePdf;
