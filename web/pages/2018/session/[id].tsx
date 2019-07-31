import * as React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Router, { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import Default from '../../../layout/Default';
import ContentCard, {
  CONTENT_CARD_FRAGMENT
} from '../../../containers/Session/ContentCard';
import Header from '../../../containers/Session/Header';
import { Button, Section } from '../../../components';
import { Translation } from 'react-i18next';
import { isJapan } from '../../../utils';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { WithTranslation } from 'next-i18next';
import { withTranslation } from '../../../i18n';
import {
  Session as SessionQuery,
  SessionVariables
} from '../../../graphql/generated/Session';

export const SESSION_QUERY = gql`
  query Session($sessionId: Int!) {
    session(sessionId: $sessionId) {
      ...SessionFragment
      ...ContentCardFragment
    }
  }

  fragment SessionFragment on Session {
    title
    titleJa
  }

  ${CONTENT_CARD_FRAGMENT}
`;

class SessionQueryComponent extends Query<SessionQuery, SessionVariables> {}

type Props = WithTranslation & WithRouterProps;

class Session extends React.Component<Props> {
  public render() {
    const sessionId = parseInt(this.props.router!.query!.id as string, 10);
    return (
      <Default>
        <SessionQueryComponent query={SESSION_QUERY} variables={{ sessionId }}>
          {({ data, error, loading }) => {
            if (error || loading || !data || !data.session) {
              return null;
            }

            return (
              <Translation ns={['common']}>
                {(_, { i18n }) => {
                  const isJa = isJapan(i18n.language);
                  const session = data.session!;
                  return (
                    <>
                      <Head>
                        <title>
                          Mercari Tech Conf 2018 -{' '}
                          {isJa ? session.titleJa : session.title}
                        </title>
                      </Head>
                      <StyledHeader />
                      <Body>
                        <Section title="SESSION">
                          <ContentCard session={data.session!} isJa={isJa} />
                          <BackButton
                            priority="primary"
                            size="large"
                            onClick={this.onClickBackButton}
                          >
                            BACK
                          </BackButton>
                        </Section>
                      </Body>
                    </>
                  );
                }}
              </Translation>
            );
          }}
        </SessionQueryComponent>
      </Default>
    );
  }

  private onClickBackButton = () => {
    Router.back();
  };
}

const StyledHeader = styled(Header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const Body = styled.div`
  width: 100%;
  padding: 96px 64px 64px;
  box-sizing: border-box;

  > * {
    margin-bottom: 160px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media screen and (max-width: 767px) {
    padding: 32px 8px;

    > * {
      margin-bottom: 80px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const BackButton = styled(Button)`
  width: 200px;
  margin-top: 60px;
`;

export default withTranslation('common')(withRouter(Session));
