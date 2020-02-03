import React from "react";
import useSWR, { mutate, trigger } from "swr";
import { useRouter } from "next/router";

import storage from "../../lib/utils/storage";
import ArticleList from "../../components/home/ArticleList";
import RedError from "../../components/common/RedError";
import EditProfileButton from "../../components/profile/EditProfileButton";
import FollowUserButton from "../../components/profile/FollowUserButton";
import fetcher from "../../lib/utils/fetcher";
import ProfileTab from "../../components/profile/ProfileTab";
import api from "../../lib/api";
import useIsMounted from "../../lib/hooks/useIsMounted";
import { SERVER_BASE_URL } from "../../lib/utils/constant";

const Profile = ({ profile: initialProfile, articles: initialArticles }) => {
  const [page, setPage] = React.useState(0);
  const [isFollowing, setFollowing] = React.useState(false);
  const isMounted = useIsMounted();
  const router = useRouter();
  const {
    query: { pid, favorite }
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

  /*
  Fetch remote data related with articles
  */
  const fetchURL = !!favorite
    ? `${SERVER_BASE_URL}/articles?favorited=${username}`
    : `${SERVER_BASE_URL}/articles?author=${username}`;

  const { data: fetchedArticles, error: articleError } = useSWR(
    fetchURL,
    fetcher,
    {
      initialArticles
    }
  );

  if (articleError) {
    return (
      <div className="col-md-9">
        <div className="feed-toggle">
          <ul className="nav nav-pills outline-active"></ul>
        </div>
        <ListErrors errors={articleError} />
      </div>
    );
  }

  const { articles } = fetchedArticles || initialArticles;
  const totalPagesCount = articles.length;

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img
                src={image}
                className="user-img"
                alt="User's profile image"
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
            <ArticleList
              articles={articles}
              loading={isMounted && !fetchedArticles}
              totalPagesCount={totalPagesCount}
              currentPage={page}
              onSetPage={setPage}
            />
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
