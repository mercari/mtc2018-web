import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../../../components';
import { colors, getTextStyle } from '../../../components/styles';
import { Section } from '../../../components';
import { rows } from '../../../store/timetable';
import { Content, Row } from '../../../types';
import TimetableRow from './TimetableRow';

interface Props {
  contents: Content[];
}

const TimetableSection: React.SFC<Props> = ({ contents, ...props }) => {
  return (
    <Section title="TIME TABLE" id="timetable" {...props}>
      <Lang>
        <span>(JA)</span>
        日本語講演
        <span>(EN)</span>
        英語講演
      </Lang>
      <TimelineTable>
        <thead>
          <tr>
            <th />
            <th>TRACK A</th>
            <th>TRACK B</th>
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

const Lang = styled(Text).attrs({
  level: 'body'
})`
  width: 100%;
  max-width: 920px;
  color: ${colors.yuki};
  text-align: right;
  margin-bottom: 8px;

  > span {
    color: ${colors.secondary};
    margin-left: 8px;
  }
`;

const TimelineTable = styled.table`
  ${getTextStyle('body')};
  width: 100%;
  max-width: 920px;
  border-spacing: 1px;
  table-layout: fixed;

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
