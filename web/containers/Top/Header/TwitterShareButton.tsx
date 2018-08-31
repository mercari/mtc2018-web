import * as React from 'react';
import styled from 'styled-components';
import { IconButton } from '../../../components';

const twitterShareText =
  'Mercari Tech Conf 2018 - October 4th. Find out the latest information at @mercaridevjp ! #mtc18 https://techconf.mercari.com/2018/';
const twitterShareURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
  twitterShareText
)}`;

class TwitterShareButton extends React.PureComponent {
  public render() {
    return (
      <IconButton
        src="../../../static/images/twitter.svg"
        alt="twitter share"
        onClick={this.onClick}
        {...this.props}
      />
    );
  }

  private onClick = () => {
    window.open(twitterShareURL, '_blank');
  };
}

export default TwitterShareButton;
