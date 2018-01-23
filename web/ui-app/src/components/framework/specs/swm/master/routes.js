const routeValidation =   `
  

  const calculateTotal = () => {
    const distArr = JP.query(formData, '$..collectionPoints.*.distance');
    const garbageArr = JP.query(formData, '$..collectionPoints.*.garbageEstimate');
    let totalDist = 0, totalGarbage=0;
    distArr.forEach((i) => {
      totalDist = totalDist + parseInt(i);
    });
    garbageArr.forEach((i) => {
      totalGarbage = totalGarbage+ parseInt(i);
    });

    self.setVal("routes[0].totalDistance", totalDist);
    self.setVal("routes[0].totalGarbageEstimate", totalGarbage);
  }

  // dynamically figure out the index
  const setStartPointDistance = (property) => {
    const index = self.indexFinder(property);
    const jsonPath = 'routes[0].collectionPoints['+index+'].distance';
    const val = self.getVal(property);
    if(val === 'Starting Point') {
      self.setVal(jsonPath, 0);
    }
  }

  const validateTypeOfPoint = (property) => {
    const {formData,displayError} = self.props;

    const startingCollectionPoints = JP.query(formData, '$..typeOfPoint');
    
    const count = startingCollectionPoints.reduce((acc, item) => {
      acc[item] = acc[item] ? acc[item] + 1 : 1;
      return acc;
    }, {});

    for(var i=0;i<startingCollectionPoints.length;i++){
      const jsonPath = 'routes[0].collectionPoints['+i+'].typeOfPoint';
      displayError(jsonPath,"")
    }

    let errorMessage = "";
    
    Object.keys(count).forEach(key => {
      switch (key) {
        case "Starting Point":
          if (count[key] > 1) {
            errorMessage = "Starting point cannot be selected more than once";
          }
          break;
        case "Ending Dumping Ground point":
          if (count[key]>1) {
            errorMessage = "Ending Dumping Ground Point cannot be selected more than once";
          }
          if (count["Ending Collection Point"]) {
            errorMessage = "Route End Point can not be both Collection point and Dumping Ground.";
          }
          break;
        case "Ending Collection Point":
          if (count[key]>1) {
            errorMessage = "Ending collection Point cannot be selected more than once";
          }
          break;
      }
    });
    if(property.indexOf('typeOfPoint') !== -1) {
      displayError(property,errorMessage);
    }
  } 

  const toggleDumpingGround = (property) => {
    let _mockData = {...mockData}
    const index = self.indexFinder(property);
    if(property.indexOf('typeOfPoint') !== -1) {
      const val = self.getVal(property);
      if(val === 'Ending Dumping Ground point') {
        var groupArr = _mockData[moduleName + "." + actionName].groups;
        for(var i=0; i<groupArr.length; i++) {
          if(groupArr[i].name == 'defineRoute') {
            for(var j=0; j<groupArr[i].fields.length; j++) {
              if(groupArr[i].fields[j].jsonPath == 'routes[0].collectionPoints['+index+'].dumpingGround.code') {
                groupArr[i].fields[j].isDisabled = false;
              }
              if(groupArr[i].fields[j].jsonPath == 'routes[0].collectionPoints['+index+'].collectionPoint.code') {
                groupArr[i].fields[j].isDisabled = true;
                self.setVal('routes[0].collectionPoints['+index+'].collectionPoint', null);
              }
              if(groupArr[i].fields[j].type == 'boundary') {
                groupArr[i].fields[j].isRequired = false;
                delRequiredFields(groupArr[i].fields[j].jsonPath);
              }
            }
          }
        }
      }
      else {
        var groupArr = _mockData[moduleName + "." + actionName].groups;
        for(var i=0; i<groupArr.length; i++) {
          if(groupArr[i].name == 'defineRoute') {
            for(var j=0; j<groupArr[i].fields.length; j++) {
              if(groupArr[i].fields[j].jsonPath == 'routes[0].collectionPoints['+index+'].dumpingGround.code') {
                groupArr[i].fields[j].isDisabled = true;
                self.setVal('routes[0].collectionPoints['+index+'].dumpingGround', null);
              }
              if(groupArr[i].fields[j].jsonPath == 'routes[0].collectionPoints['+index+'].collectionPoint.code') {
                groupArr[i].fields[j].isDisabled = false;
              }
              if(groupArr[i].fields[j].type == 'boundary') {
                groupArr[i].fields[j].isRequired = true;
              }
            }
          }
        }
      }
      setMockData(_mockData);
    }
  }
  
  calculateTotal(property);setStartPointDistance(property);validateTypeOfPoint(property);toggleDumpingGround(property);`

