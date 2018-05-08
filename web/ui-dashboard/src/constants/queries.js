import ES_MAP from './esMapping';

export const COMPLAINT_IDX_QRY = {
  index: ['complaint*'],
};

const TOTAL_COMPLAINTS_QRY = {
  size: 0,
};

const OPEN_COMPLAINTS_QRY = {
  size: 0,
  query: {
    bool: {
      must: [
        {
          match: {
            [ES_MAP.COMPLAINT_IS_CLOSED.esKey]: false,
          },
        },
      ],
    },
  },
};

const SLA_BREACHED_QRY = {
  size: 0,
  query: {
    bool: {
      must: [
        {
          match: {
            [ES_MAP.SLA_IS_BREACHED.esKey]: 1,
          },
        },
        {
          match: {
            [ES_MAP.COMPLAINT_IS_CLOSED.esKey]: false,
          },
        },
      ],
    },
  },
};

const REOPENED_COMPLAINTS_QRY = {
  size: 0,
  query: {
    bool: {
      must: [
        {
          match: {
            [ES_MAP.COMPLAINT_IS_CLOSED.esKey]: false,
          },
        },
        {
          match: {
            [ES_MAP.COMPLAINT_IS_REOPENED.esKey]: 1,
          },
        },
      ],
    },
  },
};

const SLA_COUNT_QRY = {
  size: 0,
  aggs: {
    sla: {
      terms: {
        field: ES_MAP.SLA_IS_BREACHED.esKey,
      },
    },
  },
};

const RECEIVING_MODE_QRY = {
  size: 0,
  aggs: {
    complaintSource: {
      terms: {
        field: ES_MAP.COMPLAINT_SOURCE.esKey,
      },
    },
  },
};

const CATEGORIES_QRY = {
  size: 0,
  aggs: {
    categories: {
      terms: {
        field: ES_MAP.COMPLAINT_CATEGORY.esKey,
      },
    },
  },
};

const CITY_STATS_QRY = {
  size: 0,
  aggs: {
    city: {
      terms: {
        field: ES_MAP.CITY.esKey,
      },
    },
  },
};

const COMPLAINTS_STATUS_QRY = {
  size: 0,
  aggs: {
    complaintsOpenClosed: {
      terms: {
        field: ES_MAP.COMPLAINT_IS_CLOSED.esKey,
        size: 20,
        order: {
          _count: 'desc',
        },
      },
      aggs: {
        by_date_range: {
          date_histogram: {
            field: ES_MAP.COMPLAINT_CREATED_DATE.esKey,
            interval: '1M',
            time_zone: 'Asia/Kolkata',
            min_doc_count: 1,
          },
        },
      },
    },
  },
};

const UNIQ_DISTRICTS_QRY = {
  size: 0,
  aggs: {
    uniq_districts: {
      terms: {
        field: ES_MAP.DISTRICT.esKey,
        size: 20,
      },
    },
  },
};

const UNIQ_CITIES_QRY = {
  size: 0,
  aggs: {
    uniq_cities: {
      terms: {
        field: ES_MAP.CITY.esKey,
      },
    },
  },
};

const UNIQ_SOURCES_QRY = {
  size: 0,
  aggs: {
    uniq_sources: {
      terms: {
        field: ES_MAP.COMPLAINT_SOURCE.esKey,
      },
    },
  },
};

const SLA_BREACHED_BY_DISTRICT_QRY = {
  size: 0,
  aggs: {
    placeholder: {
      terms: {
        field: ES_MAP.DISTRICT.esKey,
        size: 20,
      },
    },
  },
  query: {
    bool: {
      must: [
        {
          match: {
            [ES_MAP.SLA_IS_BREACHED.esKey]: 1,
          },
        },
        {
          match: {
            [ES_MAP.COMPLAINT_IS_CLOSED.esKey]: false,
          },
        },
      ],
    },
  },
};

const SLA_BREACHED_BY_CITY_QRY = {
  size: 0,
  aggs: {
    placeholder: {
      terms: {
        field: ES_MAP.CITY.esKey,
        size: 20,
      },
    },
  },
  query: {
    bool: {
      must: [
        {
          match: {
            [ES_MAP.SLA_IS_BREACHED.esKey]: 1,
          },
        },
        {
          match: {
            [ES_MAP.COMPLAINT_IS_CLOSED.esKey]: false,
          },
        },
      ],
    },
  },
};

const SLA_BREACH_AGG_QRY = {
  size: 0,
  aggs: {
    baseGrouping: {
      terms: {
        field: 'cityDistrictName',
        size: 8,
        order: {
          _count: 'desc',
        },
      },
      aggs: {
        closedComplaints: {
          sum: {
            field: 'ifClosed',
          },
        },
        slaBreachedComplaints: {
          sum: {
            field: 'ifSLA',
          },
        },
      },
    },
  },
};

export const DASHBOARD_QUERIES = [
  { name: 'totalComplaints', query: TOTAL_COMPLAINTS_QRY },
  { name: 'openComplaints', query: OPEN_COMPLAINTS_QRY },
  { name: 'slaBreached', query: SLA_BREACHED_QRY },
  { name: 'reopenedComplaints', query: REOPENED_COMPLAINTS_QRY },
  { name: 'slaCount', query: SLA_COUNT_QRY },
  { name: 'complaintSources', query: RECEIVING_MODE_QRY },
  { name: 'categories', query: CATEGORIES_QRY },
  { name: 'cities', query: CITY_STATS_QRY },
  { name: 'complaintStatusByMonth', query: COMPLAINTS_STATUS_QRY },
  { name: 'slaBreachTabData', query: SLA_BREACH_AGG_QRY },
];

export const FILTER_QUERIES = [
  { name: 'uniqDistricts', query: UNIQ_DISTRICTS_QRY },
  { name: 'uniqCities', query: UNIQ_CITIES_QRY },
  { name: 'uniqSources', query: UNIQ_SOURCES_QRY },
];

export const GIS_GRAPH_DATA_QUERY = {
  state: SLA_BREACHED_BY_DISTRICT_QRY,
  [ES_MAP.DISTRICT.esKey]: SLA_BREACHED_BY_CITY_QRY,
};
