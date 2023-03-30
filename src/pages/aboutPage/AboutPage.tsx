import React from 'react'
import s from './aboutPage.module.css'
import { Link } from 'react-router-dom'
import { useNewsStore } from '../../store/newsStore'
import { getData } from '../../utils/getData'
import Comments from '../../components/comments/Comments'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

function AboutPage() {
	const currentNew = useNewsStore(state => state.currentNew)

	return (
		<div className={s.wrapper}>
			<Link to='/' className={s.back}>
				<KeyboardBackspaceIcon />
			</Link>
			<h1 className={s.title}>
				<a href={currentNew.url} className={s.url} target={'_blank'}>
					{currentNew.title}
				</a>
			</h1>
			<div className={s.time}>{getData(currentNew.time)}</div>
			<div className={s.by}>by: {currentNew.by}</div>
			<a href={currentNew.url} className={s.url} target={'_blank'}>
				ссылка на статью
			</a>
			<Comments />
		</div>
	)
}

export default AboutPage
