import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../../../../components';
import { colors, borderRadius } from '../../../../components/styles';
import { Speaker } from '../../../../store/contents';

interface Props {
  speaker: Speaker;
}

const ContentModalSpeaker: React.SFC<Props> = ({ speaker }) => (
  <Wrapper>
    <Photo src={speaker.iconUrl} />
    <div>
      <Header>
        <Title>SPEAKER</Title>
        <div>
          <Name>{speaker.name}</Name>
          <Text level="body">{speaker.position}</Text>
        </div>
        <Buttons>
          <Button />
          <Button />
        </Buttons>
      </Header>
      <Body>{speaker.body}</Body>
    </div>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
`;

const Photo = styled.img`
  width: 280px;
  height: 280px;
  border-radius: ${borderRadius.level1};
  background-color: ${colors.primary};
  margin-right: 40px;
`;

const Header = styled.div`
  margin-bottom: 16px;
  position: relative;
`;

const Title = styled(Text).attrs({
  level: 'display2'
})`
  margin-bottom: 16px;
`;

const Name = styled(Text).attrs({
  level: 'display2'
})`
  margin-bottom: 4px;
`;

const Buttons = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: right;

  > * {
    margin-left: 16px;

    &:first-child {
      margin-left: 0;
    }
  }
`;

const Button = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${colors.primary};
`;

const Body = styled(Text).attrs({
  level: 'display1'
})`
  text-align: justify;
  text-justify: inter-ideograph;
`;

export default ContentModalSpeaker;
