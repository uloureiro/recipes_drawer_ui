import axios from 'axios'

const BASE_URL: string | undefined = process.env.REACT_APP_BASE_URL

export const fetchRecipes = (page: number = 0, url?: string): Promise<any> => {
  return new Promise<any|undefined>((resolve, reject) => {
    if (!url) { url = BASE_URL }
  axios.get(`${url}/recipes?page=${page}`)
    .then(result => { resolve(result.data) })
    .catch(error => { reject(error) })
  })
}
