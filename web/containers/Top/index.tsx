import * as React from 'react';
import styled from 'styled-components';
import Header from './Header';
import MainVisual from './MainVisual';
import Footer from './Footer';
import { Section } from '../../components';
import { colors } from '../../components/styles';

const Top = () => (
  <Wrapper>
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
  </Wrapper>
);

const Wrapper = styled.div`
  background-color: ${colors.primary};
`;

const StyledHeader = styled(Header)`
  position: fixed;
  top: 0;
`;

const StyledSection = styled(Section)`
  margin-bottom: 128px;
`;

export default Top;
