import { objectMap } from '@antfu/utils'
import { toAtFS } from '../resolver'
import type { VirtualModuleTemplate } from './types'

export const templateLayouts: VirtualModuleTemplate = {
  id: '/@slidev/layouts',
  async getContent(_, { getLayouts }) {
    const imports: string[] = []
    const layouts = objectMap(
      await getLayouts(),
      (k, v) => {
        imports.push(`import __layout_${k} from "${toAtFS(v)}"`)
        return [k, `__layout_${k}`]
      },
    )

    return [
      imports.join('\n'),
      `export default {\n${Object.entries(layouts).map(([k, v]) => `"${k}": ${v}`).join(',\n')}\n}`,
    ].join('\n\n')
  },
}
