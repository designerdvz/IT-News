import { create } from 'zustand'

const useNewsStore= create((set) => ({
    news: [
        {
            id: 4,
            by: 'Mandy',
            time: '23/11/03',
            score: 3,
            title: 'Этот текст вообще не выдуманный. Реально говорю'
        },
        {
            id: 5,
            by: 'Andy',
            time: '22/10/05',
            score: 3,
            title: 'hello everyBody'
        },
        {
            id: 6,
            by: 'Alex',
            time: '20/13/06',
            score: 3,
            title: 'Седалищные бугры. Или седалищное Мурино........'
        },
    ],
    currentNew: {},
    setCurrentNew: (obj) => set(() => ({ currentNew: obj})),
}))