const modifyFormData = `
  const modifyFormData = () => {
    let _formData = {...formData};
    if(_formData.routes) {

      for(var i=0; i<_formData.routes[0].collectionPoints.length; i++) {
        const val = _formData.routes[0].collectionPoints[i].typeOfPoint;
        switch(val) {
          case "Starting Point":
            self.setVal('routes[0].collectionPoints['+i+'].isStartingCollectionPoint', true);
            self.setVal('routes[0].collectionPoints['+i+'].isEndingCollectionPoint', false);
            break;
          case "Route Stop":
            self.setVal('routes[0].collectionPoints['+i+'].isStartingCollectionPoint', false);
            self.setVal('routes[0].collectionPoints['+i+'].isEndingCollectionPoint', false);
            break;
          case "Ending Collection Point":
            self.setVal('routes[0].collectionPoints['+i+'].isStartingCollectionPoint', false);
            self.setVal('routes[0].collectionPoints['+i+'].isEndingCollectionPoint', true);
            break;
          case "Ending Dumping Ground point":
            self.setVal('routes[0].collectionPoints['+i+'].isStartingCollectionPoint', false);
            self.setVal('routes[0].collectionPoints['+i+'].isEndingCollectionPoint', false);
            break;
        }
      }
    }
  }
  modifyFormData();`

const setTypeOfPoint = `
  const setTypeOfPoint = (obj, res) => {
    let {mockData,moduleName, actionName} = self.props;
    if(res.routes && res.routes.length) {
      var jsonPathArr = JP.query((mockData[moduleName+'.'+actionName]), "$.groups..fields[?(@.name=='typeOfPoint')].jsonPath");
      for(var i=0; i<res.routes[0].collectionPoints.length; i++) {
        console.log(res.routes[0].collectionPoints);
        jsonPathArr.forEach((jP) => {
          let index = self.indexFinder(jP);
          if(index == i) {
            if(res.routes[0].collectionPoints[i].isEndingCollectionPoint == false && res.routes[0].collectionPoints[i].isStartingCollectionPoint) {
              _.set(res, jP, "Starting Point");
            }
            else if(res.routes[0].collectionPoints[i].isEndingCollectionPoint == true && res.routes[0].collectionPoints[i].isStartingCollectionPoint == false) {
              _.set(res, jP, "Ending Collection Point");
            }
            else if(res.routes[0].collectionPoints[i].isEndingCollectionPoint == false && res.routes[0].collectionPoints[i].isStartingCollectionPoint == false && res.routes[0].collectionPoints[i].dumpingGround && res.routes[0].collectionPoints[i].dumpingGround.code) {
              _.set(res, jP, "Ending Dumping Ground point");
            }
            else if(res.routes[0].collectionPoints[i].isEndingCollectionPoint == false && res.routes[0].collectionPoints[i].isStartingCollectionPoint == false) {
              _.set(res, jP, "Route Stop");
            }
          }
        });
      }
    }
  }
  setTypeOfPoint(obj, res);
`
const setTypeOfPointView = `
  const setTypeOfPointView = (res) => {
    let _mockData = {...self.props.mockData};
    let {moduleName, actionName} = self.props;
    if(res.routes && res.routes.length) {
      var jsonPathArr = JP.query((_mockData[moduleName+'.'+actionName]), "$.groups..fields[?(@.name=='typeOfPoint')].jsonPath");
      for(var i=0; i<res.routes[0].collectionPoints.length; i++) {
        jsonPathArr.forEach((jP) => {
          let index = self.indexFinder(jP);
          if(index == i) {
            if(res.routes[0].collectionPoints[i].isEndingCollectionPoint == false && res.routes[0].collectionPoints[i].isStartingCollectionPoint) {
              self.setVal(jP, "Starting Point");
            }
            else if(res.routes[0].collectionPoints[i].isEndingCollectionPoint == true && res.routes[0].collectionPoints[i].isStartingCollectionPoint == false) {
              self.setVal(jP, "Ending Collection Point");
            }
            else if(res.routes[0].collectionPoints[i].isEndingCollectionPoint == false && res.routes[0].collectionPoints[i].isStartingCollectionPoint == false && res.routes[0].collectionPoints[i].dumpingGround && res.routes[0].collectionPoints[i].dumpingGround.code) {
              self.setVal(jP, "Ending Dumping Ground point");
            }
            else if(res.routes[0].collectionPoints[i].isEndingCollectionPoint == false && res.routes[0].collectionPoints[i].isStartingCollectionPoint == false) {
              self.setVal( jP, "Route Stop");
            }
          }
        });
      }
    }
  }
  setTypeOfPointView(res);`

