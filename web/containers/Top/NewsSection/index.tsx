import * as React from 'react';
import styled from 'styled-components';
import { Text, Button, Card } from '../../../components';
import { colors } from '../../../components/styles';
import Section from '../Section';
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

const Wrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 920px;
  padding: 60px;

  @media screen and (max-width: 767px) {
    padding: 40px 20px;
  }
`;

const StyledNewsList = styled(NewsList)`
  margin-bottom: 40px;
`;

const FollowButton = styled(Button)`
  margin-bottom: 20px;

  @media screen and (max-width: 767px) {
    margin-bottom: 10px;
  }
`;

const Message = styled(Text).attrs({
  level: 'body'
})`
  color: ${colors.secondary};
  text-align: center;
`;

export default NewsSection;
