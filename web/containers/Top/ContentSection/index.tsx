import * as React from 'react';
import Router from 'next/router';
import { Section } from '../../../components';
import ContentGrid from './ContentGrid';
import { AllSessions_sessions } from '../../../graphql/generated/AllSessions';

interface Props {
  sessions: AllSessions_sessions;
}

class ContentSection extends React.PureComponent<Props> {
  public render() {
    return (
      <Section title="CONTENTS" id="contents" {...this.props}>
        <ContentGrid
          sessions={this.props.sessions}
          onClickItem={this.onClickItem}
        />
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
