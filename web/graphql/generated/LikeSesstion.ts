/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LikeSesstion
// ====================================================

export interface LikeSesstion_createLike_like {
  __typename: "Like";
  id: string;
  sessionId: string;
}

export interface LikeSesstion_createLike {
  __typename: "CreateLikePayload";
  clientMutationId: string | null;
  like: LikeSesstion_createLike_like;
}

export interface LikeSesstion {
  /**
   * セッションに対していいね！することができます。
   * ログイン周りのシステムはないので、リクエストにUUIDを付与してください（仕様未定）。
   */
  createLike: LikeSesstion_createLike | null;
}

export interface LikeSesstionVariables {
  randomId: string;
  sessionId: string;
}
