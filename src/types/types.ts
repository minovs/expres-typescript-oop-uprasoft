export type UsersParamsType = {
  login: string
  password: string
}
export type UserType = {
  id: string
  alfirm: string
  parent_id: string
  id_log: string
  roles: string
}
export type WorkersType = {
  id: number
  name: string
  parent_id: number
  id_log: number
  status: string | null
}
export type TreeType = {
  id: number
  name: string
  parent_id: number
  id_log: number
  status: string | null
  children?: WorkersType[]
}
export type ParamsType = {
  date: string
  id?: string
}
