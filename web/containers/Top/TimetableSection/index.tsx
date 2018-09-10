import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../../../components';
import { colors, getTextStyle } from '../../../components/styles';
import { Section } from '../../../components';
import { rows } from '../../../store/timetable';
import { Row } from '../../../types';
import TimetableRow from './TimetableRow';
import { I18n } from 'react-i18next';
import { AllSessions_sessionList } from '../../../graphql/generated/AllSessions';
import { isJapan } from '../../../utils';

interface Props {
  sessions: AllSessions_sessionList;
}

const TimetableSection: React.SFC<Props> = ({ sessions, ...props }) => {
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
          <I18n>
            {(_, { i18n }) => {
              const isJa = isJapan(i18n.language);
              return rows.map((row: Row, rowIndex) => (
                <TimetableRow
                  row={row}
                  sessions={sessions.nodes}
                  isJa={isJa}
                  key={rowIndex}
                />
              ));
            }}
          </I18n>
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
  table-layout: fixed;
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
