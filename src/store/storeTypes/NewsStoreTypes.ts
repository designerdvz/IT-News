export interface INewsStore {
  news: INew[]
  skeletons: undefined[]
  currentNew: ICurrentNew
  newsIds: number[]
  endArray: boolean
  setCurrentNew: (INew) => void
  setNews: () => void
  clearNews: () => void
  viewSketetons: () => void
  clearEndArray: () => void
  clearNewsIds: () => void
}

export interface ICurrentNew {
  descendants: number
  url: string
  title: string
  by: string
  time: string
  id: number
}

export interface INew {
  url: string
  title: string
  time: string
  by: string
  score: number
  id: number
}