import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { action } from '@storybook/addon-actions';
import theme from '../config/theme';
import { LoadingIndicator } from '../components';

storiesOf('LoadingIndicator', module)
  .addDecorator(muiTheme([theme]))
  .add('load', () => <LoadingIndicator status="loading" />);
