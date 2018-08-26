import * as React from 'react';
import styled from 'styled-components';
import { times } from '../utils';

interface Props {
  margin: number;
  maxColumnNum: number;
  minColumnWidth: number;
}

interface State {
  columnNum: number;
}

class MiniGrid extends React.Component<Props, State> {
  public static defaultProps = {
    margin: 20,
    maxColumnNum: 3,
    minColumnWidth: 300
  };

  private element?: HTMLDivElement;

  public componentWillMount() {
    this.setState({
      columnNum: this.props.maxColumnNum
    });
  }

  public componentDidMount() {
    // マウントタイミングで一度カラム数更新
    this.updateColumnNum();
    // カラム数を更新
    window.addEventListener('resize', this.updateColumnNum);
  }

  public componentWillUnmount() {
    // カラム数を更新
    window.removeEventListener('resize', this.updateColumnNum);
  }

  public render() {
    const children = React.Children.toArray(this.props.children);
    const { columnNum } = this.state;
    const rowNum = Math.ceil(children.length / 3);
    const columns: React.ReactNode[] = [];

    // 列
    times(columnNum)((columnIndex: number) => {
      // 行
      const rows: React.ReactNode[] = [];
      times(rowNum)((rowIndex: number) => {
        const index = rowNum * columnIndex + rowIndex;
        const child = children[index];

        // 該当するchildが無ければ追加しない
        if (!child) {
          return;
        }

        rows.push(
          <Row
            key={`minigrid_${columnIndex}_${rowIndex}`}
            margin={this.props.margin}
          >
            {child}
          </Row>
        );
      });

      columns.push(
        <Column key={`minigrid_${columnIndex}`} margin={this.props.margin}>
          {rows}
        </Column>
      );
    });

    return (
      <Wrapper innerRef={this.innerRef} {...this.props}>
        {columns}
      </Wrapper>
    );
  }
  private innerRef = (element: HTMLDivElement) => {
    this.element = element;
  };

  private updateColumnNum = () => {
    if (!this.element) {
      return;
    }

    const wrapperW = this.element.clientWidth;
    const newColumnNum = Math.min(
      Math.floor(wrapperW / this.props.minColumnWidth),
      this.props.maxColumnNum
    );

    // 同じカラム数であれば更新をかけない
    if (newColumnNum === this.state.columnNum) {
      return;
    }

    this.setState({
      columnNum: newColumnNum
    });
  };
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

const Column = styled.div`
  margin-right: ${({ margin }: { margin: number }) => margin}px;
  flex-grow: 1;

  &:last-child {
    margin-right: 0;
  }
`;

const Row = styled.div`
  background: white;
  border-radius: 5px;
  margin-bottom: ${({ margin }: { margin: number }) => margin}px;
  box-sizing: border-box;

  &:last-child {
    margin-bottom: 0;
  }
`;

export default MiniGrid;
