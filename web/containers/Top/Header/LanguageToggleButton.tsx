import * as React from 'react';
import { I18n } from 'react-i18next';
import { Button } from '../../../components';
import { isJapan } from '../../../utils';

class LanguageToggleButton extends React.PureComponent {
  public render() {
    return (
      <I18n>
        {(_, { i18n }) => {
          const isJa = isJapan(i18n.language);
          const onClick = () => i18n.changeLanguage(isJa ? 'en-US' : 'ja-JP');
          return (
            <Button onClick={onClick} size="small" {...this.props}>
              {isJa ? 'JA → EN' : 'EN → JA'}
            </Button>
          );
        }}
      </I18n>
    );
  }
}

export default LanguageToggleButton;
