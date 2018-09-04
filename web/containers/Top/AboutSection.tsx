import * as React from 'react';
import styled from 'styled-components';
import { Text, Card, Section } from '../../components';
import { getTextStyle } from '../../components/styles';

const AboutSection: React.SFC<{}> = props => (
  <Section title="ABOUT" id="about" {...props}>
    <StyledCard>
      <Message>
        <p>
          Mercari Tech
          Conf（MTC）は、株式会社メルカリをはじめとするメルカリグループ各社が、これから目指す方向や、これから取り組む技術的なチャレンジについてご紹介するエンジニア向けの技術カンファレンスです。
        </p>

        <p>
          今年で第2回となる「Mercari Tech Conf
          2018」では、テーマを「Evolution（変化）」として、この1年間でメルカリグループ内に起こった、もしくは起こりつつある変化をご紹介します。
        </p>

        <p>
          各セッションに加え、昨年好評だった各エンジニアチームによる展示ブース、そしてお食事やお飲み物をご用意したAfter
          Party（懇親会）もございますので、是非エンジニア同士の交流の場としてもご活用ください。
        </p>

        <p>
          なお、各セッションには日本語・英語の同時通訳をご用意しております。
        </p>
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

  p {
    margin-top: 0;
    margin-bottom: 24px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export default AboutSection;
