import {
   getCommonHeader,
   getCommonContainer,
   getCommonSubHeader
 } from "egov-ui-framework/ui-config/screens/specs/utils";

 const header = getCommonContainer({
   header: getCommonHeader({
     labelName: "How",
     labelKey: "NUS_How_LABEL"
   }),
   subheader: getCommonSubHeader({
       labelName: "Implementation Plan",
       labelKey: "NUS_IMPLEMENTATION_PLAN_COMMON_SUB_HEADER"
     }),
 });

 