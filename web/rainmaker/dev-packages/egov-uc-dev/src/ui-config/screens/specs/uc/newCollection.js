import {
    getCommonHeader,
    //getBreak
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { newCollectionDetailsCard } from "./newCollectionResource/newCollectionDetails";
import { newCollectionFooter } from "./newCollectionResource/newCollectionFooter"

const header = getCommonHeader({
    labelName: "New Collection",
    labelKey: "UC_COMMON_HEADER"
});

const newCollection = {
    uiFramework: "material-ui",
    name: "newCollection",
    components: {
        div: {
            uiFramework: "custom-atoms",
            componentPath: "Form",
            props: {
                className: "common-div-css",
                id: "newCollection"
            },
            children: {
                headerDiv: {
                    uiFramework: "custom-atoms",
                    componentPath: "Container",

                    children: {
                        header: {
                            gridDefination: {
                                xs: 12,
                                sm: 6
                            },
                            ...header
                        }
                    }
                },
                newCollectionDetailsCard,
                newCollectionFooter,
            }
        },
    }
};

export default newCollection;
