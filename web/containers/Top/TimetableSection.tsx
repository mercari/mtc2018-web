import * as React from 'react';
import styled from 'styled-components';
import { colors, getTextStyle } from '../../components/styles';
import Section from './Section';
import { rows } from '../../store/timetable';

const TimetableSection: React.SFC<{}> = props => (
  <Section title="TIMETABLE" id="timetable" {...props}>
    <table>
      <thead>
        <tr>
          <th />
          <th>TRACK A(Tower Hall)</th>
          <th>TRACK B(Auditorium)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={`row_${rowIndex}`}>
            <td>{row.time}</td>
            {row.slots.map(
              (slot, slotIndex) =>
                slot.type === 'content' ? (
                  <td key={`td_${slotIndex}`} className="-content" colSpan={1}>
                    <div className="title">#Go #Web #ʕ◔ϖ◔ʔ</div>
                    <div className="title">
                      Web アプリケーションにおける Go 言語のパッケージ構成
                      〜メルカリ カウル編〜
                    </div>
                    <div className="name">主森 理</div>
                  </td>
                ) : (
                  <td key={`td_${slotIndex}`} className="-other" colSpan={2}>
                    {slot.label}
                  </td>
                )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </Section>
);

export default styled(TimetableSection)`
  ${getTextStyle('body')};

  table {
    width: 100%;
    max-width: 920px;
    border-spacing: 1px;
    thead {
      tr {
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
      }
    }

    tbody {
      tr {
        td {
          padding: 10px;
          box-sizing: border-box;
          background-color: ${colors.yuki};
          border-bottom: 10px solid ${colors.primary};

          &:first-child {
            vertical-align: top;
            background-color: ${colors.secondary};
            color: ${colors.yuki};
          }

          &.-content {
            .title {
              font-weight: 600;
            }
          }

          &.-other {
            height: 60px;
            text-align: center;
            font-weight: 600;
          }
        }
      }
    }
  }
`;
