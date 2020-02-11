import React from "react";
import useSWR, { trigger } from "swr";
import { useRouter } from "next/router";

import CustomImage from "../../components/common/CustomImage";
import RedError from "../../components/common/RedError";
import ArticleList from "../../components/home/ArticleList";
import EditProfileButton from "../../components/profile/EditProfileButton";
import FollowUserButton from "../../components/profile/FollowUserButton";
import ProfileTab from "../../components/profile/ProfileTab";
import api from "../../lib/api";
import PageContext from "../../lib/context/PageContext";
import PageCountContext from "../../lib/context/PageCountContext";
import useIsMounted from "../../lib/hooks/useIsMounted";
import storage from "../../lib/utils/storage";
import fetcher from "../../lib/utils/fetcher";

import { SERVER_BASE_URL } from "../../lib/utils/constant";

const Profile = ({ articles, profile: initialProfile }) => {
  const [isFollowing, setFollowing] = React.useState(false);
  const router = useRouter();
  const {
    query: { pid }
  } = router;

  React.useEffect(() => {
    setFollowing(following);
  }, []);

  /*
  Fetch remote data related with profile
  */
  const {
    data: fetchedProfile,
    error: profileError
  } = useSWR(`${SERVER_BASE_URL}/profiles/${pid}`, fetcher, { initialProfile });

  if (profileError) return <RedError message="Can't load profile" />;

  const { profile } = fetchedProfile || initialProfile;
  const { username, bio, image, following } = profile;

  const { data: currentUser } = useSWR("user", storage);
  const isUser = currentUser && username === currentUser.username;

  const handleFollow = async () => {
    const response = await fetch(`${SERVER_BASE_URL}/profiles/${pid}/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${encodeURIComponent(currentUser.token)}`
      }
    });
    const {
      profile: { following }
    } = await response.json();
    setFollowing(following);

    trigger(`${SERVER_BASE_URL}/profiles/${pid}`);
  };

  const handleUnfollow = async () => {
    const response = await fetch(`${SERVER_BASE_URL}/profiles/${pid}/follow`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${encodeURIComponent(currentUser.token)}`
      }
    });
    const {
      profile: { following }
    } = await response.json();

    setFollowing(following);

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
              <FollowUserButton
                isUser={isUser}
                username={username}
                following={isFollowing}
                follow={handleFollow}
                unfollow={handleUnfollow}
              />
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
            <ArticleList initialArticles={articles} />
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.getInitialProps = async ({ query: { pid } }) => {
  const profile = await api.Profile.get(pid);
  const articles = await api.Articles.byAuthor(pid);
  return { profile, articles };
};

export default Profile;