var dat = {
  'swm.create': {
    afterHandleChange: routeValidation,
    beforeSubmit: modifyFormData,
    numCols: 3,
    useTimestamp: true,
    idJsonPath: 'routes[0].code',
    objectName: 'routes',
    title: 'swm.routes.create.title',
    groups: [
      {
        name: 'routeDetails',
        label: '',
        fields: [
          {
            name: 'name',
            jsonPath: 'routes[0].name',
            label: 'swm.routes.create.name',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
            url:'/swm-services/routes/_search?|$.routes.*.code|$.routes.*.name',
          },
          {
            name: 'code',
            jsonPath: 'routes[0].collectionType.code',
            label: 'swm.routes.create.collectionType',
            type: 'singleValueList',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
            url:'/egov-mdms-service/v1/_get?&moduleName=swm&masterName=CollectionType|$..code|$..name',
          },
        ]
      },
      {
        name: 'defineRoute',
        label: 'swm.routes.create.group.title',
        jsonPath: "routes[0].collectionPoints",
        multiple: true,
        fields: [
          {
            "type": "boundary",
            "label": "",
            "hierarchyType": "REVENUE",
            "jsonPath": "routes[0].collectionPoints[0].collectionPoint.location.code",
            "isRequired": true,
            "patternErrorMsg": "",
            "fullWidth": true,
            depedants: [
              {
                jsonPath: 'routes[0].collectionPoints[0].collectionPoint.code',
                type: 'dropDown',
                pattern:
                '/swm-services/collectionpoints/_search?&locationCode={routes[0].collectionPoints[0].collectionPoint.location.code}|$..collectionPoints.*.code|$..collectionPoints.*.name',
              },
              {
                jsonPath: 'routes[0].collectionPoints[0].dumpingGround.code',
                type: 'dropDown',
                pattern:
                '/egov-mdms-service/v1/_get?&moduleName=swm&masterName=DumpingGround&filter%3D%5B%3F(%40.siteDetails.location.code%3D={routes[0].collectionPoints[0].collectionPoint.location.code})]|$..DumpingGround.*.code|$..DumpingGround.*.name',
              }
            ]
          },
          {
            name: 'typeOfPoint',
            jsonPath: 'routes[0].collectionPoints[0].typeOfPoint',
            label: 'Type Of Point',
            type: 'singleValueList',
            isRequired: true,
            isDisabled: false,
            defaultValue: [
              {
                key: 'Starting Point',
                value: 'Starting Point',
              },
              {
                key: 'Route Stop',
                value: 'Route Stop',
              },
              {
                key: 'Ending Dumping Ground point',
                value: 'Ending Dumping Ground point',
              },
              {
                key: 'Ending Collection Point',
                value: 'Ending Collection Point',
              }
            ],
          },
          {
            name: 'collectionPoint',
            jsonPath: 'routes[0].collectionPoints[0].collectionPoint.code',
            label: 'Collection Points',
            type: 'singleValueList',
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ''
          },
          {
            name: 'dumpingGround',
            jsonPath: 'routes[0].collectionPoints[0].dumpingGround.code',
            label: 'Dumping ground',
            type: 'singleValueList',
            isRequired: false,
            isDisabled: true,
            patternErrorMsg: '',
          },
          {
            name: 'startingCollectionPointDistance',
            jsonPath: 'routes[0].collectionPoints[0].distance',
            label: 'Distance From Last Stop(KMS)',
            type: 'number',
            add: true,
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'startingCollectionPointGarbageEstimate',
            jsonPath: 'routes[0].collectionPoints[0].garbageEstimate',
            label: 'Expected Garbage Collection(TONS)',
            type: 'number',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          }
        ],
      },
      {
        name: 'totalDistanceGarbageEstimate',
        label: '',
        fields: [
          {
            name: 'totalDistance',
            jsonPath: 'routes[0].totalDistance',
            label: 'Total Distance Covered(KMS)',
            type: 'number',
            total:true,
            isRequired: false,
            isDisabled: true,
            patternErrorMsg: '',
          },
          {
            name: 'totalGarbageEstimate',
            jsonPath: 'routes[0].totalGarbageEstimate',
            label: 'Total Expected Garbage(TONS)',
            type: 'number',
            isRequired: false,
            isDisabled: true,
            patternErrorMsg: '',
          },
        ],
      },
    ],
    url: '/swm-services/routes/_create',
    tenantIdRequired: true,
  },

  'swm.update': {
    numCols: 3,
    useTimestamp: true,
    beforeSetForm: setTypeOfPoint,
    objectName: 'routes',
    idJsonPath: 'routes[0].code',
    title: 'swm.routes.create.title',
    groups: [
      {
        name: 'routeDetails',
        label: '',
        fields: [
          {
            name: 'name',
            jsonPath: 'routes[0].name',
            label: 'swm.routes.create.name',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'code',
            jsonPath: 'routes[0].collectionType.code',
            label: 'swm.routes.create.collectionType',
            type: 'singleValueList',
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: '',
            url:'/egov-mdms-service/v1/_get?&moduleName=swm&masterName=CollectionType|$..code|$..name',
          },
        ]
      },
      {
        name: 'defineRoute',
        label: 'swm.routes.create.group.title',
        jsonPath: "routes[0].collectionPoints",
        multiple: true,
        fields: [
          {
            "type": "boundary",
            "label": "",
            "hierarchyType": "REVENUE",
            "jsonPath": "routes[0].collectionPoints[0].collectionPoint.location.code",
            "isRequired": true,
            "patternErrorMsg": "",
            "multiple": true,
            "fullWidth": true,
            depedants: [
              {
                jsonPath: 'routes[0].collectionPoints[0].collectionPoint.code',
                type: 'dropDown',
                pattern:
                  '/swm-services/collectionpoints/_search?&locationCode={routes[0].collectionPoints[0].collectionPoint.location.code}|$..collectionPoints.*.code|$..collectionPoints.*.name',
              },
              {
                jsonPath: 'routes[0].collectionPoints[0].dumpingGround.code',
                type: 'dropDown',
                pattern:
                '/egov-mdms-service/v1/_get?&moduleName=swm&masterName=DumpingGround&filter%3D%5B%3F(%40.siteDetails.location.code%3D={routes[0].collectionPoints[0].collectionPoint.location.code})]|$..DumpingGround.*.code|$..DumpingGround.*.name',
              }
            ]
          },
          {
            name: 'typeOfPoint',
            jsonPath: 'routes[0].collectionPoints[0].typeOfPoint',
            label: 'Type Of Point',
            type: 'singleValueList',
            isRequired: true,
            isDisabled: false,
            defaultValue: [
              {
                key: 'Starting Point',
                value: 'Starting Point',
              },
              {
                key: 'Route Stop',
                value: 'Route Stop',
              },
              {
                key: 'Ending Dumping Ground point',
                value: 'Ending Dumping Ground point',
              },
              {
                key: 'Ending Collection Point',
                value: 'Ending Collection Point',
              }
            ],
          },
          {
            name: 'collectionPoint',
            jsonPath: 'routes[0].collectionPoints[0].collectionPoint.code',
            label: 'Collection Points',
            type: 'singleValueList',
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ''
          },
          {
            name: 'dumpingGround',
            jsonPath: 'routes[0].collectionPoints[0].dumpingGround.code',
            label: 'Dumping ground',
            type: 'singleValueList',
            isRequired: false,
            isDisabled: true,
            patternErrorMsg: '',
          },
          {
            name: 'startingCollectionPointDistance',
            jsonPath: 'routes[0].collectionPoints[0].distance',
            label: 'Distance From Last Stop(KMS)',
            type: 'number',
            add: true,
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'startingCollectionPointGarbageEstimate',
            jsonPath: 'routes[0].collectionPoints[0].garbageEstimate',
            label: 'Expected Garbage Collection(TONS)',
            type: 'number',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          }
        ],
      },
      {
        name: 'totalDistanceGarbageEstimate',
        label: '',
        fields: [
          {
            name: 'totalDistance',
            jsonPath: 'routes[0].totalDistance',
            label: 'Total Distance Covered(KMS)',
            type: 'number',
            total:true,
            isRequired: false,
            isDisabled: true,
            patternErrorMsg: '',
          },
          {
            name: 'totalGarbageEstimate',
            jsonPath: 'routes[0].totalGarbageEstimate',
            label: 'Total Expected Garbage(TONS)',
            type: 'number',
            isRequired: false,
            isDisabled: true,
            patternErrorMsg: '',
          },
        ],
      },
    ],
    url: '/swm-services/routes/_update',
    tenantIdRequired: true,
    searchUrl: '/swm-services/routes/_search?code={code}',
  },

  'swm.view': {
    numCols: 3,
    afterSetForm: setTypeOfPointView,
    useTimestamp: true,
    objectName: 'routes',
    title: 'swm.routes.create.title',
    groups: [
      {
        name: 'routeDetails',
        label: '',
        fields: [
          {
            name: 'name',
            jsonPath: 'routes[0].name',
            label: 'swm.routes.create.name',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'code',
            jsonPath: 'routes[0].collectionType.code',
            label: 'swm.routes.create.collectionType',
            type: 'singleValueList',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
            url:'/egov-mdms-service/v1/_get?&moduleName=swm&masterName=CollectionType|$..code|$..name',
            // depedants: [
            //   {
            //     jsonPath: 'routes[0].startingCollectionPoint.name',
            //     type: 'autoFill',
            //     pattern: '/swm-services/routes/_search?tenantId=default&code={routes[0].collectionType.code}|$..code|$..name',
            //     autoFillFields: {
            //       'routes[0].startingCollectionPoint.name': 'startingCollectionPoint.name',
            //     },
            //   },
            //   {
            //     jsonPath: 'routes[0].startingCollectionPoint.location.name',
            //     type: 'autoFill',
            //     pattern: '/swm-services/routes/_search?tenantId=default&code={routes[0].collectionType.code}',
            //     autoFillFields: {
            //       'routes[0].startingCollectionPoint.location.name': 'location.name',
            //     },
            //   },
            //   {
            //     jsonPath: 'routes[0].collectionPoints[0].name',
            //     type: 'autoFill',
            //     pattern: '/swm-services/routes/_search?tenantId=default&code={routes[0].collectionType.code}',
            //     autoFillFields: {
            //       'routes[0].collectionPoints[0].name': 'collectionPoints[0].name',
            //     },
            //   },
            //   {
            //     jsonPath: 'routes[0].collectionPoints[0].location.name',
            //     type: 'autoFill',
            //     pattern: '/swm-services/routes/_search?tenantId=default&code={routes[0].collectionType.code}',
            //     autoFillFields: {
            //       'routes[0].collectionPoints[0].location.name': 'location.name',
            //     },
            //   },

            //   {
            //     jsonPath: 'routes[0].endingDumpingGroundPoint.name',
            //     type: 'autoFill',
            //     pattern: '/swm-services/routes/_search?tenantId=default&code={routes[0].collectionType.code}',
            //     autoFillFields: {
            //       'routes[0].endingDumpingGroundPoint.name': 'endingDumpingGroundPoint.name',
            //     },
            //   },

            //   {
            //     jsonPath: 'route[0].endingCollectionPoint.name',
            //     type: 'autoFill',
            //     pattern: '/swm-services/routes/_search?tenantId=default&code={routes[0].collectionType.code}',
            //     autoFillFields: {
            //       'route[0].endingCollectionPoint.name': 'endingCollectionPoint.name',
            //     },
            //   },
            //   {
            //     jsonPath: 'route[0].endingCollectionPoint.location.name',
            //     type: 'autoFill',
            //     pattern: '/swm-services/routes/_search?tenantId=default&code={routes[0].collectionType.code}',
            //     autoFillFields: {
            //       'route[0].endingCollectionPoint.location.name': 'location.name',
            //     },
            //   },

            // ]
          },
        ]
      },
      {
        name: 'defineRoute',
        label: 'swm.routes.create.group.title',
        jsonPath: "routes[0].collectionPoints",
        multiple: true,
        fields: [
          {
            "type": "boundary",
            "label": "",
            "hierarchyType": "REVENUE",
            "jsonPath": "routes[0].collectionPoints[0].collectionPoint.location.code",
            "isRequired": true,
            "patternErrorMsg": "",
            "multiple": true,
            "fullWidth": true,
            depedants: [
              {
                jsonPath: 'routes[0].routeCollectionPointMaps[0].collectionPoint.code',
                type: 'dropDown',
                pattern:
                  '/swm-services/collectionpoints/_search?&locationCode={routes[0].routeCollectionPointMaps[0].location.code}|$..code|$..name',
              },
            ]
          },
          {
            name: 'typeOfPoint',
            jsonPath: 'routes[0].collectionPoints[0].typeOfPoint',
            label: 'Type Of Point',
            type: 'singleValueList',
            isRequired: true,
            isDisabled: false,
            defaultValue: [
              {
                key: 'Starting Point',
                value: 'Starting Point',
              },
              {
                key: 'Route Stop',
                value: 'Route Stop',
              },
              {
                key: 'Ending Dumping Ground point',
                value: 'Ending Dumping Ground point',
              },
              {
                key: 'Ending Collection Point',
                value: 'Ending Collection Point',
              }
            ],
          },
          {
            name: 'collectionPoint',
            jsonPath: 'routes[0].collectionPoints[0].collectionPoint.name',
            label: 'Collection Points',
            type: 'singleValueList',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: ''
          },
          {
            name: 'dumpingGround',
            jsonPath: 'routes[0].collectionPoints[0].dumpingGround.code',
            label: 'Dumping ground',
            type: 'singleValueList',
            isRequired: true,
            isDisabled: true,
            patternErrorMsg: '',
            url: '/egov-mdms-service/v1/_get?&moduleName=swm&masterName=DumpingGround|$..DumpingGround.*.code|$..DumpingGround.*.name',
          },
          {
            name: 'startingCollectionPointDistance',
            jsonPath: 'routes[0].collectionPoints[0].distance',
            label: 'Distance From Last Stop(KMS)',
            type: 'number',
            add: true,
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'startingCollectionPointGarbageEstimate',
            jsonPath: 'routes[0].collectionPoints[0].garbageEstimate',
            label: 'Expected Garbage Collection(TONS)',
            type: 'number',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          }
        ],
      },
      {
        name: 'totalDistanceGarbageEstimate',
        label: '',
        fields: [
          {
            name: 'totalDistance',
            jsonPath: 'routes[0].totalDistance',
            label: 'Total Distance Covered(KMS)',
            type: 'number',
            total:true,
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'totalGarbageEstimate',
            jsonPath: 'routes[0].totalGarbageEstimate',
            label: 'Total Expected Garbage(TONS)',
            type: 'number',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
        ],
      },
    ],
    url: '/swm-services/routes/_search?code={code}',
    tenantIdRequired: true,
  },
 
  'swm.search':{
    numCols: 4,
    useTimestamp: true,
    objectName: 'routes',
    url: 'swm-services/routes/_search',
    groups: [
      {
        name: 'VehicleDetails1',
        label: 'swm.vehicles.search.title',
        fields: [
          {
            name: 'name',
            jsonPath: 'name',
            label: 'swm.routes.create.name',
            type: 'text',
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'endingDumpingGroundPointCode',
            jsonPath: 'endingDumpingGroundPointCode',
            label: 'swm.routes.create.dumping',
            type: 'text',
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'collectionPointCode',
            jsonPath: 'collectionPointCode',
            label: 'swm.routes.create.collectionPoint',
            type: 'text',
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: '',
          },
        ]
      }
    ],
    result: {
      header: [
        {
          label: 'swm.routes.search.result.name',
        },
        {
          label: 'swm.routes.search.result.collectionPoint',
        },
        {
          label: 'swm.routes.search.result.startingCollectionPoint',
        },
        {
          label: 'swm.routes.search.result.endingPoint',
        },
        {
          label: 'swm.routes.search.result.distance',
        }
      ],
      values: [
        'name',
        'collectionType.name',
        'startingCollectionPoint.name',
        'endingCollectionPoint.name',
        'distance'
      ],
      resultPath: 'routes',
      rowClickUrlUpdate: '/update/swm/routes/{code}',
      rowClickUrlView: '/view/swm/routes/{code}',
    }
  }
};
export default dat;