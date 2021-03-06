import {NextPage, GetServerSideProps} from "next"
import {useRouter} from "next/router"
import useSwr from "swr"

import Image from "material-ui-image"

import {MovieDto} from "../../src/movie/dto/movie.dto"
import {api} from "../../src/shared/utils/api"

import Layout from "../../src/shared/components/Layout"
import {Typography, Grid, makeStyles, Button} from "@material-ui/core"
import {useEffect, useState} from "react"

interface Props {
	data: MovieDto
	trailer: string
}

const useStyles = makeStyles((theme) => ({
	rootContainer: {},
	headContainer: {},
	bodyContainer: {
		marginTop: theme.spacing(1),
	},
	mediaContainer: {},
	trailerContainer: {
		height: "100%",
	},
	header: {},
	subHeader: {},
	body: {
		marginLeft: theme.spacing(1),
	},
	title: {
		fontSize: "3rem",
		maxWidth: "80%",
	},
	overview: (props) => ({
		display: props ? "none" : "flex",
	}),
	hiddenOverview: {
		marginTop: theme.spacing(1),
	},
	trailerButton: {
		marginTop: "4px",
	},
	poster: {},
}))

const MoviePage: NextPage<Props> = ({data: movie, trailer}) => {
	const [show, setShow] = useState(false)
	const classes = useStyles(show)
	const router = useRouter()
	const {id} = router.query
	const {data, error} = useSwr(`/movie/${id}`, {
		initialData: movie,
	})
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(false)
	}, [])

	if (error) return <h1>Error</h1>

	return (
		<Layout>
			<Grid container className={classes.rootContainer}>
				<Grid
					container
					item
					justify="space-between"
					className={classes.headContainer}>
					{/* <Grid xs={3} item container justify="center"> */}
					<Typography variant="h2" className={classes.title} noWrap>
						{data?.title}
					</Typography>
					{/* </Grid> */}
					<Typography variant="subtitle1">
						{data?.release_date}
					</Typography>
				</Grid>

				<Grid
					container
					item
					justify="space-between"
					wrap="nowrap"
					className={classes.bodyContainer}>
					<Grid item xs={4} className={classes.mediaContainer}>
						<Image
							src={
								!isLoading
									? `https://image.tmdb.org/t/p/w500/${data?.poster_path}`
									: ""
							}
							aspectRatio={3 / 4}
							disableSpinner
							alt={data?.title}></Image>
						<Button
							variant="contained"
							color="secondary"
							fullWidth
							className={classes.trailerButton}
							onClick={() => setShow((prev) => !prev)}>
							Trailer
						</Button>
					</Grid>
					<Grid container item className={classes.body}>
						<Typography
							variant="body2"
							className={classes.overview}>
							{data?.overview}
						</Typography>
						{show && (
							<Grid
								item
								container
								className={classes.trailerContainer}>
								<iframe
									width="100%"
									src={`https://www.youtube.com/embed/${trailer}`}></iframe>
							</Grid>
						)}
					</Grid>
				</Grid>
				{show && (
					<Grid container item className={classes.hiddenOverview}>
						<Typography variant="body2">
							{data?.overview}
						</Typography>
					</Grid>
				)}
			</Grid>
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
	const {id} = query
	const apiRes = await api.get(`/movie/${id}`)
	const trailer = await api.get(`/movie/${id}/trailer`)
	return {
		props: {
			data: apiRes.data,
			trailer: trailer.data,
		},
	}
}

export default MoviePage
