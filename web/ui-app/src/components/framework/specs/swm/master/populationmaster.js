var dat ={
'swm.search': {

  preApiCalls: [
    {
      url: "/tenant/v1/tenant/_search",
      jsonPath: "ulbs",
      jsExpForDD: {
        key: "$..tenant.*.code",
        value: "$..tenant.*.name",
      }
    }

  ],



    numCols: 4,
    useTimestamp: true,
    objectName: 'Population',
    title: 'swm.populationmaster.search.title',
    url: '/egov-mdms-service/v1/_get?tenantId=default&moduleName=swm&masterName=Population',



    groups: [

      {

        name: 'populationLocation',
        label: 'swm.toiletmaster.create.populationLocation',
        fields: [
          {
            "type": "boundary",
            "label": "",
            "hierarchyType": "REVENUE",
            "jsonPath": 'location.code',
            "isRequired": false,
            "patternErrorMsg": "",
            "multiple": true,
            "fullWidth": true,
          },
        ],
      }, 
    {
    name: 'PopulationDetails',
    label: 'swm.populationmaster.create.group.title.PopulationDetails',
    jsonPath: '',
    fields:[
    
          {
            name : 'ulb',
            label : 'swm.populationmaster.create.ulb',
            type: 'autoCompelete',
            jsonPath: "ulb.code",
            isRequired: false,
            isDisabled: false,
            //defaultValue:'Autocomplete',
            patternErrorMsg: '',
        url: '/egov-mdms-service/v1/_get?&moduleName=tenant&masterName=tenants|$..tenants.*.code|$..tenants.*.name',

        },

      // name : 'ulb',
      // label : 'swm.populationmaster.create.ulb',
      // jsonPath: "MasterMetaData.masterData[0].ulb.code",
      // type : 'singleValueList',
      // isRequired: true,
      // isDisabled: false,
      // defaultValue: 'Autocomplete',
      // url: '/egov-mdms-service/v1/_get?&moduleName=tenant&masterName=tenants|$..tenants.*.code|$..tenants.*.name',
      // patternErrorMsg: '',

        ], 
      },
        
   
    ],
    result: {
      header: [
        {
          label: 'swm.populationmaster.create.Census',
        },
        {
          label: 'swm.populationmaster.create.populationEstimate',
        },
        {
            label: 'swm.populationmaster.create.GarbageToCollect',
        },
        {
            label: 'swm.populationmaster.create.ulb',
        },
      ],
      values: [
      'censusYear',
        'population',
      'garbageToBeCollected',
        { jsonPath: 'ulb.code', reduxObject: "ulbs", isObj: true, cToN: true },

      //'ulb.code',
      ],
      resultPath: 'MdmsRes.swm.Population',
      rowClickUrlUpdate: '/update/swm/populationmaster/{code}',
      rowClickUrlView: '/view/swm/populationmaster/{code}',
      isMasterScreen: true
    },
    },
'swm.view': {
    numCols: 3,
    useTimestamp: true,
    objectName: 'Population',
    title: 'swm.populationmaster.create.title',
    url: '/egov-mdms-service/v1/_search?code={code}',
    groups:[
    {
        name: 'PopulationDetails',
        label: 'swm.populationmaster.create.group.title.PopulationDetails',
        jsonPath: '',
        fields:[
        {
            name : 'ulb',
            label : 'swm.populationmaster.create.ulb',
            jsonPath: 'MdmsRes.swm.Population["0"].ulb.code',
            type : 'label',
            isRequired: true,
            isDisabled: false,
            defaultValue:'Autocomplete',
            url: '/egov-mdms-service/v1/_get?&moduleName=tenant&masterName=tenants|$..tenants.*.code|$..tenants.*.name',

            patternErrorMsg: '',

        },
        // {
        //     name: 'Ward',
        //     label: 'swm.populationmaster.create.ward',
        //     jsonPath: "population.ward",
        //     type: 'label',
        //     isRequired: false,
        //     isDisabled: false,
        //     patternErrorMsg: '',
            
        //   },
        //   {
        //     name: 'Zone', 
        //     label: 'swm.populationmaster.create.Zone',
        //     type: 'label',
        //     jsonPath: "population.zone",
        //     isRequired: false,
        //     isDisabled: false,
        //     patternErrorMsg: '',
            
        //   },
          {
            name: 'Census',
            label: 'swm.populationmaster.create.Census',
            type: 'label',
            jsonPath: 'MdmsRes.swm.Population["0"].censusYear',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
           {
            name: 'populationEstimate',
            label: 'swm.populationmaster.create.populationEstimate',
            type: 'label',
            jsonPath: 'MdmsRes.swm.Population["0"].population',
            isRequired: true,
            isDisabled: false, 
            patternErrorMsg: '',
          },
          {
            name: 'GarbageToCollect',
            label: 'swm.populationmaster.create.GarbageToCollect',
            type: 'label',
            jsonPath: 'MdmsRes.swm.Population["0"].garbageToBeCollected',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          
        ],  
    }, 
      {

        name: 'populationLocation',
        label: 'swm.toiletmaster.create.populationLocation',
        fields: [
          {
            "type": "boundary",
            "label": "",
            "hierarchyType": "REVENUE",
            "jsonPath": 'MdmsRes.swm.Population["0"].location.code',
            "isRequired": true,
            "patternErrorMsg": "",
            "multiple": true,
            "fullWidth": true,
          },
          {
            name: 'code',
            jsonPath: 'MasterMetaData.masterData[0].code',
            defaultValue: 'Population-' + new Date().getTime(),
            isRequired: true,
            type: 'text',
            hide: true,
          },
          {
            name: 'tenantId',
            jsonPath: 'MasterMetaData.masterData[0].tenantId',
            type: 'text',
            defaultValue: localStorage.getItem("tenantId"),
            hide: true
          },
          {
            name: 'moduleName',
            jsonPath: 'MasterMetaData.moduleName',
            type: 'text',
            defaultValue: 'swm',
            hide: true
          },
          {
            name: 'masterName',
            jsonPath: 'MasterMetaData.masterName',
            type: 'text',
            defaultValue: 'Population',
            hide: true
          },


        ],
      },

      
    ], 
},

'swm.update': {
    numCols: 3,
    useTimestamp: true,
    objectName: 'Population',
    title: 'swm.populationmaster.create.title',
    url: '/egov-mdms-create/v1/_update',
    searchUrl: '/egov-mdms-service/v1/_search?code={code}',
    idJsonPath: 'MasterMetaData.masterData[0].code',

    groups:[
    {
        name: 'PopulationDetails',
        label: 'swm.populationmaster.create.group.title.PopulationDetails',
        jsonPath: '',
        fields:[
        {
            name : 'ulb',
            label : 'swm.populationmaster.create.ulb',
            jsonPath: "MasterMetaData.masterData[0].ulb.code",
            type : 'autoCompelete',
            isRequired: true,
            isDisabled: false,
           // defaultValue:'Autocomplete',
            url: '/egov-mdms-service/v1/_get?&moduleName=tenant&masterName=tenants|$..tenants.*.code|$..tenants.*.name',

            patternErrorMsg: '',

        },
        // {
        //     name: 'Ward',
        //     label: 'swm.populationmaster.create.ward',
        //     jsonPath: "population.ward",
        //     type: 'singleValueList',
        //     isRequired: false,
        //     isDisabled: false,
        //     patternErrorMsg: '',
            
        //   },
        //   {
        //     name: 'Zone', 
        //     label: 'swm.populationmaster.create.Zone',
        //     type: 'singleValueList',
        //     jsonPath: "population.zone",
        //     isRequired: false,
        //     isDisabled: false,
        //     patternErrorMsg: '',
            
        //   },
          {
            name: 'Census',
            label: 'swm.populationmaster.create.Census',
            type: 'text',
            jsonPath: "MasterMetaData.masterData[0].censusYear",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
           {
            name: 'populationEstimate',
            label: 'swm.populationmaster.create.populationEstimate',
            type: 'text',
             jsonPath: "MasterMetaData.masterData[0].population",
            isRequired: true,
            isDisabled: false, 
            patternErrorMsg: '',
          },
          {
            name: 'GarbageToCollect',
            label: 'swm.populationmaster.create.GarbageToCollect',
            type: 'text',
            jsonPath: "MasterMetaData.masterData[0].garbageToBeCollected",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          
        ],  
    }, 
      {

        name: 'populationLocation',
        label: 'swm.toiletmaster.create.populationLocation',
        fields: [
          {
            "type": "boundary",
            "label": "",
            "hierarchyType": "REVENUE",
            "jsonPath": 'MasterMetaData.masterData[0].location.code',
            "isRequired": true,
            "patternErrorMsg": "",
            "multiple": true,
            "fullWidth": true,
          },
          {
            name: 'code',
            jsonPath: 'MasterMetaData.masterData[0].code',
            defaultValue: 'Population-' + new Date().getTime(),
            isRequired: true,
            type: 'text',
            hide: true,
          },
          {
            name: 'tenantId',
            jsonPath: 'MasterMetaData.masterData[0].tenantId',
            type: 'text',
            defaultValue: localStorage.getItem("tenantId"),
            hide: true
          },
          {
            name: 'moduleName',
            jsonPath: 'MasterMetaData.moduleName',
            type: 'text',
            defaultValue: 'swm',
            hide: true
          },
          {
            name: 'masterName',
            jsonPath: 'MasterMetaData.masterName',
            type: 'text',
            defaultValue: 'Population',
            hide: true
          },


        ],
      },
      
    ], 
  tenantIdRequired: true,
  isMDMSScreen: true,
},


'swm.create': {
    numCols: 3,
    useTimestamp: true,
  objectName: 'MasterMetaData',
  idJsonPath: 'MdmsRes.swm.Population[0].code',
    title: 'swm.populationmaster.create.title',
    groups:[
    {
    name: 'PopulationDetails',
    label: 'swm.populationmaster.create.group.title.PopulationDetails',
    jsonPath: '',
    fields:[
        {
            name : 'ulb',
            label : 'swm.populationmaster.create.ulb',
            jsonPath: "MasterMetaData.masterData[0].ulb.code",
            type : 'autoCompelete',
            isRequired: true,
            isDisabled: false,
           
            url: '/egov-mdms-service/v1/_get?&moduleName=tenant&masterName=tenants|$..tenants.*.code|$..tenants.*.name',
            patternErrorMsg: '',

        },
  
          {
            name: 'Census',
            label: 'swm.populationmaster.create.Census',
           // type: 'singleValueList',
           type:'text',
            jsonPath: "MasterMetaData.masterData[0].censusYear",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
           {
            name: 'populationEstimate',
            label: 'swm.populationmaster.create.populationEstimate',
            //type: 'singleValueList',
            type:'text',
             jsonPath: "MasterMetaData.masterData[0].population",
            isRequired: true,
            isDisabled: false, 
            patternErrorMsg: '',
          },
          {
            name: 'GarbageToCollect',
            label: 'swm.populationmaster.create.GarbageToCollect',
           // type: 'singleValueList',
           type:'text',
            jsonPath: "MasterMetaData.masterData[0].garbageToBeCollected",
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          
        ],  
    }, 
      {

        name: 'populationLocation',
        label: 'swm.toiletmaster.create.populationLocation',
        fields: [
          {
            "type": "boundary",
            "label": "",
            "hierarchyType": "REVENUE",
            "jsonPath": 'MasterMetaData.masterData[0].location.code',
            "isRequired": true,
            "patternErrorMsg": "",
            "multiple": true,
            "fullWidth": true,
          },
          {
            name: 'code',
            jsonPath: 'MasterMetaData.masterData[0].code',
            defaultValue: 'Population-' + new Date().getTime(),
            isRequired: true,
            type: 'text',
            hide: true,
          },
          {
            name: 'tenantId',
            jsonPath: 'MasterMetaData.masterData[0].tenantId',
            type: 'text',
            defaultValue: localStorage.getItem("tenantId"),
            hide: true
          },
          {
            name: 'moduleName',
            jsonPath: 'MasterMetaData.moduleName',
            type: 'text',
            defaultValue: 'swm',
            hide: true
          },
          {
            name: 'masterName',
            jsonPath: 'MasterMetaData.masterName',
            type: 'text',
            defaultValue: 'Population',
            hide: true
          },


        ],
      },

      
    ],
  url: '/egov-mdms-create/v1/_create',
  tenantIdRequired: true 
},

};
export default dat;