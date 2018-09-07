import * as React from 'react';
import { I18n } from 'react-i18next';
import styled from 'styled-components';

const img = {
  en: '/static/images/en.svg',
  ja: '/static/images/ja.svg'
};

class LanguageToggleButton extends React.PureComponent {
  public render() {
    return (
      <I18n>
        {(_, { i18n }) => {
          const isJa = i18n.language === 'ja-JP';
          const onClick = () => i18n.changeLanguage(isJa ? 'en-US' : 'ja-JP');
          return (
            <Wrapper onClick={onClick}>
              <img src={isJa ? img.en : img.ja} alt="toggle language" />
            </Wrapper>
          );
        }}
      </I18n>
    );
  }
}

const Wrapper = styled.button`
  margin-left: 20px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  &:hover {
    opacity: 0.5;
  }
`;

export default LanguageToggleButton;
