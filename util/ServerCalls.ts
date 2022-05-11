import axios from "axios";
import { server } from "../config";
import { CommunityType, UserType, PostType, CommentType } from "./types";

//----------------------------
//Community server calls
export async function getCommunities() {
  const res = await axios.get(`${server}/api/communities`);
  const result: CommunityType[] = await res.data;
  return result;
}
export async function getCommunityById(communityId: string) {
  const res = await axios.get(`${server}/api/communities/${communityId}`);
  const result: CommunityType = await res.data;
  return result;
}

export async function createCommunity(communityObject: CommunityType) {
  const res = await axios.post(`${server}/api/communities`, communityObject);
  const result: CommunityType = await res.data;
  return result;
}

export async function updateCommunityById(
  communityId: string,
  communityObject: CommunityType
) {
  const res = await axios.put(
    `${server}/api/communities/${communityId}`,
    communityObject
  );
  const result: CommunityType = await res.data;
  return result;
}

export async function deleteCommunityById(communityId: string) {
  const res = await axios.delete(`${server}/api/communities/${communityId}`);
  const result: CommunityType = await res.data;
  return result;
}

//----------------------------
//User server calls
export async function getUsers() {
  const res = await axios.get(`${server}/api/users`);
  const result: UserType[] = await res.data;
  return result;
}

export async function getUserById(userId: string) {
  const res = await axios.get(`${server}/api/users/${userId}`);
  const result: UserType = await res.data;
  return result;
}

export async function createUser(userObject: UserType) {
  const res = await axios.post(`${server}/api/users`, userObject);
  const result: UserType = await res.data;
  return result;
}

export async function updateUserById(userId: string, userObject: UserType) {
  const res = await axios.put(`${server}/api/users/${userId}`, userObject);
  const result: UserType = await res.data;
  return result;
}

export async function deleteUserById(userId: string) {
  const res = await axios.delete(`${server}/api/users/${userId}`);
  const result: UserType = await res.data;
  return result;
}

//----------------------------
//Posts server calls
export async function getPosts() {
  const res = await axios.get(`${server}/api/posts`);
  const result: PostType[] = await res.data;
  return result;
}

export async function getPostById(postId: string) {
  const res = await axios.get(`${server}/api/posts/${postId}`);
  const result: PostType = await res.data;
  return result;
}

export async function getPostsByCommunityId(communityId: string) {
  const res = await axios.get(`${server}/api/posts/communities/${communityId}`);
  const result: PostType[] = await res.data;
  return result;
}

export async function getPostsByUserId(userId: string) {
  const res = await axios.get(`${server}/api/posts/users/${userId}`);
  const result: PostType[] = await res.data;
  return result;
}

export async function createPost(postObject: PostType) {
  const res = await axios.post(`${server}/api/posts`, postObject);
  const result: PostType = await res.data;
  return result;
}

export async function updatePostById(postId: string, postObject: PostType) {
  const res = await axios.put(`${server}/api/posts/${postId}`, postObject);
  const result: PostType = await res.data;
  return result;
}

export async function deletePostById(postId: string) {
  const res = await axios.delete(`${server}/api/posts/${postId}`);
  const result: PostType = await res.data;
  return result;
}

//----------------------------
//Comments server calls
export async function getComments() {
  const res = await axios.get(`${server}/api/comments`);
  const result: CommentType[] = await res.data;
  return result;
}

export async function getCommentById(commentId: string) {
  const res = await axios.get(`${server}/api/comments/${commentId}`);
  const result: CommentType = await res.data;
  return result;
}

export async function getCommentsByUserId(userId: string) {
  const res = await axios.get(`${server}/api/comments/users/${userId}`);
  const result: CommentType[] = await res.data;
  return result;
}

export async function getParentCommentsByPostId(postId: string) {
  const res = await axios.get(`${server}/api/comments/posts/${postId}`);
  const result: CommentType[] = await res.data;
  return result;
}

export async function getChildCommentsByParentId(parentCommentId: string) {
  const res = await axios.get(
    `${server}/api/comments/children/${parentCommentId}`
  );
  const result: CommentType[] = await res.data;
  return result;
}
export async function createComment(commentObject: CommentType) {
  const res = await axios.post(`${server}/api/comments`, commentObject);
  const result: CommentType = await res.data;
  return result;
}

export async function updateCommentById(
  commentId: string,
  commentObject: CommentType
) {
  const res = await axios.put(
    `${server}/api/comments/${commentId}`,
    commentObject
  );
  const result: CommentType = await res.data;
  return result;
}

export async function deleteCommentById(commentId: string) {
  const res = await axios.delete(`${server}/api/comments/${commentId}`);
  const result: CommentType = await res.data;
  return result;
}
