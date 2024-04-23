import { posts } from './data.js'

// version with predefined type of data ---------------------------------------
type DataItemT = {
  id: string
  title: string
  body: string
}

type NormalizedDataT = {
  byId: { [key: string]: DataItemT }
  allIds: string[]
}

const normalizeData = (unnormalizedData: Array<DataItemT>): NormalizedDataT => {
  const normalizedData = unnormalizedData.reduce(
    (acc: NormalizedDataT, item: DataItemT): NormalizedDataT => {
      acc.byId[item.id] = item
      acc.allIds.push(item.id)
      return acc
    },
    { byId: {}, allIds: [] }
  )
  return normalizedData
}
// ---------------------------------------------------------------------------

// version with generic type of data -----------------------------------------
type NormalizedDataGenT<T> = {
  byId: { [key: string]: T }
  allIds: string[]
}

const normalizeDataGen = <T extends { id: string }>(
  unnormalizedData: Array<T>
): NormalizedDataGenT<T> => {
  const normalizedData = unnormalizedData.reduce(
    (acc: NormalizedDataGenT<T>, item: T): NormalizedDataGenT<T> => {
      acc.byId[item.id] = item
      acc.allIds.push(item.id)
      return acc
    },
    { byId: {}, allIds: [] }
  )
  return normalizedData
}
// ---------------------------------------------------------------------------

// test logs
console.log(normalizeData(posts))
console.log(normalizeDataGen(posts))
