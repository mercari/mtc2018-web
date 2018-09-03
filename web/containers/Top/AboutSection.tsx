import * as React from 'react';
import styled from 'styled-components';
import { Text, Card, Section } from '../../components';
import { getTextStyle } from '../../components/styles';

const AboutSection: React.SFC<{}> = props => (
  <Section title="ABOUT" id="about" {...props}>
    <StyledCard>
      <Message>
        「Mercari Tech
        Conf」は、株式会社メルカリをはじめとするメルカリグループ各社が、これから目指す方向や、これから取り組む技術的なチャレンジについてご紹介するエンジニア向けの技術カンファレンスです。
      </Message>
    </StyledCard>
  </Section>
);

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 920px;
  padding: 60px;

  @media screen and (max-width: 767px) {
    padding: 40px 20px;
  }
`;

const Message = styled(Text).attrs({
  level: 'display2'
})`
  text-align: center;
  line-height: 36px;

  @media screen and (max-width: 767px) {
    ${getTextStyle('body')};
    line-height: 22px;
  }
`;

export default AboutSection;
