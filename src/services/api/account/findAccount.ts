import { API } from "../api";
import { AccountRoutes } from "../enum";

interface FindAccountProps {
  field: string;
  value: string;
}

export default async function FindAccount({ field, value }: FindAccountProps): Promise<{ message: string }> {
  const response = await API.get(`${AccountRoutes.BASE_URL}?field=${field}&value=${value}`)

  if (response.status === 409) return response.data

  return response.data
}