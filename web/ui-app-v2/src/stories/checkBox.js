import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { action } from '@storybook/addon-actions';
import theme from '../config/theme';
import { Checkbox } from '../components';

const options = [
  {
    label: 'India',
    value: 'IN',
  },
  {
    label: 'USA',
    value: 'US',
  },
  {
    label: 'Australia',
    value: 'AUS',
  },
];

const checkedValues = ['IN', 'US', 'AUS'];

storiesOf('Checkbox', module)
  .addDecorator(muiTheme([theme]))
  .add('Checkbox', () => <Checkbox options={options} checkedValues={checkedValues} />);
