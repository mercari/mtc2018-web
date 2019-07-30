import * as React from 'react';
import styled from 'styled-components';
import { Text, Card, Section } from '../../components';
import { colors, getTextStyle } from '../../components/styles';
import { Translation } from 'react-i18next';
import { joinWithBr } from '../../utils';

const AccessSection: React.SFC<{}> = props => (
  <Section title="ACCESS" id="access" {...props}>
    <Translation ns={['common']}>
      {t => (
        <StyledCard>
          <div>
            <Title>{t('access.title')}</Title>
            <Url>academyhills.com</Url>
            <Address>{t('access.address')}</Address>
          </div>
          <Map
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.6932250736577!2d139.7268930153612!3d35.659929180199256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b7708e8d3bb%3A0x3b88edeca0e1ff0e!2z44Ki44Kr44OH44Of44O844OS44Or44K6!5e0!3m2!1sja!2sjp!4v1535306139896"
            width="600"
            height="450"
            frameBorder="0"
            style={{ border: 0 }}
          />
          <div>
            <AccessTitle>{t('access.train.title')}</AccessTitle>
            <Text level="body">
              {joinWithBr(t('access.train.texts', { returnObjects: true }))}
            </Text>
          </div>
          <div>
            <AccessTitle>{t('access.bus.title')}</AccessTitle>
            <AccessSubTite>{t('access.bus.fromShibuya.title')}</AccessSubTite>
            <AccessBody>
              {joinWithBr(
                t('access.bus.fromShibuya.texts', { returnObjects: true })
              )}
            </AccessBody>
            <AccessSubTite>{t('access.bus.fromShimbashi.title')}</AccessSubTite>
            <AccessBody>
              {joinWithBr(
                t('access.bus.fromShimbashi.texts', { returnObjects: true })
              )}
            </AccessBody>
          </div>
          <Link
            href="http://forum.academyhills.com/roppongi/access/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('access.linkToAcademyHills')}
          </Link>
        </StyledCard>
      )}
    </Translation>
  </Section>
);

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 920px;
  display: flex;
  flex-direction: column;
  padding: 60px;

  > * {
    margin-bottom: 40px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media screen and (max-width: 767px) {
    padding: 40px 20px;
  }
`;

const Title = styled(Text).attrs({ level: 'display2' })`
  margin-bottom: 8px;
  text-align: center;
  font-weight: bold;
`;

const Url = styled(Text).attrs({ level: 'body' })`
  text-align: center;
  margin-bottom: 24px;
`;

const Address = styled(Text).attrs({ level: 'body' })`
  text-align: center;
`;

const Map = styled.iframe.attrs({
  title: 'map'
})`
  width: 100%;
  height: 320px;
`;

const AccessTitle = styled(Text).attrs({ level: 'display1' })`
  margin-bottom: 8px;
`;

const AccessSubTite = styled(Text).attrs({ level: 'caption' })`
  margin-bottom: 4px;
`;

const AccessBody = styled(Text).attrs({ level: 'body' })`
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Link = styled.a`
  ${getTextStyle('display1')};
  color: ${colors.secondary};
  text-decoration: none;
`;

export default AccessSection;
