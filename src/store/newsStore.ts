import {create} from 'zustand'
import {useEffect} from "react";

export const useNewsStore = create<any>((set) => ({
    news: [],
    currentNew: {},
    // pending: false,
    setCurrentNew: (obj) => set(() => ({currentNew: obj})),
    setNews: async () => {
        // changePending: () => set(() => ({pending: true}))
        const resultId = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
        const jsonId = await resultId.json()
        jsonId.slice(0, 100).forEach(async (id) => {
            const resultNew = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            const jsonNew = await resultNew.json()
            set((state) => ({
                    news: [...state.news, jsonNew]
                })
            )
        })
        // changePending: () => set(() => ({pending: false}))
    },
    clearNews: () => set(() => ({news: []}))
}))