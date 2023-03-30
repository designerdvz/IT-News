import React, { Fragment } from 'react'
import s from './comments.module.css'
import { useNewsStore } from '../../store/newsStore'
import { useCommentsStore } from '../../store/commentsStore'
import PersonIcon from '@mui/icons-material/Person'
import CachedIcon from '@mui/icons-material/Cached'

function Comments() {
	const currentNew = useNewsStore(state => state.currentNew)
	const comments = useCommentsStore(state => state.comments)
	const getComments = useCommentsStore(state => state.getComments)
	const clearComments = useCommentsStore(state => state.clearComments)
	const [kid, setKid] = React.useState([])
	const [kidId, setKidId] = React.useState(0)
	const [commentsCount, setCommentsCount] = React.useState(
		currentNew.descendants
	)

	function paintComms(ids) {
		return ids?.map(async (id, i) => {
			const resultKids = await fetch(
				`https://hacker-news.firebaseio.com/v0/item/${id}.json`
			)
			const obj = await resultKids.json()
			return (
				<div
					onClick={() => {
						if ('kids' in obj) {
							paintComms(obj?.kids)
						} else return null
					}}
					key={i}
				>
					<div className={s.commentBy}>
						<div className={s.userIcon}>
							<PersonIcon />
						</div>
						{obj.by}
					</div>
					<div>{obj.text}</div>
				</div>
			)
		})
	}

	function reloadComments() {
		clearComments()
		getComments(currentNew.id)
		setCommentsCount(currentNew.descendants)
	}

	return (
		<div className={s.wrapper}>
			<div className={s.comments}>
				{commentsCount} commentaries
				<div
					onClick={() => {
						reloadComments()
					}}
					className={s.reloadIcon}
				>
					<CachedIcon />
				</div>
			</div>
			<hr></hr>
			{comments?.map(comment => (
				<Fragment key={comment?.id}>
					<div
						className={s.comment}
						onClick={() => {
							if ('kids' in comment) {
								paintComms(comment?.kids)?.[0].then(data => {
									setKid(data.props.children)
									setKidId(comment?.id)
								})
							}
						}}
					>
						<div className={s.commentBy}>
							<div className={s.userIcon}>
								<PersonIcon />
							</div>
							{comment.by}
						</div>
						<div className={s.text}>{comment.text}</div>
						{kidId == comment.id ? (
							<div className={s.kidText}>{kid}</div>
						) : null}
					</div>
				</Fragment>
			))}
		</div>
	)
}

export default Comments
