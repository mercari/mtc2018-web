import * as React from 'react';
import styled from 'styled-components';
import { colors } from '../../../components/styles';

export interface BoothCircle {
  no: number;
  x: number;
  y: number;
}

interface Props {
  active: boolean;
  circle: BoothCircle;
  onHoverItem: (no: number) => void;
  onBlurItem: () => void;
}

class MapCircle extends React.PureComponent<Props> {
  private element?: SVGGElement;
  public componentDidMount() {
    this.element!.addEventListener('mouseover', this.onHoverItem);
    this.element!.addEventListener('mouseout', this.props.onBlurItem);
  }

  public componentWillUnmount() {
    this.element!.removeEventListener('mouseover', this.onHoverItem);
    this.element!.removeEventListener('mouseout', this.props.onBlurItem);
  }

  public render() {
    const { circle, active } = this.props;
    return (
      <Wrapper
        transform={`translate(${circle.x}, ${circle.y})`}
        innerRef={this.innerRef}
      >
        <circle
          fill={active ? colors.secondary : '#121C3B'}
          fillOpacity={active ? '1' : 0.108723958}
          fillRule="nonzero"
          cx={20}
          cy={20}
          r={20}
        />
        <text
          x="20"
          y="20"
          fill={active ? '#FFFFFF' : '#121C3B'}
          fontFamily="Montserrat-Bold, Montserrat"
          fontSize={16}
          fontWeight="bold"
          letterSpacing={-0.3858825}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {circle.no}
        </text>
      </Wrapper>
    );
  }
  private innerRef = (element: SVGGElement) => {
    this.element = element;
  };

  private onHoverItem = () => {
    const { circle, onHoverItem } = this.props;
    onHoverItem(circle.no);
  };
}

const Wrapper = styled.g`
  cursor: pointer;
`;

export default MapCircle;
