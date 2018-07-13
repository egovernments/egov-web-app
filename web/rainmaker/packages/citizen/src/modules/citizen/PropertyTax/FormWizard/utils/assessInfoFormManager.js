import formHoc from "egov-ui-kit/hocs/form";
import GenericForm from "../components/GenericForm";

const combinationToFormkeyMapping = {
  'RESIDENTIAL-IndependentProperty':{
    path:"PropertyTaxPay/ResidentialIndependantProperty",
    plotForm:formHoc({ formKey: "plotDetails",path:"PropertyTaxPay/ResidentialIndependantProperty"})(GenericForm),
    floorForm:formHoc({ formKey: "floorDetails",makeCopy:true,path:"PropertyTaxPay/ResidentialIndependantProperty"})(GenericForm),
    floorObject:{ formKey: "floorDetails",makeCopy:true,copyName:"floorDetails",path:"PropertyTaxPay/ResidentialIndependantProperty"},
    hasPlot:true,
    hasFloor:true,

  },
  'RESIDENTIAL-SharedProperty':{
    path:"PropertyTaxPay/ResidentialSharedProperty",
    plotForm:formHoc({ formKey: "plotDetails",path:"PropertyTaxPay/ResidentialSharedProperty"})(GenericForm),
    floorObject:{ formKey: "floorDetails",makeCopy:true,copyName:"floorDetails",path:"PropertyTaxPay/ResidentialIndependantProperty"},
    hasPlot:true,
    hasFloor:false
  },
  'MIXED-IndependentProperty':{
    path:"PropertyTaxPay/MixedIndependantProperty",
    plotForm:formHoc({ formKey: "plotDetails",path:"PropertyTaxPay/MixedIndependantProperty"})(GenericForm),
    floorForm:formHoc({ formKey: "floorDetails",makeCopy:true,path:"PropertyTaxPay/MixedIndependantProperty"})(GenericForm),
    floorObject:{ formKey: "floorDetails",makeCopy:true,copyName:"floorDetails",path:"PropertyTaxPay/ResidentialIndependantProperty"},
    hasPlot:true,
    hasFloor:true
  },
  'MIXED-SharedProperty':{
    path:"PropertyTaxPay/MixedSharedProperty",
    plotForm:formHoc({ formKey: "plotDetails",path:"PropertyTaxPay/MixedSharedProperty"})(GenericForm),
    hasPlot:true,
    hasFloor:false
  },
  'COMMERCIAL-IndependentProperty':{
    path:"PropertyTaxPay/CommercialIndependantProperty",
    plotForm:formHoc({ formKey: "plotDetails",path:"PropertyTaxPay/CommercialIndependantProperty"})(GenericForm),
    floorForm:formHoc({ formKey: "floorDetails",makeCopy:true,path:"PropertyTaxPay/CommercialIndependantProperty"})(GenericForm),
    floorObject:{ formKey: "floorDetails",makeCopy:true,copyName:"floorDetails",path:"PropertyTaxPay/CommercialIndependantProperty"},
    hasPlot:true,
    hasFloor:true
  },
  'COMMERCIAL-SharedProperty':{
    path:"PropertyTaxPay/CommercialSharedProperty",
    plotForm:formHoc({ formKey: "plotDetails",path:"PropertyTaxPay/CommercialSharedProperty"})(GenericForm),
    floorForm:formHoc({ formKey: "floorDetails",makeCopy:true,path:"PropertyTaxPay/CommercialSharedProperty"})(GenericForm),
    floorObject:{ formKey: "floorDetails",makeCopy:true,copyName:"floorDetails",path:"PropertyTaxPay/CommercialSharedProperty"},
    hasPlot:true,
    hasFloor:true
  },
  'INDUSTRIAL-IndependentProperty':{
    path:"PropertyTaxPay/IndustrialIndependantProperty",
    plotForm:formHoc({ formKey: "plotDetails",path:"PropertyTaxPay/IndustrialIndependantProperty"})(GenericForm),
    floorForm:formHoc({ formKey: "floorDetails",makeCopy:true,path:"PropertyTaxPay/IndustrialIndependantProperty"})(GenericForm),
    floorObject:{ formKey: "floorDetails",makeCopy:true,copyName:"floorDetails",path:"PropertyTaxPay/IndustrialIndependantProperty"},
    hasPlot:true,
    hasFloor:true
  },
  'INDUSTRIAL-SharedProperty':{
    path:"PropertyTaxPay/IndustrialSharedProperty",
    plotForm:formHoc({ formKey: "plotDetails",path:"PropertyTaxPay/IndustrialSharedProperty"})(GenericForm),
    hasPlot:true,
    hasFloor:false
  },
  'INSTITUTIONAL-IndependentProperty':{
    path:"PropertyTaxPay/InstitutionalIndependantProperty",
    plotForm:formHoc({ formKey: "plotDetails",path:"PropertyTaxPay/InstitutionalIndependantProperty"})(GenericForm),
    floorForm:formHoc({ formKey: "floorDetails",makeCopy:true,path:"PropertyTaxPay/InstitutionalIndependantProperty"})(GenericForm),
    floorObject:{ formKey: "floorDetails",makeCopy:true,copyName:"floorDetails",path:"PropertyTaxPay/InstitutionalIndependantProperty"},
    hasPlot:true,
    hasFloor:true
  },
  'INSTITUTIONAL-SharedProperty':{
    path:"PropertyTaxPay/InstitutionalSharedProperty",
    plotForm:formHoc({ formKey: "plotDetails",path:"PropertyTaxPay/InstitutionalSharedProperty"})(GenericForm),
    hasPlot:true,
    hasFloor:false
  },
  'OTHER-IndependentProperty':{
    path:"PropertyTaxPay/OtherIndependantProperty",
    plotForm:formHoc({ formKey: "plotDetails",path:"PropertyTaxPay/OtherIndependantProperty"})(GenericForm),
    floorForm:formHoc({ formKey: "floorDetails",makeCopy:true,path:"PropertyTaxPay/OtherIndependantProperty"})(GenericForm),
    floorObject:{ formKey: "floorDetails",makeCopy:true,copyName:"floorDetails",path:"PropertyTaxPay/OtherIndependantProperty"},
    hasPlot:true,
    hasFloor:true
  },
  'OTHER-SharedProperty':{
    path:"PropertyTaxPay/OtherSharedProperty",
    plotForm:formHoc({ formKey: "plotDetails",path:"PropertyTaxPay/OtherSharedProperty"})(GenericForm),
    hasPlot:true,
    hasFloor:false
  },
  'PUBLICSPACE-IndependentProperty':{
    path:"PropertyTaxPay/PublicSpaceIndependantProperty",
    plotForm:formHoc({ formKey: "plotDetails",path:"PropertyTaxPay/PublicSpaceIndependantProperty"})(GenericForm),
    floorForm:formHoc({ formKey: "floorDetails",makeCopy:true,path:"PropertyTaxPay/PublicSpaceIndependantProperty"})(GenericForm),
    floorObject:{ formKey: "floorDetails",makeCopy:true,copyName:"floorDetails",path:"PropertyTaxPay/PublicSpaceIndependantProperty"},
    hasPlot:true,
    hasFloor:true
  },
  'COMMON-VACANT':{
    path:"PropertyTaxPay/CommonVacantLandProperty",
    plotForm:formHoc({ formKey: "plotDetails",path:"PropertyTaxPay/CommonVacantLandProperty"})(GenericForm),
    hasPlot:true,
    hasFloor:false
  }
};


export const getPlotAndFloorFormConfigPath =(usage,propertyType)=>{
  return combinationToFormkeyMapping.hasOwnProperty(`${usage}-${propertyType}`)?combinationToFormkeyMapping[`${usage}-${propertyType}`]:combinationToFormkeyMapping['COMMON-VACANT'];
}
