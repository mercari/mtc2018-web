import * as React from 'react';
import styled from 'styled-components';
import Header from './Header';
import MainVisual from './MainVisual';
import { Section } from '../../components';
import Footer from './Footer';

const Top = () => (
  <>
    <StyledHeader />
    <MainVisual />
    <Section title="NEWS">ここにニュースを入れます</Section>
    <Section title="CONTENTS">
      ここにSessionとかコンテンツ内容が入ります
    </Section>
    <Section title="ACCESS">ここに地図とかが入ります</Section>
    <Footer />
  </>
);

const StyledHeader = styled(Header)`
  position: fixed;
  top: 0;
`;

export default Top;
