import { create } from 'zustand'
import { ICommentsStore } from './storeTypes/CommentsStoreTypes'

export const useCommentsStore = create<ICommentsStore>(set => ({
	comments: [],
	kids: [],
	getComments: async id => {
		const result = await fetch(
			`https://hacker-news.firebaseio.com/v0/item/${id}.json`
		)
		const json = await result.json().catch(e => new Error(e.name, e.message))
		json?.kids?.forEach(async idComment => {
			const resultComment = await fetch(
				`https://hacker-news.firebaseio.com/v0/item/${idComment}.json`
			)
			const jsonComment = await resultComment
				.json()
				.catch(e => new Error(e.name, e.message))
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
