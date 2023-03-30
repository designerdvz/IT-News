import { create } from 'zustand'
import { ICommentsStore } from './storeTypes/CommentsStoreTypes'

export const useCommentsStore = create<ICommentsStore>(set => ({
	comments: [],
	kids: [],
	getComments: async id => {
		const result = await fetch(
			`https://hacker-news.firebaseio.com/v0/item/${id}.json`
		)
		const json = await result.json() //новость выбранная
		json?.kids?.forEach(async idComment => {
			//каждый комментарий этой новости
			const resultComment = await fetch(
				`https://hacker-news.firebaseio.com/v0/item/${idComment}.json`
			)
			const jsonComment = await resultComment.json()
			set(state => ({
				comments: [...state.comments, jsonComment]
			}))
		})
	},

	clearComments: () => {
		set(state => ({
			comments: []
		}))
	}
}))
