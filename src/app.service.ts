type workersType = {
  id: number
  name: string
  parent_id: number
  id_log: number
  status: string | null
}
type treeType = {
  id: number
  name: string
  parent_id: number
  id_log: number
  status: string | null
  children?: workersType[]
}
class AppService {
  buildTree = async (data: workersType[]) => {
    const map = new Map<number, treeType>(data.map((item) => [item.id, item]))
    map.forEach((item) => {
      if (map.has(item.parent_id)) {
        const parentID = map.get(item.parent_id)
        parentID.children = [...(parentID.children || []), item]
      }
    })
    return [...map.values()].filter((item) => !item.parent_id)
  }
}
export default new AppService()
