import * as React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Default from '../../layout/Default';
import Header from './Header';
import MainVisual from './MainVisual';
import NewsSection from './NewsSection';
import AboutSection from './AboutSection';
import ContentSection from './ContentSection';
import TimetableSection from './TimetableSection';
import AccessSection from './AccessSection';
import { Content } from '../../types';

/* tslint:disable-next-line:no-var-requires */
const contentsData = require('../../static/json/contents.json');

interface State {
  isTopY: boolean;
}

class Top extends React.Component<{}, State> {
  public state = {
    isTopY: false
  };

  private contents?: Content[];

  public componentWillMount() {
    this.contents = contentsData.sessions;
  }

  public componentDidMount() {
    this.updateHeaderState();
    window.addEventListener('scroll', this.onScroll);
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  public render() {
    const { isTopY } = this.state;
    return (
      <Default>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-125147977-1', 'auto');
            ga('send', 'pageview');
          `
            }}
          />
        </Head>
        <StyledHeader isTopY={isTopY} />
        <MainVisual />
        <Body>
          <NewsSection />
          <AboutSection />
          <ContentSection contents={this.contents!} />
          <StyledTimetableSection contents={this.contents!} />
          <AccessSection />
        </Body>
      </Default>
    );
  }

  private onScroll = () => {
    this.updateHeaderState();
  };

  private updateHeaderState = () => {
    const scrollY = window.scrollY;
    const windowH = 300;
    let overScroll = false;

    // 100vh以上スクロールしていたら
    // Headerの背景を変更
    if (windowH > scrollY) {
      overScroll = true;
    }

    // 現状のステートと差分があれば更新
    if (this.state.isTopY === overScroll) {
      this.setState({ isTopY: !overScroll });
    }
  };
}

const StyledHeader = styled(Header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const Body = styled.div`
  width: 100%;
  padding: 32px 64px 64px;
  box-sizing: border-box;

  > * {
    margin-bottom: 160px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media screen and (max-width: 767px) {
    padding: 32px 8px;

    > * {
      margin-bottom: 80px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const StyledTimetableSection = styled(TimetableSection)`
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

export default Top;
