import { create } from 'zustand'

export const useCommentsStore = create<any>(set => ({
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
