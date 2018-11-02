import * as React from 'react';
import styled from 'styled-components';
import { NamespacesConsumer } from 'react-i18next';
import { Button } from '../../../components';
import { isJapan } from '../../../utils';

class LanguageToggleButton extends React.PureComponent {
  public render() {
    return (
      <NamespacesConsumer ns={['common']}>
        {(_, { i18n }) => {
          const isJa = isJapan(i18n.language);
          const onClick = () => i18n.changeLanguage(isJa ? 'en-US' : 'ja-JP');
          const from = isJa ? 'JA' : 'EN';
          const to = isJa ? 'EN' : 'JA';
          return (
            <Wrapper onClick={onClick} size="small" {...this.props}>
              {from}
              <img src="/static/images/icn_arrow.svg" />
              {to}
            </Wrapper>
          );
        }}
      </NamespacesConsumer>
    );
  }
}

const Wrapper = styled(Button)`
  img {
    margin: 0 8px 1px;
  }
`;

export default LanguageToggleButton;
