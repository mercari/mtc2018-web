/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NewsQuery
// ====================================================

export interface NewsQuery_news {
  __typename: "News";
  id: string;
  date: string;
  message: string;
  messageJa: string;
  link: string | null;
}

export interface NewsQuery {
  /**
   * お知らせ一覧を取得します
   */
  news: NewsQuery_news[];
}
