import * as React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Text, Tip } from '../../../components';
import { colors, getTextStyle, borderRadius } from '../../../components/styles';
import { Content } from '../../../types';
import ContentCardSpeaker from './ContentCardSpeaker';

interface Props {
  content: Content;
}

class ContentCard extends React.PureComponent<Props> {
  public render() {
    const { content, ...props } = this.props;
    const startTime = moment(content.startTime).format('HH:mm');
    const endTime = moment(content.endTime).format('HH:mm');
    return (
      <Wrapper {...props}>
        <ContentInfo>
          <Header>
            {content.type === 'keynote' ? (
              <Tip type="important">KEYNOTE</Tip>
            ) : (
              <Tip type="normal">SESSION</Tip>
            )}
            <HeaderDetail>
              <Text level="display2">{content.place}</Text>
              <Text level="display2">
                {startTime}-{endTime}
              </Text>
            </HeaderDetail>
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
        <div>
          {content.speakers.map(speaker => (
            <Speaker key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  border-radius: ${borderRadius.level1};
  background-color: ${colors.yuki};
  padding: 60px;
  box-sizing: border-box;

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
  flex-wrap: wrap;
  margin-bottom: 8px;

  > * {
    margin-right: 8px;
    margin-bottom: 8px;

    &:last-child {
      margin-righ: 0;
    }
  }
`;

const HeaderDetail = styled.div`
  display: flex;
  align-items: center;

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

const Speaker = styled(ContentCardSpeaker)`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export default ContentCard;
