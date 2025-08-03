import { API } from "../api";
import { AccountRoutes } from "../enum";

interface CreateAccountProps {
  workspace_type: "PERSONAL" | "BUSINESS";
  email: string;
  password: string;
  name: string;
  cpf: string;
  crm_number?: string;
  workspace_name?: string;
  cnpj?: string;
}

export default async function createAccount(body: CreateAccountProps): Promise<any> {
  try {
    const response = await API.post(AccountRoutes.BASE_URL, body)

    if (response) return response.data

    return false
  } catch (error) {
    console.log(error, "ERROR CREATE ACCOUNT")
    return false
  }
}