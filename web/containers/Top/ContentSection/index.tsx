import * as React from 'react';
import Router from 'next/router';
import { Section } from '../../../components';
import { Content } from '../../../types';
import ContentGrid from './ContentGrid';

interface Props {
  contents: Content[];
}

class ContentSection extends React.PureComponent<Props> {
  public render() {
    const { contents } = this.props;
    return (
      <Section title="CONTENTS" id="contents" {...this.props}>
        <ContentGrid contents={contents} onClickItem={this.onClickItem} />
      </Section>
    );
  }

  private onClickItem(content: Content) {
    Router.push(
      `/2018/session/detail?id=${content.id}`,
      `/2018/session/${content.id}`
    );
  }
}

export default ContentSection;
