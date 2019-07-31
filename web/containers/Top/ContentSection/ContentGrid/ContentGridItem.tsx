import * as React from 'react';
import { Translation } from 'react-i18next';
import styled from 'styled-components';
import moment from 'moment';
import { Text, Tip, LazyImage } from '../../../../components';
import { colors, borderRadius, boxShadow } from '../../../../components/styles';
import { omitText, isJapan } from '../../../../utils';
import gql from 'graphql-tag';
import { ContentGridItemFragment } from '../../../../graphql/generated/ContentGridItemFragment';
import { Content } from '../../../../types';

export const CONTENT_GRID_ITEM_FRAGMENT = gql`
  fragment ContentGridItemFragment on Session {
    id
    sessionId
    title
    titleJa
    startTime
    endTime
    type
    place
    outline
    outlineJa
    tags
    speakers {
      id
      speakerId
      name
      nameJa
      position
      positionJa
    }
  }
`;

interface Props {
  index: number;
  session: ContentGridItemFragment;
  onClick: (sessionId: number) => void;
}

const getTip = (type: Content['type']) => {
  switch (type) {
    case 'keynote':
      return <Tip type="important">KEYNOTE</Tip>;
    case 'opening':
      return <Tip type="important">OPENING</Tip>;
    case 'session':
    default:
      return <Tip type="normal">SESSION</Tip>;
  }
};

class ContentGridItem extends React.PureComponent<Props> {
  public render() {
    const { session, onClick, ...props } = this.props;
    const startTime = moment(session.startTime).format('HH:mm');
    const endTime = moment(session.endTime).format('HH:mm');
    return (
      <Wrapper onClick={this.onClick} {...props}>
        <Translation ns={['common']}>
          {(_, { i18n }) => {
            const isJa = isJapan(i18n.language);
            return (
              <>
                <ContentInfo>
                  <Header>
                    {getTip(session.type)}
                    <HeaderDetail>
                      <Text level="display2">{session.place}</Text>
                      <Text level="display2">
                        {startTime}-{endTime}
                      </Text>
                    </HeaderDetail>
                  </Header>
                  <Title>{isJa ? session.titleJa : session.title}</Title>
                  <Tags>
                    {session.tags!.map(tag => (
                      <Text level="display1" key={tag}>
                        #{tag}
                      </Text>
                    ))}
                  </Tags>
                  <Body>
                    {omitText(isJa ? session.outlineJa : session.outline, 100)}
                  </Body>
                </ContentInfo>
                <div>
                  {session.speakers!.map(speaker => (
                    <SpeakerInfo key={speaker.id}>
                      <Icon
                        src={`/2018/static/images/speakers/${
                          speaker.speakerId
                        }_thumb.png`}
                        webpSrc={`/2018/static/images/speakers/${
                          speaker.speakerId
                        }_thumb.webp`}
                        alt={isJa ? speaker.nameJa : speaker.name}
                      />
                      <div>
                        <Text level="display1">
                          {isJa ? speaker.nameJa : speaker.name}
                        </Text>
                        <Text level="body">
                          {isJa ? speaker.positionJa : speaker.position}
                        </Text>
                      </div>
                    </SpeakerInfo>
                  ))}
                </div>
              </>
            );
          }}
        </Translation>
      </Wrapper>
    );
  }

  private onClick = () => {
    const { session, onClick } = this.props;
    onClick(session.sessionId);
  };
}

const Wrapper = styled.div`
  border-radius: ${borderRadius.level1};
  background-color: ${colors.yuki};
  padding: 16px;
  box-sizing: border-box;
  transition: 300ms;
  cursor: pointer;

  @media screen and (min-width: 768px) {
    &:hover {
      transform: scale(1.08);
      box-shadow: ${boxShadow.level1};
    }
  }
`;

const ContentInfo = styled.div`
  margin-bottom: 16px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 8px;

  > * {
    margin-right: 8px;
    margin-bottom: 8px;

    &:last-child {
      margin-righ: 0;
    }
  }
`;

const HeaderDetail = styled.div`
  display: flex;
  align-items: center;

  > * {
    margin-right: 8px;

    &:last-child {
      margin-righ: 0;
    }
  }
`;

const Title = styled(Text).attrs({
  level: 'display1'
})`
  font-weight: bold;
  margin-bottom: 8px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 16px;

  > * {
    margin-right: 8px;
  }
`;

const Body = styled(Text).attrs({ level: 'body' })`
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const SpeakerInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Icon = styled(LazyImage)`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  margin-right: 20px;
`;

export default ContentGridItem;
