/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NewsListFragment
// ====================================================

export interface NewsListFragment_newsList_nodes {
  __typename: "News";
  id: string;
  date: string;
  message: string;
  messageJa: string;
  link: string | null;
}

export interface NewsListFragment_newsList {
  __typename: "NewsConnection";
  nodes: NewsListFragment_newsList_nodes[];
}

export interface NewsListFragment {
  __typename: "Query";
  /**
   * お知らせ一覧を取得します
   */
  newsList: NewsListFragment_newsList;
}
