import { posts } from './data.js'

type DataItemT = {
  id: string
  title: string
  body: string
}

type UnnormalizedDataT = Array<DataItemT>

const normalizeData = (
  unnormalizedData: UnnormalizedDataT
): NormalizedDataT => {
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

type NormalizedDataT = {
  byId: { [key: string]: DataItemT }
  allIds: string[]
}

const normalizeDataGeneric = <T extends { id: string }>(
  unnormalizedData: Array<T>
): {
  byId: { [key: string]: T }
  allIds: string[]
} => {
  const normalizedData = unnormalizedData.reduce(
    (
      acc: {
        byId: { [key: string]: T }
        allIds: string[]
      },
      item: T
    ): {
      byId: { [key: string]: T }
      allIds: string[]
    } => {
      acc.byId[item.id] = item
      acc.allIds.push(item.id)
      return acc
    },
    { byId: {}, allIds: [] }
  )
  return normalizedData
}

console.log(normalizeData(posts))
/**
 * {
 *    byId: {
 *      62e69d5a5458aac0ed320b35: { id: '...', title: '...', body: '...' },
 *      62e69d5a5458aac0ed320b1c: { id: '...', title: '...', body: '...' },
 *      ...
 *    },
 *    allIds: ['62e69d5a5458aac0ed320b35', '62e69d5a5458aac0ed320b1c', ...]
 * }
 */
