import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../../../components';
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
  margin-bottom: 24px;
  display: flex;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ListItemDate = styled(Text).attrs({
  level: 'display1'
})`
  width: 128px;
  margin-right: 8px;
`;

const ListItemMessage = styled(Text).attrs({
  level: 'display2'
})``;

export default NewsList;
