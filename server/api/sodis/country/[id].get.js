import { createApiServer } from '../../../utils/fetchCookie'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const apiServer = createApiServer(event)
  return await apiServer('/disp', {
    method: 'GET',
    query: {
      s: 'json_country',
      id,
    },
  })
})
