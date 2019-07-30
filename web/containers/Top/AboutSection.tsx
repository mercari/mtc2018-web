import * as React from 'react';
import { Translation } from 'react-i18next';
import styled from 'styled-components';
import { Text, Card, Section } from '../../components';
import { getTextStyle } from '../../components/styles';

const AboutSection: React.SFC<{}> = props => (
  <Section title="ABOUT" id="about" {...props}>
    <StyledCard>
      <Translation ns={['common']}>
        {t => (
          <Message>
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <p>{t('about.p3')}</p>
            <p>{t('about.p4')}</p>
          </Message>
        )}
      </Translation>
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
