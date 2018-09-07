import * as React from 'react';
import Router from 'next/router';
import { Section } from '../../../components';
import ContentGrid from './ContentGrid';
import { ContentGridFragment } from '../../../graphql/generated/ContentGridFragment';

interface Props {
  data: ContentGridFragment;
}

class ContentSection extends React.PureComponent<Props> {
  public render() {
    return (
      <Section title="CONTENTS" id="contents" {...this.props}>
        <ContentGrid data={this.props.data} onClickItem={this.onClickItem} />
      </Section>
    );
  }

  private onClickItem(sessionId: number) {
    Router.push(
      `/2018/session/detail?id=${sessionId}`,
      `/2018/session/${sessionId}`
    ).then(() => window.scrollTo(0, 0));
  }
}

export default ContentSection;
