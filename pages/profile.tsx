import {NextPage} from "next"
import {useRouter} from "next/router"

import Layout from "../src/shared/components/Layout"
import ProfileSkeleton from "../src/shared/components/ProfileSkeleton"
import UserProfile from "../src/user/components/UserProfile"

import {useAuth} from "../src/auth/hooks/useAuth"
import {useEffect} from "react"

const ProfilePage: NextPage = () => {
	const {user: userData, loggedIn} = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!loggedIn) {
			router.push("/")
		}
	}, [])

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
	)
}

export default ProfilePage
