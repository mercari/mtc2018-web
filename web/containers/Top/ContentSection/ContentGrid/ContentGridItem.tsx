import * as React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Text, Tip } from '../../../../components';
import { colors, borderRadius, boxShadow } from '../../../../components/styles';
import { Content } from '../../../../types';

interface Props {
  index: number;
  content: Content;
  onClick: (content: Content) => void;
}

class ContentGridItem extends React.PureComponent<Props> {
  public render() {
    const { content, onClick, ...props } = this.props;
    const startTime = moment(content.startTime).format('HH:mm');
    const endTime = moment(content.endTime).format('HH:mm');
    return (
      <Wrapper onClick={this.onClick} {...props}>
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
        <SpeakerInfo>
          <Icon
            src={`../../../../static/images/speakers/${
              content.speakers[0].id
            }_thumb.png`}
          />
          <div>
            <Text level="display1">{content.speakers[0].name}</Text>
            <Text level="body">{content.speakers[0].position}</Text>
          </div>
        </SpeakerInfo>
      </Wrapper>
    );
  }

  private onClick = () => {
    const { content, onClick } = this.props;
    onClick(content);
  };
}

const Wrapper = styled.div`
  border-radius: ${borderRadius.level1};
  background-color: ${colors.yuki};
  padding: 16px;
  box-sizing: border-box;
  transition: 300ms;
  cursor: pointer;

  @media screen and (min-width: 768px) {
    &:hover {
      transform: scale(1.08);
      box-shadow: ${boxShadow.level1};
    }
  }
`;

const ContentInfo = styled.div`
  margin-bottom: 16px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  > * {
    margin-right: 8px;

    &:last-child {
      margin-righ: 0;
    }
  }
`;

const Title = styled(Text).attrs({
  level: 'display1'
})`
  font-weight: bold;
  margin-bottom: 8px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 16px;

  > * {
    margin-right: 8px;
  }
`;

const Body = styled(Text).attrs({ level: 'body' })`
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const SpeakerInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 50%;
  margin-right: 20px;
`;

export default ContentGridItem;
