import * as React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { WithTranslation } from 'next-i18next';
import Default from '../../layout/Default';
import Header from '../../containers/Top/Header';
import MainVisual from '../../containers/Top/MainVisual';
import NewsSection from '../../containers/Top/NewsSection';
import AboutSection from '../../containers/Top/AboutSection';
import ContentSection from '../../containers/Top/ContentSection';
import ExhibitionSection from '../../containers/Top/ExhibitionSection';
import TimetableSection, {
  TIMETABLE_SECTION_FRAGMENT
} from '../../containers/Top/TimetableSection';
import AccessSection from '../../containers/Top/AccessSection';
import { withTranslation } from '../../i18n';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Top as TopQuery } from '../../graphql/generated/Top';
import { NEWS_LIST_FRAGMENT } from '../../containers/Top/NewsSection/NewsList';
import { CONTENT_GRID_FRAGMENT } from '../../containers/Top/ContentSection/ContentGrid';

export const TOP_QUERY = gql`
  query Top {
    ...NewsListFragment
    ...ContentGridFragment
    ...TimetableSectionFragment
  }
  ${NEWS_LIST_FRAGMENT}
  ${CONTENT_GRID_FRAGMENT}
  ${TIMETABLE_SECTION_FRAGMENT}
`;

class TopQueryComponent extends Query<TopQuery> {}

type Props = WithTranslation;

class Top extends React.PureComponent<Props> {
  static getInitialProps() {
    return { namespacesRequired: ['common'] };
  }

  public render() {
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
          <title>Mercari Tech Conf 2018</title>
        </Head>
        <StyledHeader />
        <MainVisual />
        <Body>
          <TopQueryComponent query={TOP_QUERY}>
            {({ loading, error, data }) => {
              if (error) {
                return null;
              }
              if (loading || !data || !data.newsList) {
                return null;
              }

              return (
                <>
                  <NewsSection gqlData={data} />
                  <AboutSection />
                  <ContentSection gqlData={data} />
                  <StyledTimetableSection gqlData={data} />
                  <ExhibitionSection />
                </>
              );
            }}
          </TopQueryComponent>
          <AccessSection />
        </Body>
      </Default>
    );
  }
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
    padding-top: 80px;
    margin-bottom: 80px;

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

export default withTranslation()(Top);
