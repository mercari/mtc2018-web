import * as React from 'react';
import styled from 'styled-components';
import MtcArt from 'mtc-art';

class Art extends React.PureComponent {
  private element?: HTMLElement;

  public componentDidMount() {
    // TODO any治す
    import('mtc-art').then((ArtModule: any) => {
      if (!this.element) {
        return;
      }
      const art: MtcArt = new ArtModule();
      this.element.appendChild(art.domElement);
      art.resize(this.element.clientWidth, this.element.clientHeight);
    });
  }

  public render() {
    return <Wrapper innerRef={this.setElement} {...this.props} />;
  }

  private setElement = (element: HTMLDivElement) => {
    this.element = element;
  };
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default Art;
