import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import useSWR, { mutate, trigger } from "swr";

import ArticleList from "../../components/article/ArticleList";
import CustomImage from "../../components/common/CustomImage";
import ErrorMessage from "../../components/common/ErrorMessage";
import Maybe from "../../components/common/Maybe";
import EditProfileButton from "../../components/profile/EditProfileButton";
import FollowUserButton from "../../components/profile/FollowUserButton";
import ProfileTab from "../../components/profile/ProfileTab";
import ArticleAPI from "../../lib/api/article";
import UserAPI from "../../lib/api/user";
import useRequest from "../../lib/hooks/useRequest";
import checkLogin from "../../lib/utils/checkLogin";
import { SERVER_BASE_URL } from "../../lib/utils/constant";
import storage from "../../lib/utils/storage";

const Profile = ({ initialProfile, initialArticles }) => {
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  const { data: fetchedProfile, error: profileError } = useRequest(
    { url: `${SERVER_BASE_URL}/profiles/${encodeURIComponent(String(pid))}` },
    { initialData: initialProfile }
  );

  if (profileError) return <ErrorMessage message="Can't load profile" />;

  const { profile } = fetchedProfile || initialProfile;
  const { username, bio, image, following } = profile;
  const { data: currentUser } = useSWR("user", storage);

  const isLoggedIn = checkLogin(currentUser);
  const isUser = currentUser && username === currentUser?.username;

  const handleFollow = async () => {
    mutate(
      `${SERVER_BASE_URL}/profiles/${pid}`,
      { profile: { ...profile, following: true } },
      false
    );
    await axios.put(
      `${SERVER_BASE_URL}/profiles/${pid}/follow`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${encodeURIComponent(currentUser?.token)}`,
        },
      }
    );
    trigger(`${SERVER_BASE_URL}/profiles/${pid}`);
  };

  const handleUnfollow = async () => {
    mutate(
      `${SERVER_BASE_URL}/profiles/${pid}`,
      { profile: { ...profile, following: true } },
      true
    );
    await axios.delete(`${SERVER_BASE_URL}/profiles/${pid}/follow`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${encodeURIComponent(currentUser?.token)}`,
      },
    });
    trigger(`${SERVER_BASE_URL}/profiles/${pid}`);
  };

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <CustomImage
                src={image}
                alt="User's profile image"
                className="user-img"
              />
              <h4>{username}</h4>
              <p>{bio}</p>
              <EditProfileButton isUser={isUser} />
              <Maybe test={isLoggedIn}>
                <FollowUserButton
                  isUser={isUser}
                  username={username}
                  following={following}
                  follow={handleFollow}
                  unfollow={handleUnfollow}
                />
              </Maybe>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ProfileTab profile={profile} />
            </div>
            <ArticleList initialArticles={initialArticles} />
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.getInitialProps = async ({ query: { pid } }) => {
  const { data: initialProfile } = await UserAPI.get(pid);
  const { data: initialArticles } = await ArticleAPI.byAuthor(pid);
  return { initialProfile, initialArticles };
};

export default Profile;
