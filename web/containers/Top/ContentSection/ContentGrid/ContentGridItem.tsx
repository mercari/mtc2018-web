import * as React from 'react';
import styled from 'styled-components';
import { Text, Tip } from '../../../../components';
import { colors, borderRadius, boxShadow } from '../../../../components/styles';
import { Content } from '../../../../store/contents';

interface Props {
  index: number;
  content: Content;
  onClick: (index: number) => void;
}

class ContentGridItem extends React.PureComponent<Props> {
  public render() {
    const { content, onClick, ...props } = this.props;
    return (
      <Wrapper onClick={this.onClick} {...props}>
        <ContentInfo>
          <Header>
            <Tip>{content.type.label}</Tip>
            <Text level="display2">{content.place}</Text>
            <Text level="display2">
              {content.startTime}-{content.endTime}
            </Text>
          </Header>
          <Title>{content.title}</Title>
          <Tags>
            {content.tags.map(tag => (
              <Text level="display1" key={tag.id}>
                #{tag.label}
              </Text>
            ))}
          </Tags>
          <Body>{content.body}</Body>
        </ContentInfo>
        <SpeakerInfo>
          <Icon src={content.speaker.iconUrl} />
          <div>
            <Text level="display1">{content.speaker.name}</Text>
            <Text level="body">{content.speaker.position}</Text>
          </div>
        </SpeakerInfo>
      </Wrapper>
    );
  }

  private onClick = () => {
    const { index, onClick } = this.props;
    onClick(index);
  };
}

const Wrapper = styled.div`
  border-radius: ${borderRadius.level1};
  background-color: ${colors.yuki};
  padding: 16px;
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
  border-radius: 50%;
  background-color: ${colors.primary};
  margin-right: 20px;
`;

export default ContentGridItem;
