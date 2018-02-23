import transformers from './transformers';

const specs = {
  createUrl: '/post',
  searchUrl: '',
  transformers: transformers,
  objectName: 'vehicleMaintenances',
  idJsonPath: 'complaints.code',
  groups: [
    {
      label: '',
      fields: [
        {
          width: 4,
          target: 'regNumber',
          jsonPath: 'vehicleMaintenances[0].vehicle.regNumber',
          label: 'Vehicle Reg. No',
          type: 'dropdown',
          isRequired: true,
          isDisabled: false,
          defaultValue: '',
          dataSourceConfig: {
            key: 'code',
            value: 'name',
          },
          dataSource: {
            request: {
              url: '/swm-services/vehicles/_search',
              searchKey: '',
              path: '',
            },
            response: {
              path: 'regNumber',
            },
          },
          dependencies: [
            {
              target: 'name',
              targetType: 'text',
              type: 'API_CALL',
              dataSource: {
                request: {
                  url: '/swm-services/vehicles/_search',
                  searchKey: 'regNumber',
                  path: 'vehicleMaintenances[0].vehicle.vehicleType.name',
                },
              },
            },
          ],
        },

        {
          width: 4,
          target: 'name',
          jsonPath: 'vehicleMaintenances[0].vehicle.vehicleType.name',
          label: 'Vehicle Type',
          pattern: '',
          type: 'text',
          isRequired: false,
          isDisabled: true,
          defaultValue: '',
          maxLength: 128,
          minLength: 1,
          patternErrorMsg: '',
          url: '',
        },

        {
          width: 4,
          target: 'maintenanceAfter',
          jsonPath: 'vehicleMaintenances[0].maintenanceAfter',
          label: 'Maintenance After',
          pattern: '',
          type: 'text',
          isRequired: true,
          isDisabled: false,
          defaultValue: '',
          patternErrorMsg: '',
        },
        {
          width: 4,
          target: 'maintenanceUom',
          jsonPath: 'vehicleMaintenances[0].maintenanceUom',
          label: 'Days/Kms',
          pattern: '',
          type: 'dropdown',
          isRequired: true,
          isDisabled: false,
          dataSourceConfig: {
            key: 'key',
            value: 'value',
          },
          defaultOptions: [
            {
              key: 'Kms',
              value: 'Kms',
            },
            {
              key: 'Days',
              value: 'Days',
            },
          ],
          maxLength: 5,
          minLength: 2,
          patternErrorMsg: '',
        },
        {
          width: 4,
          target: 'downtimeforMaintenance',
          jsonPath: 'vehicleMaintenances[0].downtimeforMaintenance',
          label: 'Downtime For Maintenance',
          pattern: '',
          type: 'text',
          isRequired: true,
          isDisabled: false,
          defaultValue: '',
          patternErrorMsg: '',
        },
        {
          width: 4,
          target: 'downtimeforMaintenanceUom',
          jsonPath: 'vehicleMaintenances[0].downtimeforMaintenanceUom',
          label: 'Hrs/Days',
          pattern: '',
          type: 'dropdown',
          isRequired: true,
          isDisabled: false,
          dataSourceConfig: {
            key: 'key',
            value: 'value',
          },

          defaultOptions: [
            {
              key: 'Hrs',
              value: 'Hrs',
            },
            {
              key: 'Days',
              value: 'Days',
            },
          ],
          maxLength: 5,
          minLength: 3,
          patternErrorMsg: '',
        },
      ],
    },
  ],

  search: {
    groups: [
      {
        label: 'Search Group One',
        fields: [
          {
            label: 'First Name',
            type: 'text',
            target: 'name',
            width: '',
            viewAdapter: '',
          },
        ],
      },
    ],
  },
};

export default specs;
