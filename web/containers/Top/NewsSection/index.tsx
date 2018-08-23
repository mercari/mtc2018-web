import * as React from 'react';
import styled from 'styled-components';
import { Text, Button, Section } from '../../../components';
import { colors } from '../../../components/styles';
import NewsList from './NewsList';
import { news } from '../../../store/news';

const NewsSection: React.SFC<{}> = props => (
  <Section title="NEWS" id="news" {...props}>
    <Wrapper>
      <StyledNewsList news={news} />
      <FollowButton>FOLLOW US ON</FollowButton>
      <Message>
        公式twitterアカウント( @mercaridevjp
        )にて情報を発信していきます。ぜひフォローをお願いします。
      </Message>
    </Wrapper>
  </Section>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledNewsList = styled(NewsList)`
  margin-bottom: 40px;
`;

const FollowButton = styled(Button)`
  margin-bottom: 20px;
`;

const Message = styled(Text).attrs({
  level: 'caption'
})`
  color: ${colors.secondary};
`;

export default NewsSection;
