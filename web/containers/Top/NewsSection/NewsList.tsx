import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../../../components';
import { getTextStyle } from '../../../components/styles';
import { News } from '../../../store/news';

interface Props {
  news: News[];
}

const NewsList: React.SFC<Props> = ({ news, ...props }) => (
  <Wrapper {...props}>
    {news.map(newsItem => (
      <ListItem key={newsItem.id}>
        <ListItemDate>{newsItem.date}</ListItemDate>
        <ListItemMessage>{newsItem.message}</ListItemMessage>
      </ListItem>
    ))}
  </Wrapper>
);

const Wrapper = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }

  @media screen and (max-width: 767px) {
    align-items: start;
    flex-direction: column;
    margin-bottom: 16px;
  }
`;

const ListItemDate = styled(Text).attrs({
  level: 'display1'
})`
  width: 128px;
  margin-right: 8px;

  @media screen and (max-width: 767px) {
    margin-bottom: 8px;
  }
`;

const ListItemMessage = styled(Text)`
  ${getTextStyle('display2')};

  @media screen and (max-width: 767px) {
    ${getTextStyle('body')};
  }
`;

export default NewsList;
