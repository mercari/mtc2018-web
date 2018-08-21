import * as React from 'react';
import styled from 'styled-components';
import Header from './Header';
import MainVisual from './MainVisual';
import Footer from './Footer';
import NewsSection from './NewsSection';
import AboutSection from './AboutSection';
import ContentSection from './ContentSection';
import AccessSection from './AccessSection';
import Art from './Art';

const Top = () => (
  <Wrapper>
    <StyledArt />
    <Content>
      <StyledHeader />
      <MainVisual />
      <NewsSection />
      <AboutSection />
      <ContentSection />
      <AccessSection />
      <Footer />
    </Content>
  </Wrapper>
);

const Wrapper = styled.div``;

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const StyledHeader = styled(Header)`
  position: fixed;
  top: 0;
`;

const StyledArt = styled(Art)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
`;

export default Top;
