import * as React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Text, Tip } from '../../../../components';
import {
  colors,
  getTextStyle,
  borderRadius
} from '../../../../components/styles';
import { Content } from '../../../../types';
import ContentModalSpeaker from './ContentModalSpeaker';

interface Props {
  index: number;
  content: Content;
}

class ContentModalItem extends React.PureComponent<Props> {
  public render() {
    const { content, ...props } = this.props;
    const startTime = moment(content.startTime).format('HH:mm');
    const endTime = moment(content.endTime).format('HH:mm');
    return (
      <Wrapper {...props}>
        <ContentInfo>
          <Header>
            <Tip>SESSION</Tip>
            <Text level="display2">{content.place}</Text>
            <Text level="display2">
              {startTime}-{endTime}
            </Text>
          </Header>
          <Title>{content.title}</Title>
          <Tags>
            {content.tags.map(tag => (
              <Text level="display1" key={tag}>
                #{tag}
              </Text>
            ))}
          </Tags>
          <Body>{content.outline}</Body>
        </ContentInfo>
        <ContentModalSpeaker speaker={content.speakers[0]} />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  max-width: 800px;
  border-radius: ${borderRadius.level1};
  background-color: ${colors.yuki};
  padding: 60px;
  box-sizing: border-box;
  overflow: scroll;

  @media screen and (max-width: 767px) {
    padding: 20px;
  }
`;

const ContentInfo = styled.div`
  margin-bottom: 40px;

  @media screen and (max-width: 767px) {
    margin-bottom: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  > * {
    margin-right: 16px;

    &:last-child {
      margin-righ: 0;
    }
  }
`;

const Tags = styled.div`
  display: flex;
  margin-bottom: 16px;

  > * {
    margin-right: 8px;
  }
`;

const Body = styled(Text)`
  ${getTextStyle('display1')};
  @media screen and (max-width: 767px) {
    ${getTextStyle('body')};
  }
`;

const Title = styled(Text).attrs({
  level: 'display2'
})`
  font-weight: bold;
  margin-bottom: 8px;
`;

export default ContentModalItem;
