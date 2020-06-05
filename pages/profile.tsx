import { NextPage } from "next";
import { useContext } from "react";

import { AuthContext } from "../src/auth/context/auth.context";

import Layout from "../src/shared/components/Layout";
import ProfileSkeleton from "../src/shared/components/ProfileSkeleton";
import UserProfile from "../src/user/components/UserProfile";
import NotAuthorized from "../src/shared/components/NotAuthorized";

const ProfilePage: NextPage = () => {
  const userData = useContext(AuthContext);

  if (!userData) return <NotAuthorized />;

  return (
    <Layout>
      {userData ? (
        <UserProfile user={userData} />
      ) : (
        <div>
          <ProfileSkeleton />
        </div>
      )}
    </Layout>
  );
};

export default ProfilePage;
