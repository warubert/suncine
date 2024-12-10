import type { DbModels } from "../.."

export async function fetchById(MODELS: DbModels, id: string) {
  const user = await MODELS.USER.findById(id)
  if (!user) return
  return {
    id: user.id as string,
    login: user.login,
    name: user.name
  }
}
