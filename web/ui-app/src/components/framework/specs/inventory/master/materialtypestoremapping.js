var dat = {
    'inventory.search': {
        numCols: 4,
        useTimestamp: true,
        objectName: '',
        url: '/inventory-services/materialtypestoremapping/_search',
        customActionsAndUrl: [
            {
                actionName: 'Add',
                url: '/search/inventory/materialtype/',
            },
        ],

        groups: [
            {
                name: 'search',
                label: 'inventory.common.searchcriteria',
                fields: [
                    {
                        name: 'material',
                        pattern: '',
                        label: 'inventory.materialType.name',
                        type: 'autoCompelete',
                        jsonPath: 'material',
                        displayJsonPath: 'materialName',
                        isRequired: false,
                        isDisabled: false,
                        url:
                            '/egov-mdms-service/v1/_get?&moduleName=inventory&masterName=MaterialType|$.MdmsRes.inventory.MaterialType[*].code|$.MdmsRes.inventory.MaterialType[*].name',
                    },

                    {
                        name: 'store',
                        pattern: '',
                        label: 'inventory.store.name',
                        type: 'singleValueList',
                        jsonPath: 'store',
                        isRequired: false,
                        isDisabled: false,
                        url: 'inventory-services/stores/_search?|$.stores[*].code|$.stores[*].name',
                    },
                    // {
                    //     name: 'active',
                    //     jsonPath: 'active',
                    //     label: 'inventory.label.active',
                    //     type: 'checkbox',
                    //     defaultValue: true,
                    //     isRequired: false,
                    //     isDisabled: false,
                    //     patternErrorMsg: '',
                    // },
                ],
            },
        ],
        result: {
            header: [
                {
                    label: 'inventory.materialType.code',
                },
               
                {
                    label: 'inventory.store.code',
                },
                {
                    label: 'inventory.department.name',
                },
                {
                    label: 'inventory.stock.stockInHand'
                },
                {
                    label:'active'

                }
            ],
            values: ['materialType.code', 'store.code', 'store.department','chartofAccount.glcode', 'active'],
            resultPath: 'materialTypeStores',
            resultIdKey: 'id',
            rowClickUrlUpdate: '/update/inventory/materialtypestoremapping/{materialType.code}',
            rowClickUrlView: '/view/inventory/materialtypestoremapping/{materialType.code}',
            rowClickUrlAdd: '/create/inventory/materialtypestoremapping',
            rowClickUrlDelete: '',
        },
    },
    'inventory.create': {
        numCols: 4,
        useTimestamp: true,
        objectName: 'materialTypeStores',
        groups: [{

        },
            {
                name: 'Material Map To Store',
                label: 'inventory.create.group.title.MaterialType Map To Store',
                fields: [
                    {
                        name: 'department',
                        pattern: '',
                        type: 'singleValueList',
                        jsonPath: 'departmentMaster',
                        isRequired: false,
                        isDisabled: false,
                        hide: true,
                        url: '/egov-mdms-service/v1/_get?&moduleName=common-masters&masterName=Department|$..code|$..name',
                    },

                    {
                        type: 'tableList',
                        jsonPath: '',
                        tableList: {
                            header: [
                                {
                                    label: 'Material',
                                },
                                {
                                    label: 'Store Name',
                                },
                                {
                                    label: 'Department Name',
                                },
                                {
                                    label: 'Account Code',
                                },
                                {
                                    label: 'Active',
                                },
                            ],
                            values: [
                                {
                                    name: 'material',
                                    pattern: '',
                                    type: 'autoCompelete',
                                    jsonPath: 'materialType.code',
                                    displayJsonPath: 'materialStoreMappings[0].material.name',
                                    isRequired: true,
                                    isDisabled: false,
                                    url:
                                        '/egov-mdms-service/v1/_get?&moduleName=inventory&masterName=Material|$.MdmsRes.inventory.Material[*].code|$.MdmsRes.inventory.Material[*].name',
                                },
                                {
                                    name: 'store',
                                    pattern: '',
                                    type: 'singleValueList',
                                    jsonPath: 'store.code',
                                    isRequired: true,
                                    isDisabled: false,
                                    url: 'inventory-services/stores/_search?|$.stores[*].code|$.stores[*].name|$.stores[*].department',
                                    depedants: [
                                        {
                                            jsonPath: 'materialStoreMappings[0].department.code',
                                            type: 'textField',
                                            valExp:
                                                "getValFromDropdownData('materialStoreMappings[*].store.code', getVal('materialStoreMappings[*].store.code'), 'others[0].code')",
                                        },
                                        {
                                            jsonPath: 'materialStoreMappings[0].department.name',
                                            type: 'textField',
                                            valExp: "getValFromDropdownData('departmentMaster', getVal('materialStoreMappings[*].department.code'), 'value')",
                                        },
                                    ],
                                },
                                {
                                    name: 'department',
                                    pattern: '',
                                    type: 'text',
                                    jsonPath: 'department.name',
                                    isRequired: true,
                                    isDisabled: true,
                                },
                                {
                                    name: 'accountcode',
                                    pattern: '',
                                    type: 'singleValueList',
                                    jsonPath: 'chartofAccount.glCode',
                                    isRequired: true,
                                    isDisabled: false,
                                    url: '/egf-master/chartofaccounts/_search?|$.chartOfAccounts[*].glcode|$.chartOfAccounts[*].name',
                                },
                                {
                                    name: 'active',
                                    pattern: '',
                                    type: 'checkbox',
                                    defaultValue: true,
                                    label: '',
                                    jsonPath: 'active',
                                    isRequired: false,
                                    isDisabled: false,
                                },
                            ],
                        },
                    },
                ],
            },
        ],
        url: '/inventory-services/materials/_create',
        tenantIdRequired: true,
    },
    'inventory.view': {
        numCols: 4,
        useTimestamp: true,
        objectName: 'materialTypes',
        url: '/inventory-services/materialtypes/_update',
        title: 'inventory.materialtypestoremapping.title',
        searchUrl: '/inventory-services/materialtypes/_search?code={code}',
        groups: [
            {
                name: 'view Material type',
                label: 'inventory.create.group.title.viewmaterialType',
                fields: [


                    {
                        name: 'code',
                        jsonPath: 'materialTypes[0].code',
                        label: 'inventory.materialType.code',
                        type: 'text',
                        isRequired: true,
                        isDisabled: true,
                        patternErrorMsg: '',
                        url: '',
                    },

                    {
                        name: 'name',
                        jsonPath: 'materialTypes[0].name',
                        label: 'inventory.materialType.name',
                        type: 'text',
                        isRequired: true,
                        isDisabled: false,
                        patternErrorMsg: '',
                        url: '',
                    },

                    {
                        name: 'description',
                        jsonPath: 'materialTypes[0].description',
                        label: 'inventory.materialType.description',
                        type: 'textarea',
                        isRequired: true,
                        isDisabled: false,
                        maxLength: 1000,
                        patternErrorMsg: '',
                    },
                    {
                        name: 'ParentType',
                        pattern: '',
                        type: 'checkbox',
                        defaultValue: false,
                        label: 'inventory.materialType.parentType',
                        jsonPath: 'materialTypes[0].isParent',
                        isRequired: false,
                        isDisabled: false,
                        showHideFields: [
                            {
                                ifValue: true,
                                hide: [],
                                show: [
                                    {
                                        name: 'parent',
                                        isGroup: false,
                                        isField: true,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        name: 'active',
                        pattern: '',
                        type: 'checkbox',
                        defaultValue: true,
                        label: 'inventory.materialType.isActive',
                        jsonPath: 'materialTypes[0].active',
                        isRequired: false,
                        isDisabled: false,
                    },
                    {
                        name: 'parent',
                        jsonPath: 'materialTypes[0].parent',
                        label: 'inventory.materialType.parentName',
                        type: 'singleValueList',
                        isRequired: false,
                        isDisabled: false,
                        hide: true,
                        url: '/egov-mdms-service/v1/_get?&moduleName=inventory&masterName=MaterialType|$..code|$..name',
                        patternErrorMsg: '',
                    },



                ],
            },
            {
                name: 'MaterialType Map To Store',
                label: 'inventory.material.maptostore',
                fields: [
                    {
                        name: 'department',
                        pattern: '',
                        type: 'singleValueList',
                        jsonPath: 'departmentMaster',
                        isRequired: false,
                        isDisabled: false,
                        hide: true,
                        url: '/egov-mdms-service/v1/_get?&moduleName=common-masters&masterName=Department|$..code|$..name',
                    },

                    {
                        type: 'tableList',
                        jsonPath: 'materialtypes[0].storeMapping',
                        tableList: {
                            header: [
                                {
                                    label: 'Store Name',
                                },
                                {
                                    label: 'Department Name',
                                },
                                {
                                    label: 'Account Code',
                                },
                                {
                                    label: 'Active',
                                },
                            ],
                            values: [
                                {
                                    name: 'store',
                                    pattern: '',
                                    type: 'singleValueList',
                                    jsonPath: 'materialtypes[0].storeMapping[0].store.code',
                                    isRequired: true,
                                    isDisabled: false,
                                    url: 'inventory-services/stores/_search?|$.stores[*].code|$.stores[*].name|$.stores[*].department',
                                    depedants: [
                                        {
                                            jsonPath: 'materials[0].storeMapping[0].department.code',
                                            type: 'textField',
                                            valExp:
                                                "getValFromDropdownData('materials[0].storeMapping[*].store.code', getVal('materials[0].storeMapping[*].store.code'), 'others[0].code')",
                                        },
                                    
                                    ],
                                },
                                {
                                    name: 'department',
                                    pattern: '',
                                    type: 'singleValueList',
                                    jsonPath: 'materialtypes[0].storeMapping[0].store.department',
                                    isRequired: true,
                                    isDisabled: false,
                                    url: '/egov-mdms-service/v1/_get?&moduleName=common-masters&masterName=Department|$..code|$..name',
                                },
                                {
                                    name: 'accountcode',
                                    pattern: '',
                                    type: 'singleValueList',
                                    jsonPath: 'materialtypes[0].storeMapping[0].chartofAccount.glCode',
                                    isRequired: true,
                                    isDisabled: false,
                                    url: '/egf-master/chartofaccounts/_search?|$.chartOfAccounts[*].glcode|$.chartOfAccounts[*].name',
                                },
                                {
                                    name: 'active',
                                    pattern: '',
                                    type: 'checkbox',
                                    defaultValue: true,
                                    label: '',
                                    jsonPath: 'materialtypes[0].storeMapping[0].active',
                                    isRequired: false,
                                    isDisabled: false,
                                },
                            ],
                        },
                    },
                ],
            },
         
        ],

        tenantIdRequired: true,
    },
    'inventory.update': {
        numCols: 4,
        useTimestamp: true,
        objectName: 'materialTypes',
        url: '/inventory-services/materialtypes/_update',
        title: 'inventory.materialtypestoremapping.title',
        searchUrl: '/inventory-services/materialtypes/_search?code={code}',
        groups: [
            {
                name: 'Material Type',
                label: 'inventory.materialType.title',
                fields: [


                    {
                        name: 'code',
                        jsonPath: 'materialTypes[0].code',
                        label: 'inventory.materialType.code',
                        type: 'text',
                        isRequired: true,
                        isDisabled: true,
                        patternErrorMsg: '',
                        url: '',
                    },

                    {
                        name: 'name',
                        jsonPath: 'materialTypes[0].name',
                        label: 'inventory.materialType.name',
                        type: 'text',
                        isRequired: true,
                        isDisabled: true,
                        patternErrorMsg: '',
                        url: '',
                    },

                    {
                        name: 'description',
                        jsonPath: 'materialTypes[0].description',
                        label: 'inventory.materialType.description',
                        type: 'textarea',
                        isRequired: true,
                        isDisabled: true,
                        maxLength: 1000,
                        patternErrorMsg: '',
                    },
                    {
                        name: 'ParentType',
                        pattern: '',
                        type: 'checkbox',
                        defaultValue: false,
                        label: 'inventory.materialType.parentType',
                        jsonPath: 'materialTypes[0].isParent',
                        isRequired: false,
                        isDisabled: false,
                        showHideFields: [
                            {
                                ifValue: true,
                                hide: [],
                                show: [
                                    {
                                        name: 'parent',
                                        isGroup: false,
                                        isField: true,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        name: 'active',
                        pattern: '',
                        type: 'checkbox',
                        defaultValue: true,
                        label: 'inventory.materialType.isActive',
                        jsonPath: 'materialTypes[0].active',
                        isRequired: false,
                        isDisabled: false,
                    },
                    {
                        name: 'parent',
                        jsonPath: 'materialTypes[0].parent',
                        label: 'inventory.materialType.parentName',
                        type: 'singleValueList',
                        isRequired: false,
                        isDisabled: false,
                        hide: true,
                        url: '/egov-mdms-service/v1/_get?&moduleName=inventory&masterName=MaterialType|$..code|$..name',
                        patternErrorMsg: '',
                    },
                


                ],
            },
            {
                name: 'MaterialType Map To Store',
                label: 'inventory.material.maptostore',
                fields: [
                    {
                        name: 'department',
                        pattern: '',
                        type: 'singleValueList',
                        jsonPath: 'departmentMaster',
                        isRequired: false,
                        isDisabled: false,
                        hide: true,
                        url: '/egov-mdms-service/v1/_get?&moduleName=common-masters&masterName=Department|$..code|$..name',
                    },

                    {
                        type: 'tableList',
                        jsonPath: 'materialtypes[0].storeMapping',
                        tableList: {
                            header: [
                                {
                                    label: 'Store Name',
                                },
                                {
                                    label: 'Department Name',
                                },
                                {
                                    label: 'Account Code',
                                },
                                {
                                    label: 'Active',
                                },
                            ],
                            values: [
                                {
                                    name: 'store',
                                    pattern: '',
                                    type: 'singleValueList',
                                    jsonPath: 'materialtypes[0].storeMapping[0].store.code',
                                    isRequired: true,
                                    isDisabled: false,
                                    url: 'inventory-services/stores/_search?|$.stores[*].code|$.stores[*].name|$.stores[*].department',
                                    depedants: [
                                        {
                                            jsonPath: 'materials[0].storeMapping[0].department.code',
                                            type: 'textField',
                                            valExp:
                                                "getValFromDropdownData('materials[0].storeMapping[*].store.code', getVal('materials[0].storeMapping[*].store.code'), 'others[0].code')",
                                        },
                                        //  ,
                                        //  {
                                        //     "jsonPath":"materials[0].storeMapping[0].department.name",
                                        //     "type":"textField",
                                        //     "valExp":"getValFromDropdownData('departmentMaster', getVal('materials[0].storeMapping[*].department.code'), 'value')"
                                        //  }
                                    ],
                                },
                                {
                                    name: 'department',
                                    pattern: '',
                                    type: 'singleValueList',
                                    jsonPath: 'materialtypes[0].storeMapping[0].store.department',
                                    isRequired: true,
                                    isDisabled: false,
                                    url: '/egov-mdms-service/v1/_get?&moduleName=common-masters&masterName=Department|$..code|$..name',
                                },
                                {
                                    name: 'accountcode',
                                    pattern: '',
                                    type: 'singleValueList',
                                    jsonPath: 'materialtypes[0].storeMapping[0].chartofAccount.glCode',
                                    isRequired: true,
                                    isDisabled: false,
                                    url: '/egf-master/chartofaccounts/_search?|$.chartOfAccounts[*].glcode|$.chartOfAccounts[*].name',
                                },
                                {
                                    name: 'active',
                                    pattern: '',
                                    type: 'checkbox',
                                    defaultValue: true,
                                    label: '',
                                    jsonPath: 'materialtypes[0].storeMapping[0].active',
                                    isRequired: false,
                                    isDisabled: false,
                                },
                            ],
                        },
                    },
                ],
            },
           /*  {
                name: 'Puchasing Information',
                label: 'inventory.create.group.title.Puchasing Information',
                fields: [
                    {
                        name: 'code',
                        jsonPath: 'materials[0].purchaseUom.code',
                        label: 'inventory.create.code',
                        type: 'text',
                        isRequired: false,
                        isDisabled: false,
                        patternErrorMsg: '',
                        url: '/egov-mdms-service/v1/_get?&moduleName=common-masters&masterName=Uom|$..code|$..code',
                    },
                    {
                        name: 'glCode',
                        jsonPath: 'materials[0].expenseAccount.glCode',
                        label: 'inventory.create.glCode',
                        type: 'text',
                        isRequired: false,
                        isDisabled: false,
                        patternErrorMsg: '',
                    },
                ],
            },
            {
                name: 'Stocking Information',
                label: 'inventory.create.group.title.Stocking Information',
                fields: [
                    {
                        name: 'materialClass',
                        jsonPath: 'materials[0].materialClass',
                        label: 'inventory.create.materialClass',
                        type: 'singleValueList',
                        isRequired: true,
                        isDisabled: false,
                        patternErrorMsg: '',
                    },
                    {
                        name: 'name',
                        jsonPath: 'materials[0].staockingUom.name',
                        label: 'inventory.create.name',
                        type: 'singleValueList',
                        isRequired: false,
                        isDisabled: false,
                        patternErrorMsg: '',
                    },
                    {
                        name: 'minQuantity',
                        jsonPath: 'materials[0].minQuantity',
                        label: 'inventory.create.minQuantity',
                        type: 'number',
                        isRequired: true,
                        isDisabled: false,
                        patternErrorMsg: '',
                    },
                    {
                        name: 'maxQuantity',
                        jsonPath: 'materials[0].maxQuantity',
                        label: 'inventory.create.maxQuantity',
                        type: 'number',
                        isRequired: true,
                        isDisabled: false,
                        patternErrorMsg: '',
                    },
                    {
                        name: 'reorderLevel',
                        jsonPath: 'materials[0].reorderLevel',
                        label: 'inventory.create.reorderLevel',
                        type: 'number',
                        isRequired: true,
                        isDisabled: false,
                        patternErrorMsg: '',
                    },
                    {
                        name: 'reorderQuantity',
                        jsonPath: 'materials[0].reorderQuantity',
                        label: 'inventory.create.reorderQuantity',
                        type: 'number',
                        isRequired: true,
                        isDisabled: false,
                        patternErrorMsg: '',
                    },
                    {
                        name: 'materialControlType',
                        jsonPath: 'materials[0].materialControlType',
                        label: 'inventory.create.materialControlType',
                        type: 'singleValueList',
                        isRequired: true,
                        isDisabled: false,
                        patternErrorMsg: '',
                    },
                ],
            },
            {
                name: 'Specification',
                label: 'inventory.create.group.title.Specification',
                fields: [
                    {
                        name: 'model',
                        jsonPath: 'materials[0].model',
                        label: 'inventory.create.model',
                        type: 'text',
                        isRequired: false,
                        isDisabled: false,
                        patternErrorMsg: '',
                    },
                    {
                        name: 'manufacturePartNo',
                        jsonPath: 'materials[0].manufacturePartNo',
                        label: 'inventory.create.manufacturePartNo',
                        type: 'text',
                        isRequired: false,
                        isDisabled: false,
                        patternErrorMsg: '',
                    },
                    {
                        name: 'techincalSpecs',
                        jsonPath: 'materials[0].techincalSpecs',
                        label: 'inventory.create.techincalSpecs',
                        type: 'text',
                        isRequired: false,
                        isDisabled: false,
                        patternErrorMsg: '',
                    },
                    {
                        name: 'termsOfDelivery',
                        jsonPath: 'materials[0].termsOfDelivery',
                        label: 'inventory.create.termsOfDelivery',
                        type: 'text',
                        isRequired: false,
                        isDisabled: false,
                        patternErrorMsg: '',
                    },
                ],
            }, */
        ],
        
        tenantIdRequired: true,
        },
};
export default dat;