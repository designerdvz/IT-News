import { create } from 'zustand'
import {INewsStore} from './storeTypes/NewsStoreTypes'

export const useNewsStore = create<INewsStore>((set, get) => ({
	news: [],
	skeletons: [...new Array(20)],
	currentNew: {
		descendants: null,
		url: '',
		title: '',
		by: '',
		time: '',
		id: null
	},
	newsIds: [],
	endArray: false,
	setCurrentNew: obj => set(() => ({ currentNew: obj })),
	clearNewsIds: () => set(() => ({ newsIds: [] })),
	clearEndArray: () => set(() => ({ endArray: false })),
	viewSketetons: () => set(() => ({ skeletons: [...new Array(20)] })),
	setNews: async () => {
		if (!get().newsIds.length && !get().endArray) {
			const resultId = await fetch(
				'https://hacker-news.firebaseio.com/v0/newstories.json'
			)
			const jsonId = await resultId.json()
			set(() => ({
				newsIds: jsonId.slice(0, 100)
			}))
		}

		get()
			.newsIds.slice(0, 20)
			.forEach(async id => {
				const resultNew = await fetch(
					`https://hacker-news.firebaseio.com/v0/item/${id}.json`
				)
				const jsonNew = await resultNew.json()
				set(state => ({
					news: [...state.news, jsonNew]
				}))
				if (get().newsIds.length < 20) {
					set(state => ({
						endArray: true,
						skeletons: []
					}))
				}
			})
		set(state => ({
			newsIds: [...state.newsIds.slice(20)]
		}))
	},
	clearNews: () => set(() => ({ news: [] }))
}))
