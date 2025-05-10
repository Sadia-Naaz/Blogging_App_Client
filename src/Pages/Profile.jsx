import axios from "axios";
import React, { useEffect, useState} from "react";
import BlogContainer from "../components/BlogContainer";


function UserInfo() {
    const [user, setUser] = useState({});
    const [allFollowings, setAllFollowings] = useState([]);
    const [allFollowers, setAllFollowers] = useState([]);
    const [isFollowerList, setIsFollowerList] = useState(false);
    const [isFollowingList, setIsFollowingList] = useState(false);
    const [hasMoreFollowers, setHasMoreFollowers] = useState(true);
    const [hasMoreFollowings, setHasMoreFollowings] = useState(true);
    const [followerSkip, setFollowerSkip] = useState(0);
    const [followingSkip, setFollowingSkip] = useState(0);

    const LIMIT = 10;

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user/user-info', { withCredentials: true });
            console.log(response.data.UserInfo);
            setUser(response.data.UserInfo);
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const followerList = async (skipParam = 0) => {
        if (isFollowerList && skipParam === 0) return;
        try {
            const response = await axios.get(`http://localhost:8000/follow/follower-list?skip=${skipParam}`, { withCredentials: true });
            const newFollowers = response.data.followerDb;
            console.log(response.data)
            console.log("newFollowers",newFollowers)
            //console.log(newFollowers);
            if(newFollowers.length === 0){
                setHasMoreFollowings(false);
            }
            setAllFollowers((prevFollowers) => [
                ...prevFollowers.filter(follower => newFollowers && !newFollowers.some(newFollower => newFollower.follower && newFollower.follower._id === follower.follower._id)),
                ...newFollowers
            ]);
            setFollowerSkip(skipParam + newFollowers.length);
            setIsFollowerList(true);
        } catch (error) {
            setHasMoreFollowers(false);
            console.log(error);
        }
    };

    const followingList = async (skipParam = 0) => {
        if (isFollowingList && skipParam === 0) return;
        try {
            const response = await axios.get(`http://localhost:8000/follow/following-list?skip=${skipParam}`, { withCredentials: true });
            const newFollowings = response.data.followingDb;
            console.log("newFollowings",newFollowings);
            if(newFollowings.length===0){
                setHasMoreFollowings(false);
            }
            setAllFollowings((prevFollowings) => [
                ...prevFollowings.filter(following => newFollowings && !newFollowings.some(newFollowing => newFollowing.following._id === following.following._id)),
                ...newFollowings
            ]);
            setFollowingSkip(skipParam + newFollowings.length);
            setIsFollowingList(true);
        } catch (error) {
            setHasMoreFollowings(false);
            console.log(error);
        }
    };

    const unfollow = async (userId) => {
        try {
            await axios.post('http://localhost:8000/follow/unfollow-user', { unfollowId: userId }, { withCredentials: true });
            setAllFollowings((prevFollowings) => prevFollowings.filter(following => following.following._id !== userId));
        } catch (error) {
            console.log(error);
        }
    };

    return (
      <>
    
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
      <h3 className="text-2xl font-bold text-center mb-2">{user.name}</h3>
      <h4 className="text-lg text-gray-600 text-center mb-1">
        <span className="font-semibold">Username:</span> {user.username}
      </h4>
      <h4 className="text-lg text-gray-600 text-center mb-4">
        <span className="font-semibold">Email:</span> {user.email}
      </h4>

      <div className="flex justify-around mb-4">
        <div className="text-center">
          <p className="text-xl font-bold">{user.followerCount}</p>
          <button
            onClick={() => followerList()}
            className="text-blue-500 hover:underline"
          >
            Followers
          </button>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">{user.followingCount}</p>
          <button
            onClick={() => followingList()}
            className="text-blue-500 hover:underline"
          >
            Followings
          </button>
        </div>
      </div>

      {/* Followers List */}
      {isFollowerList && (
        <div className="border-t pt-4 mt-4">
          <h4 className="text-lg font-semibold mb-2">Followers</h4>
          {allFollowers.map(
            (follower) =>
              follower.follower && (
                <div key={follower.follower._id} className="flex justify-between items-center mb-2">
                  <p>{follower.follower.username}</p>
                </div>
              )
          )}
          {hasMoreFollowers && (
            <button
              onClick={() => followerList(followerSkip)}
              className="text-sm text-blue-500 hover:underline mr-2"
            >
              More
            </button>
          )}
          <button
            onClick={() => setIsFollowerList(false)}
            className="text-sm text-red-500 hover:underline"
          >
            Close
          </button>
        </div>
      )}

      {/* Following List */}
      {isFollowingList && (
        <div className="border-t pt-4 mt-4">
          <h4 className="text-lg font-semibold mb-2">Followings</h4>
          {allFollowings.map((following) => (
            <div
              key={following.following._id}
              className="flex justify-between items-center mb-2"
            >
              <p>{following.following.username}</p>
              <button
                onClick={() => unfollow(following.following._id)}
                className="text-sm text-red-500 hover:underline"
              >
                Unfollow
              </button>
            </div>
          ))}
          {hasMoreFollowings && (
            <button
              onClick={() => followingList(followingSkip)}
              className="text-sm text-blue-500 hover:underline mr-2"
            >
              More
            </button>
          )}
          <button
            onClick={() => setIsFollowingList(false)}
            className="text-sm text-red-500 hover:underline"
          >
            Close
          </button>
        </div>
      )}
    </div>
  </div>


      </>
    )
}
export default UserInfo;