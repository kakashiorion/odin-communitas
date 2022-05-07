export interface CommunityType {
  _id: string;
  name: string;
  creatorId: string;
  description: string;
  category: string;
  imageUrl: string;
  members: string[];
  createdAt: Date;
}

export interface CommentType {
  _id: string;
  content: string;
  postId: string;
  posterId: string;
  parentCommentId: string;
  upvotersId: string[];
  downvotersId: string[];
  createdAt: Date;
}

export interface PostType {
  _id: string;
  title: string;
  description: string;
  communityId: string;
  posterId: string;
  attachmentLink: string;
  upvotersId: string[];
  downvotersId: string[];
  commentsId: string[];
  tags: string[];
  createdAt: Date;
}

export interface UserType {
  _id: string;
  username: string;
  email: string;
  accessToken: string;
  tokens: string[];
  googleId: string;
  githubId: string;
  encryptedPassword: string;
  profileImageUrl: string;
  communities: string[];
  posts: string[];
  comments: string[];
  savedPostsId: string[];
  savedCommentsId: string[];
  createdAt: Date;
}
