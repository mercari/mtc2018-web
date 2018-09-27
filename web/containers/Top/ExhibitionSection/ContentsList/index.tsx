import * as React from 'react';
import styled from 'styled-components';
import { colors } from '../../../../components/styles';
import { Text } from '../../../../components';
import { Exhibition } from '../../../../types';
import ContentsListItem from './ContentsListItem';

interface Props {
  place: string;
  currentNo: number | null;
  exhibitions: Exhibition[];
  onHoverItem: (no: number) => void;
  onBlurItem: () => void;
}

class ContentsList extends React.PureComponent<Props> {
  public render() {
    const {
      place,
      currentNo,
      exhibitions,
      onHoverItem,
      onBlurItem,
      ...props
    } = this.props;

    return (
      <div {...props}>
        <PlaceName>{place}</PlaceName>
        <List>
          {exhibitions.map(exhibition => (
            <ContentsListItem
              key={exhibition.no}
              active={currentNo === exhibition.no}
              exhibition={exhibition}
              onHoverItem={onHoverItem}
              onBlurItem={onBlurItem}
            />
          ))}
        </List>
      </div>
    );
  }
}

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
