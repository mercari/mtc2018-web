import * as React from 'react';
import styled from 'styled-components';
import { colors } from '../../../components/styles';

interface Props {
  label: string;
}

const TimetableOtherSlot: React.SFC<Props> = ({ label }) => (
  <Wrapper>{label}</Wrapper>
);

const Wrapper = styled.div`
  height: 60px;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid ${colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;

  &:last-child {
    border-bottom: none;
  }
`;

export default TimetableOtherSlot;
