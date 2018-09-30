import * as React from 'react';
import { IconButton } from '../../../components';

const facebookShareURL =
  'http://www.facebook.com/share.php?u=https://techconf.mercari.com/2018/';

class FacebookShareButton extends React.PureComponent {
  public render() {
    return (
      <IconButton
        src="../../../static/images/facebook.svg"
        alt="facebook share"
        onClick={this.onClick}
        {...this.props}
      />
    );
  }

  private onClick = () => {
    const a = document.createElement('a');
    a.href = facebookShareURL;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.click();
  };
}

export default FacebookShareButton;
