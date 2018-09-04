import * as React from 'react';
import styled from 'styled-components';
import Router, { withRouter } from 'next/router';
import Default from '../../layout/Default';
import { Content } from '../../types';
import ContentCard from './ContentCard';
import Header from './Header';
import { Button, Section } from '../../components';

/* tslint:disable-next-line:no-var-requires */
const contentsData = require('../../static/json/contents.json');

interface Props {
  router: any; // TODO
}

class Session extends React.Component<Props> {
  private content?: Content;

  public componentWillMount() {
    // コンテンツ内容を取得
    const contentId = Number(this.props.router!.query!.id);
    this.content = contentsData.sessions.find((content: Content) => {
      return content.id === contentId;
    });
  }

  public render() {
    return (
      <Default>
        <Header />
        <Body>
          <Section title="SESSION">
            <ContentCard content={this.content!} />
            <BackButton type="primary" onClick={this.onClickBackButton}>
              BACK
            </BackButton>
          </Section>
        </Body>
      </Default>
    );
  }

  private onClickBackButton = () => {
    Router.push('/2018').then(() => window.scrollTo(0, 0));
  };
}

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

const BackButton = styled(Button)`
  width: 200px;
  margin-top: 60px;
`;

export default withRouter(Session);
