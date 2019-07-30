import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../../../components';
import { colors, getTextStyle } from '../../../components/styles';
import { Section } from '../../../components';
import { rows } from '../../../store/timetable';
import { Row } from '../../../types';
import TimetableRow, { TIMETABLE_ROW_FRAGMENT } from './TimetableRow';
import { Translation } from 'react-i18next';
import { isJapan } from '../../../utils';

import gql from 'graphql-tag';
import { TimetableSectionFragment } from '../../../graphql/generated/TimetableSectionFragment';

export const TIMETABLE_SECTION_FRAGMENT = gql`
  fragment TimetableSectionFragment on Query {
    sessionList(first: 100) {
      ...TimetableRowFragment
    }
  }

  ${TIMETABLE_ROW_FRAGMENT}
`;

interface Props {
  gqlData: TimetableSectionFragment;
}

const TimetableSection: React.SFC<Props> = ({ gqlData, ...props }) => {
  return (
    <Translation ns={['common']}>
      {(t, { i18n }) => {
        const isJa = isJapan(i18n.language);
        return (
          <Section title="TIME TABLE" id="timetable" {...props}>
            <Lang>
              <span>(JA)</span>
              {t('session.ja')}
              <span>(EN)</span>
              {t('session.en')}
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
                  <TimetableRow
                    row={row}
                    sessionList={gqlData.sessionList}
                    isJa={isJa}
                    key={rowIndex}
                  />
                ))}
              </tbody>
            </TimelineTable>
          </Section>
        );
      }}
    </Translation>
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
