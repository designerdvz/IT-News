//@ts-ignore
import React, { useEffect } from 'react'
import s from './newsPage.module.css'
import { Link } from 'react-router-dom'
import { useNewsStore } from '../../store/newsStore'
import { shallow } from 'zustand/shallow'
import logo from '../../assets/images/logo.jpg'
import CachedIcon from '@mui/icons-material/Cached'
import { useCommentsStore } from '../../store/commentsStore'
import StarIcon from '@mui/icons-material/Star'
import { getData } from '../../utils/getData'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import { useInView } from 'react-intersection-observer'

function NewsPage() {
	const [reload, setReload] = React.useState(false)
	const setNews = useNewsStore(state => state.setNews)
	const clearNews = useNewsStore(state => state.clearNews)
	const clearNewsIds = useNewsStore(state => state.clearNewsIds)
	const viewSketetons = useNewsStore(state => state.viewSketetons)
	const newsArray = useNewsStore(state => state.news, shallow)
	const newsIds = useNewsStore(state => state.newsIds)
	const skeletons = useNewsStore(state => state.skeletons)
	const setCurrentNew = useNewsStore(state => state.setCurrentNew)
	const clearEndArray = useNewsStore(state => state.clearEndArray)
	const getComments = useCommentsStore(state => state.getComments)
	const clearComments = useCommentsStore(state => state.clearComments)
	const { ref, inView } = useInView({
		threshold: 0.5
	})

	console.log('массив новостей', newsArray)
	console.log('массив ID', newsIds)

	useEffect(() => {
		 !newsArray.length && setNews()
	}, [])


	useEffect(() => {
		if (inView && (newsIds.length <= 80) && (newsIds.length >= 10) ) {
			console.log(newsIds.length);
			console.log('inView-', inView)
			setNews()
		}
	}, [inView])

	const [rep, setRep] = React.useState(false)

	useEffect(() => {
		const interval = setInterval(() => {
			window.scrollTo(0,0)
			clearEndArray()
			clearNews()
			clearNewsIds()
			viewSketetons()
			setNews()
			setRep(!rep)
		}, 60000)
		return () => clearInterval(interval)
	}, [rep])

	console.log(inView)

	return (
		<div className={s.wrapper}>
			<img className={s.logo} src={logo}></img>
			<button
				className={s.reload}
				onClick={() => {
					clearEndArray()
					clearNews()
					clearNewsIds()
					viewSketetons()
					setNews()
				}}
			>
				<CachedIcon />
			</button>
			<div className={s.List}>
				{newsArray.map((newStory, i) => (
					<Link to={`/new/${newStory?.id}`} key={i}>
						<div
							className={s.item}
							onClick={() => {
								setCurrentNew(newStory)
								clearComments()
								getComments(newStory.id)
							}}
						>
							<div className={s.title}>{newStory?.title}</div>
							<div className={s.itemInfo}>
								<span className={s.scoreBy}>
									{newStory?.score}{' '}
									<div className={s.starIcon}>
										<StarIcon />
									</div>{' '}
									By: {newStory?.by}
								</span>
								<span className={s.time}>{getData(newStory?.time)}</span>
							</div>
						</div>
					</Link>
				))}
				{skeletons.map((k, ind) => (
					<div className={s.skeletons} ref={ind == 0 ? ref : null}>
						<Stack spacing={1}>
							<Skeleton variant='rounded' height={95} />
						</Stack>
					</div>
				))}
			</div>
		</div>
	)
}

export default NewsPage
