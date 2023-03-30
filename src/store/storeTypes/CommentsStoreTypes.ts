
export interface ICommentsStore {
  comments: IComment[]
  kids: []
  getComments: (number) => void
  clearComments: () => void
}

export interface IComment {
  id: number
  by: string
  text: string
}
