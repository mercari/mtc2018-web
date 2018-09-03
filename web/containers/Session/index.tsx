import * as React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { withRouter } from 'next/router';
import Default from '../../layout/Default';
import { Content } from '../../types';
import axios from '../../utils/axios';
import ContentCard from './ContentCard';
import Header from './Header';
import { Button, Section } from '../../components';

class Session extends React.Component {
  public static async getInitialProps() {
    const { data } = await axios.get('/static/json/contents.json');
    return { contents: data.sessions };
  }

  private content: Content;

  public componentWillMount() {
    // コンテンツ内容を取得
    const contentId = Number(this.props.router.query.id);
    this.content = this.props.contents.find(content => {
      return content.id === contentId;
    });
  }

  public render() {
    return (
      <Default>
        <StyledHeader />
        <Section title="SESSION">
          <ContentCard content={this.content} />
          <BackButton onClick={this.onClickBackButton}>BACK</BackButton>
        </Section>
      </Default>
    );
  }

  private onClickBackButton = () => {
    Router.push({
      pathname: `/2018`
    });
  };
}

const StyledHeader = styled(Header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const BackButton = styled(Button)`
  width: 200px;
  margin-top: 60px;
`;

export default withRouter(Session);
