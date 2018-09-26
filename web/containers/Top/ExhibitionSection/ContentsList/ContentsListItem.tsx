import * as React from 'react';
import styled from 'styled-components';
import { colors, borderRadius, boxShadow } from '../../../../components/styles';
import { Text } from '../../../../components';
import { Exhibition } from '../../../../types';

interface Props {
  active: boolean;
  exhibition: Exhibition;
  onHoverItem: (no: number) => void;
  onBlurItem: () => void;
}

class ContentsListItem extends React.PureComponent<Props> {
  public static defaultProps = {
    active: false
  };

  public render() {
    const { active, exhibition, ...props } = this.props;
    return (
      <Wrapper
        onMouseOver={this.onMouseOver}
        onMouseOut={this.props.onBlurItem}
        {...props}
      >
        <Row>
          <Num active={active}>{exhibition.no}.</Num>
          <Title active={active}>{exhibition.title}</Title>
        </Row>
        <Description active={active}>
          <DescriptionInner>{exhibition.description}</DescriptionInner>
        </Description>
      </Wrapper>
    );
  }

  private onMouseOver = () => {
    const { exhibition, onHoverItem } = this.props;
    onHoverItem(exhibition.no);
  };
}

const Wrapper = styled.li`
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Row = styled.div`
  display: flex;
  cursor: pointer;
`;

const Num = styled(Text).attrs({
  level: 'display1'
})`
  font-weight: bold;
  width: 30px;
  flex-shrink: 0;
  transition-duration: 300ms;
  color: ${(props: { active: boolean }) =>
    props.active ? colors.secondary : 'auto'};
`;

const Title = styled(Text).attrs({
  level: 'display1'
})`
  transition-duration: 300ms;
  color: ${(props: { active: boolean }) =>
    props.active ? colors.secondary : 'auto'};
`;

const Description = styled.div`
  position: relative;
  transition-duration: 300ms;
  opacity: ${(props: { active: boolean }) => (props.active ? 1 : 0)};
  pointer-events: none;
`;

const DescriptionInner = styled(Text).attrs({
  level: 'body'
})`
  color: ${colors.secondary};
  position: absolute;
  top: 8px;
  background: ${colors.skin};
  padding: 16px;
  border-radius: ${borderRadius.level1};
  box-shadow: ${boxShadow.level1};
`;

export default ContentsListItem;
