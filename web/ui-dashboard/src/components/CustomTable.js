import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import ContainerDimension from 'react-container-dimensions';
import Card, { CardContent } from 'material-ui/Card';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
});

const CustomTable = (props) => {
  const { classes, data } = props;

  return (
    <ContainerDimension>
      {({ width, height }) => (
        <Card raised className={classes.root} style={{ height: height - 30, width }}>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Division</TableCell>
                  <TableCell numeric>Total Complaints</TableCell>
                  <TableCell numeric>Closed Complaints</TableCell>
                  <TableCell numeric>SLA Breached</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(n => (
                  <TableRow key={n.key}>
                    <TableCell>{n.key}</TableCell>
                    <TableCell numeric>{n.doc_count}</TableCell>
                    <TableCell numeric>{n.slaBreachedComplaints}</TableCell>
                    <TableCell numeric>{n.closedComplaints}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </ContainerDimension>
  );
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

export default withStyles(styles)(CustomTable);
