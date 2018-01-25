const routeValidation =   `
  
  const calculateTotal = () => {
    const distArr = JP.query(formData, '$..collectionPoints.*.distance');
    const garbageArr = JP.query(formData, '$..collectionPoints.*.garbageEstimate');
    let totalDist = 0, totalGarbage=0;
    distArr.forEach((i) => {
      totalDist = totalDist + parseFloat(i);
    });
    garbageArr.forEach((i) => {
      totalGarbage = totalGarbage+ parseFloat(i);
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
              if(groupArr[i].fields[j].jsonPath.replace("endPoint.","") == 'routes[0].collectionPoints['+index+'].dumpingGround.code') {
                groupArr[i].fields[j].isDisabled = false;
              }
              if(groupArr[i].fields[j].jsonPath.replace("endPoint.","") == 'routes[0].collectionPoints['+index+'].collectionPoint.code') {
                groupArr[i].fields[j].isDisabled = true;
                self.setVal('routes[0].collectionPoints['+index+'].collectionPoint', null);
              }
              if(groupArr[i].fields[j].type == 'boundary') {
                groupArr[i].fields[j].isRequired = false;
                delRequiredFields(groupArr[i].fields[j].jsonPath.replace("endPoint.",""));
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
              if(groupArr[i].fields[j].jsonPath.replace("endPoint.","") == 'routes[0].collectionPoints['+index+'].dumpingGround.code') {
                groupArr[i].fields[j].isDisabled = true;
                // self.setVal('endPOint.routes[0].collectionPoints['+index+'].dumpingGround', null);
              }
              if(groupArr[i].fields[j].jsonPath.replace("endPoint.","") == 'routes[0].collectionPoints['+index+'].collectionPoint.code') {
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

  const setStartEndPoint = () => {
    // let _formData = {..._formData};
    let indArr = [];
    for(var i=0; i<_formData.routes[0].collectionPoints.length; i++) {
      if((_formData.routes[0].collectionPoints[i].typeOfPoint == "Starting Point") 
      || _formData.routes[0].collectionPoints[i].typeOfPoint == "Ending Collection Point"
      || _formData.routes[0].collectionPoints[i].typeOfPoint == "Ending Dumping Ground point") {
        indArr.push(i);
      }
    }
    indArr.sort(function(a,b){ return b - a; });
    for(var i=0; i<indArr.length; i++) {
      _formData.routes[0].collectionPoints.splice(indArr[i],1);
    }
    _formData.routes[0].collectionPoints.push(_formData.startPoint.routes[0].collectionPoints[0]);
    _formData.routes[0].collectionPoints.push(_formData.endPoint.routes[0].collectionPoints[0]);
    delete _formData["startPoint"];
    delete _formData["endPoint"];
    this.props.setFormData(_formData);
  }

  const calculateTotal = () => {
    const distArr = JP.query(_formData, '$..collectionPoints.*.distance');
    const garbageArr = JP.query(_formData, '$..collectionPoints.*.garbageEstimate');
    let totalDist = 0, totalGarbage=0;
    distArr.forEach((i) => {
      totalDist = totalDist + parseFloat(i);
    });
    garbageArr.forEach((i) => {
      totalGarbage = totalGarbage+ parseFloat(i);
    });

    self.setVal("routes[0].totalDistance", totalDist);
    self.setVal("routes[0].totalGarbageEstimate", totalGarbage);
  }
  setStartEndPoint();calculateTotal();modifyFormData();`

const setTypeOfPoint = `
  const setTypeOfPoint = (obj, res) => {
    let {mockData,moduleName, actionName} = self.props;
    if(res.routes && res.routes.length) {
      var jsonPathArr = JP.query((mockData[moduleName+'.'+actionName]), "$.groups..fields[?(@.name=='typeOfPoint')].jsonPath");
      for(var i=0; i<res.routes[0].collectionPoints.length; i++) {
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
              let jPathToSplit1 = "routes[0].collectionPoints[" +i+ "].collectionPoint.code";
              let jPathToSplit2 = "routes[0].collectionPoints[" +i+ "].dumpingGround.code";
              // var jPath = JP.paths(self.props.mockData[self.props.moduleName+"."+self.props.actionName], "$..fields[?(@.jsonPath=='routes[0].collectionPoints["+i+"].collectionPoint.code')]");
              // var jsonPath = "";
              // var temp = [];
              // var tempJpath = jPath;
              // tempJpath.splice(0,1);
              
              // for(var j = 0; j < tempJpath.length;){
              //   temp.push(tempJpath[j] + "[" + tempJpath[j + 1] + "]");
              //   j+=2;
              // }
              
              // jsonPath = temp.join(".");
              
              // console.log("ss",jsonPath);
              
              self.setPropertyInMockData(mockData[moduleName+'.'+actionName], jPathToSplit1, "isDisabled",true);
              self.setPropertyInMockData(mockData[moduleName+'.'+actionName], jPathToSplit2, "isDisabled",false);
              self.props.setMockData(mockData);
              console.log(mockData);
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

  const getDumpingLocation=(res) => {
    var jsonPathArr = JP.query((self.props.mockData[self.props.moduleName+'.'+self.props.actionName]), "$.groups..fields[?(@.name=='dumpingGround')].jsonPath");
    jsonPathArr.forEach((item) => {
      if(self.getVal(item)) {
        var ind = self.indexFinder(item);
        let jPath = "routes[0].collectionPoints["+ind+"].dumpingGround.siteDetails.location.code"
        self.setVal("routes[0].collectionPoints["+ind+"].collectionPoint.location.code", self.getVal(jPath));
      }
    })
  }
setTypeOfPointView(res);getDumpingLocation(res);`

