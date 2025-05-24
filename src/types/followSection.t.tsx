import { Follower, Following } from "./cabinet.t";

export interface FollowSectionProps {
  followers: Follower[],
  following: Following[],
  follow: (followerId: string, followingId: string) => Promise<void>
  unFollow: (followerId: string, followingId: string) => Promise<void>
}