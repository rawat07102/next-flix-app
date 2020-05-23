import { FunctionComponent } from "react";
import Layout from "../src/shared/components/Layout";
import useAuth from "../src/shared/hooks/useAuth";
import NotAuthorized from "../src/shared/components/NotAuthorized";
import ProfileSkeleton from "../src/shared/components/ProfileSkeleton";
import UserProfile from "../src/user/components/UserProfile";

const ProfilePage: FunctionComponent = () => {
  const { userData: data, error } = useAuth();

  if (error) return <NotAuthorized />;

  return (
    <Layout>
      {data ? (
        <UserProfile user={data} />
      ) : (
        <div>
          <ProfileSkeleton />
        </div>
      )}
    </Layout>
  );
};

export default ProfilePage;
