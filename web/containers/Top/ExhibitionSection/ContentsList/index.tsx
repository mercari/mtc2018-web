import * as React from 'react';
import styled from 'styled-components';
import { colors } from '../../../../components/styles';
import { Text } from '../../../../components';
import { Exhibition } from '../../../../types';
import ContentsListItem from './ContentsListItem';

interface Props {
  place: string;
  currentNum: number | null;
  exhibitions: Exhibition[];
  onHoverItem: (no: number) => void;
  onBlurItem: () => void;
}

class ContentsList extends React.PureComponent<Props> {
  public render() {
    const {
      place,
      currentNum,
      exhibitions,
      onHoverItem,
      onBlurItem,
      ...props
    } = this.props;

    return (
      <Wrapper {...props}>
        <PlaceName>{place}</PlaceName>
        <List>
          {exhibitions.map(exhibition => (
            <ContentsListItem
              key={exhibition.no}
              active={currentNum === exhibition.no}
              exhibition={exhibition}
              onHoverItem={onHoverItem}
              onBlurItem={onBlurItem}
            />
          ))}
        </List>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div``;

const PlaceName = styled(Text).attrs({
  level: 'display3'
})`
  color: ${colors.secondary};
  margin-bottom: 20px;
`;

const List = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export default ContentsList;
