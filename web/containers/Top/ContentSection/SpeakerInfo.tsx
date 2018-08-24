import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../../../components';
import { colors } from '../../../components/styles';
import { Speaker } from '../../../store/contents';

interface Props {
  speaker: Speaker;
}

const SpeakerInfo: React.SFC<Props> = ({ speaker }) => (
  <Wrapper>
    <Icon src={speaker.iconUrl} />
    <div>
      <Name>{speaker.name}</Name>
      <Position>{speaker.position}</Position>
    </div>
  </Wrapper>
);

const Wrapper = styled.div`
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

const Name = styled(Text).attrs({
  level: 'display1'
})``;

const Position = styled(Text).attrs({
  level: 'body'
})``;

export default SpeakerInfo;
