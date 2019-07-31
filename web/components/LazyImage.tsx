import React, { ImgHTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  webpSrc: string;
}

class LazyImage extends React.Component<Props> {
  public state = {
    show: false
  };

  public observer!: IntersectionObserver;
  public imgRef: React.RefObject<HTMLImageElement>;

  constructor(props: Props) {
    super(props);

    this.imgRef = React.createRef();
  }

  public componentDidMount() {
    this.observer = new IntersectionObserver(this.handleObserved);
    this.observer.observe(this.imgRef.current!);
  }

  public componentWillUnmount() {
    this.observer.unobserve(this.imgRef.current!);
  }

  public handleObserved = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries
      .filter(e => e.isIntersecting)
      .forEach(entry => {
        this.setState({ show: true });
        observer.unobserve(entry.target);
      });
  };

  public render() {
    const { src, alt, webpSrc, ...props } = this.props;
    return (
      <Wrapper innerRef={this.imgRef} {...props}>
        <source type="image/webp" srcSet={this.state.show ? webpSrc : ''} />
        <img src={this.state.show ? src : ''} alt={alt} />
      </Wrapper>
    );
  }
}

const Wrapper = styled.picture`
  > * {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

export default LazyImage;
