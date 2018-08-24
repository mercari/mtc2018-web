import * as React from 'react';
import styled from 'styled-components';
import { colors, borderRadius, boxShadow } from '../../../components/styles';
import { Content } from '../../../store/contents';
import ContentInfo from './ContentInfo';
import SpeakerInfo from './SpeakerInfo';

interface Props {
  content: Content;
}

const ContentItem: React.SFC<Props> = ({ content }) => (
  <Wrapper>
    <StyledContentInfo content={content} />
    <SpeakerInfo speaker={content.speaker} />
  </Wrapper>
);

const Wrapper = styled.div`
  border-radius: ${borderRadius.level1};
  background-color: ${colors.yuki};
  padding: 16px;
  transition: 300ms;

  &:hover {
    cursor: pointer;
    transform: scale(1.03);
    box-shadow: ${boxShadow.level1};
  }
`;

const StyledContentInfo = styled(ContentInfo)`
  margin-bottom: 16px;
`;

export default ContentItem;
