import * as React from 'react';
import styled from 'styled-components';
import { I18n } from 'react-i18next';
import { Text, Button, Card, Section } from '../../../components';
import { colors } from '../../../components/styles';
import NewsList from './NewsList';
import { NewsListFragment } from '../../../graphql/generated/NewsListFragment';

interface Props {
  gqlData: NewsListFragment;
}

const NewsSection: React.SFC<Props> = ({ gqlData, ...props }) => (
  <Section title="NEWS" id="news" {...props}>
    <Wrapper>
      <StyledNewsList gqlData={gqlData} />
      <FollowButton
        type="primary"
        size="medium"
        href="https://twitter.com/intent/follow?screen_name=mercaridevjp"
        target="_blank"
      >
        FOLLOW US ON
        <ButtonIcon src="../static/images/twitter.svg" alt="twitter" />
      </FollowButton>
      <Message>
        <I18n>{t => t('follow_us_on_twitter')}</I18n>
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

const ButtonLink = Button.withComponent('a');
const FollowButton = styled(ButtonLink)`
  margin-bottom: 20px;
  text-decoration: none;

  @media screen and (max-width: 767px) {
    margin-bottom: 10px;
  }
`;

const ButtonIcon = styled.img`
  width: 24px;
  height: 20px;
  margin-left: 8px;
`;

const Message = styled(Text).attrs({
  level: 'body'
})`
  color: ${colors.secondary};
  text-align: center;
`;

export default NewsSection;
