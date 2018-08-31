import * as React from 'react';
import styled from 'styled-components';
import { Text, Card } from '../../components';
import { colors, getTextStyle } from '../../components/styles';
import Section from './Section';

const AccessSection: React.SFC<{}> = props => (
  <Section title="ACCESS" id="access" {...props}>
    <StyledCard>
      <div>
        <Title>六本木アカデミーヒルズ</Title>
        <Url>academyhills.com</Url>
        <Address>
          〒106-0032 東京都港区六本木６丁目１０ 六本木6−10−1 森タワー49階
        </Address>
      </div>
      <Map
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.6932250736577!2d139.7268930153612!3d35.659929180199256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b7708e8d3bb%3A0x3b88edeca0e1ff0e!2z44Ki44Kr44OH44Of44O844OS44Or44K6!5e0!3m2!1sja!2sjp!4v1535306139896"
        width="600"
        height="450"
        frameBorder="0"
        style={{ border: 0 }}
      />
      <div>
        <AccessTitle>電車でお越しの場合</AccessTitle>
        <Text level="body">
          東京メトロ 日比谷線「六本木」駅1C出口より徒歩3分（コンコースにて直結）
          <br />
          都営地下鉄 大江戸線「六本木」駅3出口より徒歩6分
        </Text>
      </div>
      <div>
        <AccessTitle>バスでお越しの場合</AccessTitle>
        <AccessSubTite>渋谷駅より</AccessSubTite>
        <AccessBody>
          都バス都RH01系統【渋谷駅前⇔六本木ヒルズ】／「六本木ヒルズ」「六本木ヒルズけやき坂」下車（約15分）
          <br />
          都バス
          都01系統【渋谷駅前⇔新橋駅前】／「EXシアター六本木前」下車（約14分）
        </AccessBody>
        <AccessSubTite>新橋駅より</AccessSubTite>
        <AccessBody>
          都バス 都01系統【新橋駅前⇔渋谷駅前
          】／「EXシアター六本木前」下車（約16分）
        </AccessBody>
      </div>
      <Link
        href="http://forum.academyhills.com/roppongi/access/"
        target="_blank"
      >
        アカデミーヒルズまでのアクセス（アカデミーヒルズ公式サイトへ）
      </Link>
    </StyledCard>
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

const Map = styled.iframe`
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
