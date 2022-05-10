import axios from "axios";
import { getCookie } from "cookies-next";
import { server } from "../config";
import { CommunityType, UserType, PostType, CommentType } from "./types";

//----------------------------
//Community server calls
export async function getCommunities() {
  const res = await axios.get(`${server}/api/communities`);
  const result: CommunityType[] = await res.data;
  return result;
}
export async function getCommunityById(communityId: String) {
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
  communityId: String,
  communityObject: CommunityType
) {
  const res = await axios.put(
    `${server}/api/communities/${communityId}`,
    communityObject
  );
  const result: CommunityType = await res.data;
  return result;
}

export async function deleteCommunityById(communityId: String) {
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

export async function updateUserById(userId: String, userObject: UserType) {
  const res = await axios.put(`${server}/api/users/${userId}`, userObject);
  const result: UserType = await res.data;
  return result;
}

export async function deleteUserById(userId: String) {
  const res = await axios.delete(`${server}/api/users/${userId}`);
  const result: UserType = await res.data;
  return result;
}

//TODO: Fetch currentUser
// export async function getCurrentUser() {
//   const currentUserId = getCookie("user");
//   let currentUser = null;
//   if (currentUserId) {
//     currentUser = await getUserById(currentUserId);
//   }
//   return currentUser ?? null;
// }

//----------------------------
//Posts server calls
export async function getPosts() {
  const res = await axios.get(`${server}/api/posts`);
  const result: PostType[] = await res.data;
  return result;
}

export async function getPostById(postId: String) {
  const res = await axios.get(`${server}/api/posts/${postId}`);
  const result: PostType = await res.data;
  return result;
}

export async function getPostsByCommunityId(communityId: String) {
  const res = await axios.get(`${server}/api/posts/communities/${communityId}`);
  const result: PostType[] = await res.data;
  return result;
}

export async function getPostsByUserId(userId: String) {
  const res = await axios.get(`${server}/api/posts/users/${userId}`);
  const result: PostType[] = await res.data;
  return result;
}

export async function createPost(postObject: PostType) {
  const res = await axios.post(`${server}/api/posts`, postObject);
  const result: PostType = await res.data;
  return result;
}

export async function updatePostById(postId: String, postObject: PostType) {
  const res = await axios.put(`${server}/api/posts/${postId}`, postObject);
  const result: PostType = await res.data;
  return result;
}

export async function deletePostById(postId: String) {
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

export async function getCommentById(postId: String) {
  const res = await axios.get(`${server}/api/comments/${postId}`);
  const result: CommentType = await res.data;
  return result;
}

export async function getCommentsByUserId(userId: String) {
  const res = await axios.get(`${server}/api/comments/users/${userId}`);
  const result: CommentType[] = await res.data;
  return result;
}

export async function getParentCommentsByPostId(postId: String) {
  const res = await axios.get(`${server}/api/comments/posts/${postId}`);
  const result: CommentType[] = await res.data;
  return result;
}

export async function getChildCommentsByParentId(parentCommentId: String) {
  const res = await axios.get(
    `${server}/api/comments/children/${parentCommentId}`
  );
  const result: CommentType[] = await res.data;
  return result;
}
export async function createComment(postObject: CommentType) {
  const res = await axios.post(`${server}/api/comments`, postObject);
  const result: CommentType = await res.data;
  return result;
}

export async function updateCommentById(
  postId: String,
  postObject: CommentType
) {
  const res = await axios.put(`${server}/api/comments/${postId}`, postObject);
  const result: CommentType = await res.data;
  return result;
}

export async function deleteCommentById(postId: String) {
  const res = await axios.delete(`${server}/api/comments/${postId}`);
  const result: CommentType = await res.data;
  return result;
}
