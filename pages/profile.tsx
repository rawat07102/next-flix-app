import { NextPage } from "next";
import { useRouter } from "next/router";

import Layout from "../src/shared/components/Layout";
import ProfileSkeleton from "../src/shared/components/ProfileSkeleton";
import UserProfile from "../src/user/components/UserProfile";
import { useContext } from "react";
import { AuthContext } from "../src/auth/context/auth.context";

const ProfilePage: NextPage = ({}) => {
  const userData = useContext(AuthContext);

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
