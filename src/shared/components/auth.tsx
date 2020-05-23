// import { NextPage } from "next";
// import useSwr from "swr";
// import { useRequest } from "../utils/useRequest";
// import NotAuthorized from "./NotAuthorized";

// const auth = (WrappedComponent: NextPage<any>) => {
//   return (...props: any) => {
//     const { data, error } = useSwr("/user/profile", useRequest);

//     if (error) return <NotAuthorized />;

//     return data ? (
//       <WrappedComponent user={data} {...props} />
//     ) : (
//       <h1>Loading...</h1>
//     );
//   };
// };

// export default auth;
