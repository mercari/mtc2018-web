import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../../../components';
import { colors } from '../../../components/styles';
import { Content } from '../../../store/contents';

interface Props {
  content: Content;
}

const ContentInfo: React.SFC<Props> = ({ content, ...props }) => (
  <div {...props}>
    <Header>
      <Type>{content.type.label}</Type>
      <Place>{content.place}</Place>
      <Time>
        {content.startTime}-{content.endTime}
      </Time>
    </Header>
    <Title>{content.title}</Title>
    <Tags>
      {content.tags.map(tag => (
        <Tag key={tag.id}>#{tag.label}</Tag>
      ))}
    </Tags>
    <Body>{content.body}</Body>
  </div>
);

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Type = styled(Text).attrs({
  level: 'display1'
})`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  border-radius: 15px;
  padding: 0 16px;
  background-color: ${colors.primary};
  color: ${colors.yuki};
  margin-right: 8px;
`;

const Place = styled(Text).attrs({
  level: 'display2'
})`
  margin-right: 8px;
`;

const Time = styled(Text).attrs({
  level: 'display2'
})``;

const Title = styled(Text).attrs({
  level: 'display1'
})`
  font-weight: bold;
  margin-bottom: 8px;
`;

const Tags = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

const Tag = styled(Text).attrs({
  level: 'display1'
})`
  margin-right: 8px;

  &:last-child {
    margin-right: 0;
  }
`;

const Body = styled(Text).attrs({
  level: 'body'
})``;

export default ContentInfo;
