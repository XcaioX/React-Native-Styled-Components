import useSWR from 'swr'

import { api } from '../services'

export const useFetch = <Data, Error = any>(url: string) => {
  const { data, error, mutate } = useSWR<Data, Error>(url, async url => {
    const response = await api.get(url)

    return response.data
  })

  return { data, error, mutate }
}
