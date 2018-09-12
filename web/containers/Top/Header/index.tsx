import * as React from 'react';
import styled from 'styled-components';
import HeaderPC from './HeaderPC';
import HeaderSP from './HeaderSP';
import { Subscription } from 'rxjs';
import { createNetworkStatusObserver } from '../../../utils';
import * as notification from '../../../utils/notification';

interface Props {
  isTopY: boolean;
}

interface State {
  online: boolean;
  pushPermission: NotificationPermission | undefined;
}

class Header extends React.Component<Props, State> {
  public subscription = new Subscription();

  public state = {
    online: true,
    pushPermission: undefined
  };

  public componentDidMount() {
    // networkStatus
    // window.navigatorを見に行くのでconstructorでは実行しない
    const sub = createNetworkStatusObserver().subscribe(online => {
      this.setState({ online });
    });
    this.subscription.add(sub);

    // pushNotificationPermission
    if (notification.supported()) {
      const sub2 = notification
        .createPermissionObserver()
        .subscribe(pushPermission => {
          this.setState({ pushPermission });
        });
      this.subscription.add(sub2);
    }
  }

  public componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  public enablePush = () => {
    notification.requestPermission();
  };

  public sendPush = () => {
    notification.sendTestPush();
  };

  public render() {
    return (
      <div>
        <StyledHeaderPC
          {...this.props}
          {...this.state}
          enablePush={this.enablePush}
          sendPush={this.sendPush}
        />
        <StyledHeaderSP {...this.props} />
      </div>
    );
  }
}

const StyledHeaderPC = styled(HeaderPC)`
  display: flex;
  @media screen and (max-width: 960px) {
    display: none;
  }
`;

const StyledHeaderSP = styled(HeaderSP)`
  display: none;
  @media screen and (max-width: 960px) {
    display: flex;
  }
`;

export default Header;
