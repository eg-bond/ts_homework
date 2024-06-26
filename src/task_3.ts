const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments'

type ResponseDataT = {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

type ResultDataT = {
  ID: number
  Email: string
}

// get all comments from the server (predefined version)
const getData = async (url: string): Promise<ResponseDataT[]> => {
  const response: Response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  return (await response.json()) as ResponseDataT[]
}

// get all comments from the server (generic version)
const getDataGen = async <T>(url: string): Promise<T[]> => {
  const response: Response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  return (await response.json()) as T[]
}

// extract necessary data from the response
const extractData = <T extends { id: number; email: string }>(
  data: T[]
): ResultDataT[] => {
  return data.map(
    (item: T): ResultDataT => ({
      ID: item.id,
      Email: item.email,
    })
  )
}

// log data to the console
const logData = (data: ResultDataT[]): void => {
  data.forEach((item: ResultDataT): void => {
    console.log(`ID: ${item.ID}, Email: ${item.Email}`)
  })
}

// logs
getData(COMMENTS_URL).then(extractData).then(logData)
getDataGen<ResponseDataT>(COMMENTS_URL).then(extractData).then(logData)
/**
 * ID: 1, Email: Eliseo...
 * ID: 2, Email: Jayne_Kuhic...
 * ID: 3, Email: Nikita...
 * ID: 4, Email: Lew...
 * ...
 * ID: 497, Email: Dolly...
 * ID: 498, Email: Davion...
 * ID: 499, Email: Wilburn_Labadie...
 * ID: 500, Email: Emma...
 */
