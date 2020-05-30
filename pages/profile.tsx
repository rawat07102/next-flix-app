import Layout from "../src/shared/components/Layout";
import ProfileSkeleton from "../src/shared/components/ProfileSkeleton";
import UserProfile from "../src/user/components/UserProfile";
import { NextPage } from "next";
import { UserDTO } from ".";
import useSWR from "swr";
import { useRouter } from "next/router";

interface props {
  data?: UserDTO;
  error?: string;
}

const ProfilePage: NextPage<props> = () => {
  const router = useRouter();
  const { data: userData } = useSWR("/user/profile", {
    onError: () => {
      router.replace("/login");
    },
  });

  // if (error) router.replace("/login");

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
