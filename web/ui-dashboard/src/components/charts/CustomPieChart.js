import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import ContainerDimension from 'react-container-dimensions';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.primary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
});

const CustomPieChart = (props) => {
  const {
    classes, labelKey, valueKey, heading, onClick, data, tooltip, legendFormatter
  } = props;
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  let content;
  if (data) {
    content = data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />);
  }
  return (
    <ContainerDimension>
      {({ width, height }) => (
        <Card raised className={classes.card} style={{ height, width }}>
          <CardContent>
            <Typography className={classes.pos}>{heading}</Typography>
            <ResponsiveContainer width="100%" height={height - 50}>
              <PieChart>
                <Pie
                  onClick={onClick}
                  data={data}
                  nameKey={!labelKey && 'name'}
                  dataKey={!valueKey && 'value'}
                  legendType="circle"
                  innerRadius={60}
                  outerRadius={100}
                  isAnimationActive
                >
                  {content}
                </Pie>
                <Tooltip content={tooltip} />
                <Legend formatter={legendFormatter} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </ContainerDimension>
  );
};

CustomPieChart.propTypes = {
  heading: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.number,
  })),
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  tooltip: PropTypes.element,
  legendFormatter: Proptypes.func,
};

CustomPieChart.defaultProps = {
  labelKey: undefined,
  valueKey: undefined,
  tooltip: undefined,
  legendFormatter: undefined
  data: [],
};

export default withStyles(styles)(CustomPieChart);