const getDumpingLocationUpdate= `
  const getDumpingLocation=(res) => {
    var jsonPathArr = JP.query((self.props.mockData[self.props.moduleName+'.'+self.props.actionName]), "$.groups..fields[?(@.name=='dumpingGround')].jsonPath");
    jsonPathArr.forEach((item) => {
      if(_.get(res, item)) {
        var ind = self.indexFinder(item);
        self.setVal("routes[0].collectionPoints["+ind+"].collectionPoint.location.code", _.get(res, "routes[0].collectionPoints["+ind+"].dumpingGround.siteDetails.location.code"));
        console.log(self.props.formData);
      }
    })
  }
getDumpingLocation(res);`

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
        name: 'defineRoute1',
        label: 'swm.routes.create.startPointgroup.title',
        jsonPath: "startPoint.routes[0].collectionPoints",
        fields: [
          {
            "type": "boundary",
            "label": "",
            "hierarchyType": "REVENUE",
            "jsonPath": "startPoint.routes[0].collectionPoints[0].collectionPoint.location.code",
            "isRequired": true,
            "patternErrorMsg": "",
            "isDisabled": false,
            "fullWidth": true,
            depedants: [
              {
                jsonPath: 'startPoint.routes[0].collectionPoints[0].collectionPoint.code',
                type: 'dropDown',
                pattern:
                '/swm-services/collectionpoints/_search?&locationCode={startPoint.routes[0].collectionPoints[0].collectionPoint.location.code}|$..collectionPoints.*.code|$..collectionPoints.*.name',
              },
              {
                jsonPath: 'startPoint.routes[0].collectionPoints[0].dumpingGround.code',
                type: 'dropDown',
                pattern:
                '/egov-mdms-service/v1/_get?&moduleName=swm&masterName=DumpingGround&filter%3D%5B%3F(%40.siteDetails.location.code%3D={startPoint.routes[0].collectionPoints[0].collectionPoint.location.code})]|$..DumpingGround.*.code|$..DumpingGround.*.name',
              }
            ]
          },
          {
            name: 'typeOfPoint',
            jsonPath: 'startPoint.routes[0].collectionPoints[0].typeOfPoint',
            label: 'Type Of Point',
            type: 'text',
            defaultValue: 'Starting Point',
            isRequired: true,
            isDisabled: true,
          },
          {
            name: 'collectionPoint',
            jsonPath: 'startPoint.routes[0].collectionPoints[0].collectionPoint.code',
            label: 'Collection Points',
            type: 'singleValueList',
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ''
          },
          {
            name: 'startingCollectionPointDistance',
            jsonPath: 'startPoint.routes[0].collectionPoints[0].distance',
            label: 'swm.routes.create.distance',
            type: 'text',
            defaultValue: 0,
            add: true,
            isRequired: false,
            isDisabled: true,
            patternErrorMsg: '',
          },
          {
            name: 'startingCollectionPointGarbageEstimate',
            jsonPath: 'startPoint.routes[0].collectionPoints[0].garbageEstimate',
            label: 'swm.routes.create.garbagecollection',
            type: 'number',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          }
        ],
      },
      {
        name: 'defineRoute2',
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
            "isDisabled": false,
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
            type: 'text',
            isRequired: true,
            isDisabled: true,
            defaultValue: 'Route Stop',
            // defaultValue: [
            //   {
            //     key: 'Route Stop',
            //     value: 'Route Stop',
            //   }
            // ],
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
            name: 'startingCollectionPointDistance',
            jsonPath: 'routes[0].collectionPoints[0].distance',
            label: 'swm.routes.create.distance',
            type: 'number',
            add: true,
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'startingCollectionPointGarbageEstimate',
            jsonPath: 'routes[0].collectionPoints[0].garbageEstimate',
            label: 'swm.routes.create.garbagecollection',
            type: 'number',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          }
        ],
      },
      {
        name: 'defineRoute',
        label: 'swm.routes.create.endPointgroup.title',
        jsonPath: "endPoint.routes[0].collectionPoints",
        fields: [
          {
            "type": "boundary",
            "label": "",
            "hierarchyType": "REVENUE",
            "jsonPath": "endPoint.routes[0].collectionPoints[0].collectionPoint.location.code",
            "isRequired": true,
            "patternErrorMsg": "",
            "isDisabled": false,
            "fullWidth": true,
            depedants: [
              {
                jsonPath: 'endPoint.routes[0].collectionPoints[0].collectionPoint.code',
                type: 'dropDown',
                pattern:
                '/swm-services/collectionpoints/_search?&locationCode={endPoint.routes[0].collectionPoints[0].collectionPoint.location.code}|$..collectionPoints.*.code|$..collectionPoints.*.name',
              },
              {
                jsonPath: 'endPoint.routes[0].collectionPoints[0].dumpingGround.code',
                type: 'dropDown',
                pattern:
                '/egov-mdms-service/v1/_get?&moduleName=swm&masterName=DumpingGround&filter%3D%5B%3F(%40.siteDetails.location.code%3D={endPoint.routes[0].collectionPoints[0].collectionPoint.location.code})]|$..DumpingGround.*.code|$..DumpingGround.*.name',
              }
            ]
          },
          {
            name: 'typeOfPoint',
            jsonPath: 'endPoint.routes[0].collectionPoints[0].typeOfPoint',
            label: 'Type Of Point',
            type: 'singleValueList',
            isRequired: true,
            isDisabled: false,
            defaultValue: [
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
            jsonPath: 'endPoint.routes[0].collectionPoints[0].collectionPoint.code',
            label: 'Collection Points',
            type: 'singleValueList',
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: ''
          },
          {
            name: 'dumpingGround',
            jsonPath: 'endPoint.routes[0].collectionPoints[0].dumpingGround.code',
            label: 'Dumping ground',
            type: 'singleValueList',
            isRequired: false,
            isDisabled: true,
            patternErrorMsg: '',
          },
          {
            name: 'startingCollectionPointDistance',
            jsonPath: 'endPoint.routes[0].collectionPoints[0].distance',
            label: 'swm.routes.create.distance',
            type: 'number',
            add: true,
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'startingCollectionPointGarbageEstimate',
            jsonPath: 'endPoint.routes[0].collectionPoints[0].garbageEstimate',
            label: 'swm.routes.create.garbagecollection',
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
    afterHandleChange: routeValidation,
    afterSetForm: getDumpingLocationUpdate,
    beforeSubmit: modifyFormData,
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
            label: 'swm.routes.create.distance',
            type: 'number',
            add: true,
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'startingCollectionPointGarbageEstimate',
            jsonPath: 'routes[0].collectionPoints[0].garbageEstimate',
            label: 'swm.routes.create.garbagecollection',
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
            label: 'swm.routes.create.distance',
            type: 'number',
            add: true,
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'startingCollectionPointGarbageEstimate',
            jsonPath: 'routes[0].collectionPoints[0].garbageEstimate',
            label: 'swm.routes.create.garbagecollection',
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
        name: 'RouteDetails',
        label: 'swm.routes.search.title',
        fields: [
          {
            name: 'name',
            jsonPath: 'code',
            label: 'swm.routes.create.name',
            type: 'autoCompelete',
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: '',
            url: '/swm-services/routes/_search?|$.routes.*.code|$.routes.*.name'
          },
          {
            name: 'collectionTypeCode',
            jsonPath: 'collectionTypeCode',
            label: 'swm.routes.search.result.collectionPoint',
            type: 'autoCompelete',
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: '',
            url: '/egov-mdms-service/v1/_get?&moduleName=swm&masterName=CollectionType|$..code|$..name'
            
          },
          {
            name: 'dumpingGroundCode',
            jsonPath: 'dumpingGroundCode',
            label: 'swm.routes.search.dumpingGroundCode',
            type: 'autoCompelete',
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: '',
            url: '/egov-mdms-service/v1/_get?&moduleName=swm&masterName=DumpingGround|$..DumpingGround.*.code|$..DumpingGround.*.name'
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
          label: 'swm.routes.search.result.distance',
        },
        {
          label: 'swm.routes.search.result.garbage',
        }
      ],
      values: [
        'name',
        'collectionType.name',
        'totalDistance',
        'totalGarbageEstimate'
      ],
      resultPath: 'routes',
      rowClickUrlUpdate: '/update/swm/routes/{code}',
      rowClickUrlView: '/view/swm/routes/{code}',
    }
  }
};
export default dat;