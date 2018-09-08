import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../../../components';
import { colors, getTextStyle } from '../../../components/styles';
import { Section } from '../../../components';
import { rows } from '../../../store/timetable';
import { Row } from '../../../types';
import TimetableRow, { TIMETABLE_ROW_FRAGMENT } from './TimetableRow';
import { I18n } from 'react-i18next';

import gql from 'graphql-tag';
import { TimetableSectionFragment } from '../../../graphql/generated/TimetableSectionFragment';

export const TIMETABLE_SECTION_FRAGMENT = gql`
  fragment TimetableSectionFragment on Query {
    sessionList {
      ...TimetableRowFragment
    }
  }

  ${TIMETABLE_ROW_FRAGMENT}
`;

interface Props {
  data: TimetableSectionFragment;
}

const TimetableSection: React.SFC<Props> = ({ data, ...props }) => {
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
              const isJa = i18n.language === 'ja-JP';
              return rows.map((row: Row, rowIndex) => (
                <TimetableRow
                  row={row}
                  sessionList={data.sessionList}
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
