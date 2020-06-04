import { NextPage } from "next";

import Layout from "../src/shared/components/Layout";
import ProfileSkeleton from "../src/shared/components/ProfileSkeleton";
import UserProfile from "../src/user/components/UserProfile";
import { useContext } from "react";
import { AuthContext } from "../src/auth/context/auth.context";
import axios from "../src/shared/utils/axios";

const ProfilePage: NextPage = () => {
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

ProfilePage.getInitialProps = async (ctx) => {
  const cookie = ctx.req?.headers.cookie || "";
  try {
    const response = await axios.get("/user/profile", {
      headers: {
        Cookie: cookie,
        "content-type": "application/json",
        Accept: "/",
      },
    });
    return {
      data: response.data,
    };
  } catch (err) {
    ctx.res?.writeHead(303, {
      Location: "http://next-flix-app.herokuapp.com",
    });
    ctx.res?.end();
  }

  return {
    data: {},
  };
};

export default ProfilePage;
