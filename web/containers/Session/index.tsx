import * as React from 'react';
import { withRouter } from 'next/router';
import { Content } from '../../types';
import axios from '../../utils/axios';
import ContentCard from './ContentCard';

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
      <div>
        <ContentCard content={this.content} />
      </div>
    );
  }
}

export default withRouter(Session);
