import { WorkersType, TreeType } from '../types/types'

class BuildTree {
  tree = async (data: WorkersType[]) => {
    const map = new Map<number, TreeType>(data.map((item) => [item.id, item]))
    map.forEach((item) => {
      if (map.has(item.parent_id)) {
        const parentID = map.get(item.parent_id)
        parentID.children = [...(parentID.children || []), item]
      }
    })
    return [...map.values()].filter((item) => !item.parent_id)
  }
}
export default new BuildTree()
