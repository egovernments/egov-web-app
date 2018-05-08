const ES_MAP = {
  DISTRICT: { esKey: 'cityDistrictName', label: 'District' },
  CITY: { esKey: 'cityName', label: 'City' },
  COMPLAINT_IS_CLOSED: { esKey: 'closed', label: 'Complaint Closed' },
  SLA_IS_BREACHED: { esKey: 'ifSLA', label: 'SLA Breached' },
  COMPLAINT_IS_REOPENED: { esKey: 'reOpened', label: 'Complaint Reopened' },
  COMPLAINT_SOURCE: { esKey: 'receivingMode', label: 'Complaint Source' },
  COMPLAINT_CATEGORY: { esKey: 'categoryName', label: 'Complaint Category' },
  COMPLAINT_CREATED_DATE: { esKey: 'createdDate', label: 'Complaint Created Date' },
};

export default ES_MAP;
