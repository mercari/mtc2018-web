import React, { ImgHTMLAttributes } from 'react';

type Props = ImgHTMLAttributes<HTMLImageElement>;

export class LazyImage extends React.Component<Props> {
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
    entries.filter(e => e.isIntersecting).forEach(entry => {
      this.setState({ show: true });
      observer.unobserve(entry.target);
    });
  };

  public render() {
    const { src, ...props } = this.props;
    return (
      <img
        ref={this.imgRef}
        className="lazy"
        src={this.state.show ? src : ''}
        {...props}
      />
    );
  }
}
