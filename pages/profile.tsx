import Layout from "../src/shared/components/Layout";
import useAuth from "../src/shared/hooks/useAuth";
import NotAuthorized from "../src/shared/components/NotAuthorized";
import ProfileSkeleton from "../src/shared/components/ProfileSkeleton";
import UserProfile from "../src/user/components/UserProfile";
import { NextPage } from "next";
import { UserDTO } from ".";
// import axios from "../src/shared/utils/axios";

interface props {
  data?: UserDTO;
  error?: string;
}

const ProfilePage: NextPage<props> = () => {
  const { userData, error } = useAuth();

  if (error) return <NotAuthorized />;

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

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   try {
//     const apiRes = await axios.get("/user/profile", {
//       headers: {
//         cookie: ctx.req.headers.cookie,
//       },
//     });
//     return {
//       props: {
//         data: apiRes.data,
//       },
//     };
//   } catch (err) {
//     console.log(err);
//     ctx.res.writeHead(303, {
//       Location: "http://localhost:3000/login",
//     });
//   }
//   return { props: {} };
};

export default ProfilePage;
