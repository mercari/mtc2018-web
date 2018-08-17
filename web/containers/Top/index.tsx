import * as React from 'react';
import styled from 'styled-components';
import Header from './Header';
import MainVisual from './MainVisual';
import Footer from './Footer';
import { Section } from '../../components';
import Art from './Art';

const Top = () => (
  <Wrapper>
    <StyledArt />
    <Content>
      <StyledHeader />
      <MainVisual />
      <StyledSection title="NEWS" id="news">
        ここにニュースを入れます
      </StyledSection>
      <StyledSection title="ABOUT" id="about">
        ここにSessionとかコンテンツ内容が入ります
      </StyledSection>
      <StyledSection title="CONTENTS" id="contents">
        ここにSessionとかコンテンツ内容が入ります
      </StyledSection>
      <StyledSection title="ACCESS" id="access">
        ここに地図とかが入ります
      </StyledSection>
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

const StyledSection = styled(Section)`
  margin-bottom: 128px;
`;

const StyledArt = styled(Art)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
`;

export default Top;
