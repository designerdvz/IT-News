import { create } from 'zustand'

export const useNewsStore = create<any>(set => ({
	news: [],
	skeletons: [...new Array(20)],
	currentNew: {},
	setCurrentNew: obj => set(() => ({ currentNew: obj })),
	setNews: async () => {
		const resultId = await fetch(
			'https://hacker-news.firebaseio.com/v0/newstories.json'
		)
		const jsonId = await resultId.json()
		jsonId.slice(0, 100).forEach(async id => {
			const resultNew = await fetch(
				`https://hacker-news.firebaseio.com/v0/item/${id}.json`
			)
			const jsonNew = await resultNew.json()
			set(state => ({
				news: [...state.news, jsonNew]
			}))
		})
	},
	clearNews: () => set(() => ({ news: [] }))
}))
