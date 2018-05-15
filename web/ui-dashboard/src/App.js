import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { ListItem } from 'material-ui/List';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { layout, layoutProps } from './constants/layout';
import StatBox from './components/StatBox';
import CustomPieChart from './components/charts/CustomPieChart';
import CustomBarChart from './components/charts/CustomBarChart';
import StackedBarChart from './components/charts/StackedBarChart';
import {
  fetchFilterData,
  refreshDashboardData,
  inputChange,
  addConstraint,
} from './actions/pgrActions';
import ES_MAPPING from './constants/esMapping';
import PersistentDrawer from './components/drawer/PersistentDrawer';
import CustomSelectBox from './components/CustomSelectBox';
import CustomDatePicker from './components/CustomDatePicker';
import CustomMap from './components/gis/CustomMap';
import CustomTooltip from './components/CustomTooltip';
import CustomTable from './components/CustomTable';
import {
  formatChartData,
  formatComplaintsOpenClosed,
  calcSlaBreachPerc,
  extractUniqItems,
  formatNestedAggregation,
} from './utils/index';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class App extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSlaBreachPieClick = this.handleSlaBreachPieClick.bind(this);
    this.handleComplaintSourcePieClick = this.handleComplaintSourcePieClick.bind(this);
    this.handleGisNav = this.handleGisNav.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchFilterData('complaint'));
    dispatch(refreshDashboardData('complaint'));
  }

  handleChange(event) {
    const { dispatch } = this.props;
    dispatch(inputChange(event.target.name, event.target.value));
    if (event.target.type !== 'date') {
      dispatch(addConstraint(event.target.name, event.target.value));
    }
  }

  handleSubmit() {
    const { dispatch } = this.props;
    dispatch(refreshDashboardData('complaint'));
  }

  handleSlaBreachPieClick(data) {
    const { dispatch } = this.props;
    dispatch(inputChange(ES_MAPPING.SLA_IS_BREACHED.esKey, data.name.toString()));
    dispatch(addConstraint(ES_MAPPING.SLA_IS_BREACHED.esKey, data.name.toString()));
    dispatch(refreshDashboardData('complaint'));
  }

  handleComplaintSourcePieClick(data) {
    const { dispatch } = this.props;
    dispatch(inputChange(ES_MAPPING.SLA_IS_BREACHED.esKey, data.name.toString()));
    dispatch(addConstraint(ES_MAPPING.COMPLAINT_SOURCE.esKey, data.name.toString()));
    dispatch(refreshDashboardData('complaint'));
  }

  handleGisNav(event) {
    const { dispatch } = this.props;
    const { properties } = event.target.feature;
    const field = ES_MAPPING[properties.type.toUpperCase()].esKey;
    if (field === ES_MAPPING.DISTRICT.esKey) {
      dispatch(inputChange(field, properties.name));
      dispatch(addConstraint(field, properties.name));
      dispatch(refreshDashboardData('complaint'));
    }
    // dispatch(fetchGisData('complaint/_search', event.target.feature.properties));
  }

  render() {
    const {
      dashboard, form, filter, gis,
    } = this.props;
    const { data } = dashboard;
    const gisReady = !gis.geoJson.isFetching && !gis.plots.isFetching;
    if (
      (Object.keys(data).length === 0 && data.constructor === Object) ||
      (Object.keys(filter.data).length === 0 && filter.data.constructor === Object)
    ) {
      return null;
    }
    console.log(JSON.stringify(form));
    const slaBreachedPerc = calcSlaBreachPerc(data.slaBreached.count, data.totalComplaints.count);
    const layouts = JSON.parse(layout);
    return (
      <div>
        <PersistentDrawer>
          <CustomSelectBox
            id="cityDistrictName"
            name="District"
            data={extractUniqItems(filter.data.uniqDistricts.aggregations)}
            handleChange={this.handleChange}
            value={form.cityDistrictName}
          />
          <CustomSelectBox
            id="cityName"
            name="City"
            data={extractUniqItems(filter.data.uniqCities.aggregations)}
            handleChange={this.handleChange}
            value={form.cityName}
          />
          <CustomDatePicker
            id="startDate"
            handleChange={this.handleChange}
            name="Start Date"
            value={form.startDate}
          />
          <CustomDatePicker
            id="endDate"
            handleChange={this.handleChange}
            name="End Date"
            value={form.endDate}
          />
          <CustomSelectBox
            id="receivingMode"
            name="Source"
            data={extractUniqItems(filter.data.uniqSources.aggregations)}
            handleChange={this.handleChange}
            value={form.receivingMode}
          />
          <ListItem>
            <Button variant="raised" color="secondary" onClick={this.handleSubmit}>
              Submit
            </Button>
          </ListItem>
        </PersistentDrawer>

        <ResponsiveReactGridLayout
          className="layout"
          layouts={layouts}
          onLayoutChange={(lyt, lyts) => console.log(JSON.stringify(lyts))}
          {...layoutProps}
        >
          <div key="totalComplaints">
            <StatBox value={data.totalComplaints.count} heading="Total Complaints" />
          </div>
          <div key="openComplaints">
            <StatBox value={data.openComplaints.count} heading="Open Complaints" />
          </div>
          <div key="reopenedComplaints">
            <StatBox value={data.reopenedComplaints.count} heading="Reopened Complaints" />
          </div>
          <div key="slaBreached">
            <StatBox value={slaBreachedPerc} heading="SLA Breached" />
          </div>
          <div key="map">
            {gisReady && (
              <CustomMap
                plots={gis.plots.data}
                geoJson={gis.geoJson.boundary}
                handleGisNav={this.handleGisNav}
              />
            )}
          </div>

          <div key="slaBreachPie">
            <CustomPieChart
              onClick={this.handleSlaBreachPieClick}
              data={formatChartData(data.slaCount.aggregations)}
              heading="SLA Adherance"
              tooltip={
                <CustomTooltip
                  formatLabel={label => (label === 0 ? 'Within SLA' : 'SLA Breached')}
                />
              }
              legendFormatter={label => (label === 0 ? 'Within SLA' : 'SLA Breached')}
            />
          </div>
          <div key="complaintSourcesPie">
            <CustomPieChart
              onClick={this.handleComplaintSourcePieClick}
              data={formatChartData(data.complaintSources.aggregations)}
              heading="Complaint Sources"
            />
          </div>
          <div key="complaintStatusBar">
            <StackedBarChart
              data={data.complaintStatusByMonth.aggregations}
              dataTransformer={formatComplaintsOpenClosed}
              heading="Complaint Status"
            />
          </div>
          <div key="complaintCategoriesBar">
            <CustomBarChart
              data={formatChartData(data.categories.aggregations)}
              heading="Complaint Categories"
            />
          </div>
          <div key="tableAggregation">
            <CustomTable
              data={formatNestedAggregation(data.slaBreachTabData.aggregations)}
              heading="Division Details"
            />
          </div>
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { pgrReducer } = state || {};
  const {
    dashboard, form, query, filter, gis,
  } = pgrReducer || {};
  return {
    dashboard: dashboard || {},
    form: form || {},
    query: query || {},
    filter: filter || {},
    gis: gis || {},
  };
};

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dashboard: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
  }).isRequired,
  filter: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
  }).isRequired,
  form: PropTypes.objectOf(PropTypes.string).isRequired,
  gis: PropTypes.shape({
    geoJson: PropTypes.object.isRequired,
    plots: PropTypes.object.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(App);
