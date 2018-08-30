import * as React from 'react';
import styled from 'styled-components';
import { colors, getTextStyle } from '../../../components/styles';
import Section from '../Section';
import { rows } from '../../../store/timetable';
import { Content, Row } from '../../../types';
import TimetableRow from './TimetableRow';

interface Props {
  contents: Content[];
}

const TimetableSection: React.SFC<Props> = ({ contents, ...props }) => {
  return (
    <Section title="TIMETABLE" id="timetable" {...props}>
      <TimelineTable>
        <thead>
          <tr>
            <th />
            <th>TRACK A(Tower Hall)</th>
            <th>TRACK B(Auditorium)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row: Row, rowIndex) => (
            <TimetableRow row={row} contents={contents} key={rowIndex} />
          ))}
        </tbody>
      </TimelineTable>
    </Section>
  );
};

const TimelineTable = styled.table`
  ${getTextStyle('body')};
  width: 100%;
  max-width: 920px;
  border-spacing: 1px;
  th {
    padding: 10px;
    height: 48px;
    box-sizing: border-box;
    background-color: ${colors.nezumi};
    color: ${colors.yuki};

    &:first-child {
      width: 120px;
      background-color: ${colors.orange};
    }
  }
`;

export default TimetableSection;
