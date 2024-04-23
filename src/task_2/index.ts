import chalk from 'chalk'
import { posts1, posts2 } from './data.js'

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
  let result: NormalizedDataT = { byId: {}, allIds: [] }

  unnormalizedData.forEach((item: DataItemT): void => {
    result.byId[item.id] = item
    result.allIds.push(item.id)
  })

  return result
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
  let result: NormalizedDataGenT<T> = { byId: {}, allIds: [] }

  unnormalizedData.forEach((item: T): void => {
    result.byId[item.id] = item
    result.allIds.push(item.id)
  })

  return result
}
// ---------------------------------------------------------------------------

// test logs
console.log(chalk.bgRed('predefined version: '), normalizeData(posts1))
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
console.log(chalk.bgBlue('generic version: '), normalizeDataGen(posts2))
/**
 * {
 *    byId: {
 *      62e69d5a5458aac0ed320b35: { id: '...', title?: '...', body?: '...', somethingElse?: '...' },
 *      62e69d5a5458aac0ed320b1c: { id: '...', title?: '...', body?: '...', somethingElse?: '...' },
 *      ...
 *    },
 *    allIds: ['62e69d5a5458aac0ed320b35', '62e69d5a5458aac0ed320b1c', ...]
 * }
 */
