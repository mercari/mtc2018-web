import * as React from 'react';
import { Card } from '../../components';
import Section from './Section';

const AccessSection: React.SFC<{}> = props => (
  <Section title="ACCESS" id="access" {...props}>
    <Card>ここにコンテンツが入ります</Card>
  </Section>
);

export default AccessSection;
