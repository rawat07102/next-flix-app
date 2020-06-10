import { NextPage } from "next";
import Router from "next/router";

import Layout from "../src/shared/components/Layout";
import ProfileSkeleton from "../src/shared/components/ProfileSkeleton";
import UserProfile from "../src/user/components/UserProfile";
import axios from "axios";
import clientAxios from "../src/shared/utils/axios";

const ProfilePage: NextPage = ({ data: userData }: any) => {
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
  if (!ctx.req) {
    try {
      const axiosRes = await clientAxios.get("/user/profile");
      return { data: axiosRes.data };
    } catch (err) {
      Router.push("/login");
      return {};
    }
  }

  try {
    const cookie = ctx.req?.headers.cookie;
    const axiosRes = await axios({
      url: "http://localhost:4000/user/profile",
      headers: cookie ? { cookie } : {},
    });
    return {
      data: axiosRes.data,
    };
  } catch (err) {
    ctx.res?.writeHead(307, {
      Location: "http://localhost:3000/",
    });
    ctx.res?.end();
    return {};
  }
};

export default ProfilePage;
