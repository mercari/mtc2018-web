import * as React from 'react';
import styled from 'styled-components';
import { Card } from '../../components';
import Section from './Section';

const AccessSection: React.SFC<{}> = props => (
  <Section title="ACCESS" id="access" {...props}>
    <StyledCard>ここにコンテンツが入ります</StyledCard>
  </Section>
);

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 920px;
`;

export default AccessSection;
