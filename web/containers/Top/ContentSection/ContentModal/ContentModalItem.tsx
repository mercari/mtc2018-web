import * as React from 'react';
import styled from 'styled-components';
import { Text, Tip } from '../../../../components';
import { colors, borderRadius } from '../../../../components/styles';
import { Content } from '../../../../store/contents';
import ContentModalSpeaker from './ContentModalSpeaker';

interface Props {
  index: number;
  content: Content;
}

class ContentModalItem extends React.PureComponent<Props> {
  public render() {
    const { content, ...props } = this.props;
    return (
      <Wrapper {...props}>
        <ContentInfo>
          <Header>
            <Tip>{content.type.label}</Tip>
            <Text level="display2">{content.place}</Text>
            <Text level="display2">
              {content.startTime}-{content.endTime}
            </Text>
            <Tags>
              {content.tags.map(tag => (
                <Text level="display1" key={tag.id}>
                  #{tag.label}
                </Text>
              ))}
            </Tags>
          </Header>
          <Title>{content.title}</Title>
          <Text level="display1">{content.body}</Text>
        </ContentInfo>
        <ContentModalSpeaker speaker={content.speaker} />
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
`;

const ContentInfo = styled.div`
  margin-bottom: 80px;
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

  > * {
    margin-right: 8px;
  }
`;

const Title = styled(Text).attrs({
  level: 'display2'
})`
  font-weight: bold;
  margin-bottom: 8px;
`;

export default ContentModalItem;
