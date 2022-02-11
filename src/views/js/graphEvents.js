import { FunctionExt } from '@antv/x6'
import { showPorts, determineRepeat, closedLoopJudge } from './methods'
// import { modelNodeMarkup } from '../../utils/formatCorn'

export default (graph, _that) => {
  // 基类鼠标移入
  // graph.on('cell:mouseenter', ({e, cell, view}) => {
  //   console.log('🍎🍎🍎', cell.getTools())
  //   if (!cell.getTools()) {
  //     cell.addTools({
  //       name: 'button',
  //       args: {
  //         markup: [
  //           {
  //             tagName: 'rect',
  //             selector: 'button',
  //             markup: modelNodeMarkup(
  //               '节点名称', // 节点名称
  //               'el-icon-connection' // 节点类型
  //             ),
  //             attrs: {
  //               width: 40,
  //               height: 25,
  //               rx: 4,
  //               ry: 4,
  //               cursor: 'pointer',
  //               status: {
  //                 fill: 'white'
  //               },
  //               body: {
  //                 stroke: '#fe854f',
  //                 fill: 'white',
  //                 strokeWidth: 2
  //               }
  //             }
  //           }
  //         ],
  //         x: 0,
  //         y: -20,
  //         offset: {
  //           x: 0,
  //           y: 0
  //         },
  //         onClick ({ cell }) {
  //           console.log(666666666666666666)
  //         }
  //       }
  //     })
  //   }

  //   const container = document.getElementsByClassName(
  //     'x6-graph-svg-decorator'
  //   )
  //   const dom = container[0].querySelector('[data-cell-id="' + cell.id + '"]')
  //   dom && (dom.style.visibility = 'visible')
  // })

  // 基类鼠标移出
  // graph.on('cell:mouseleave', ({ e, cell, view }) => {
  //   const container = document.getElementsByClassName('x6-graph-svg-decorator')
  //   const dom = container[0].querySelector('[data-cell-id="' + cell.id + '"]')
  //   dom && (dom.style.visibility = 'hidden')
  //   // cell.removeTools()
  // })

  // 鼠标移入节点事件
  graph.on(
    'node:mouseenter',
    FunctionExt.debounce(({node}) => {
      // 显示连接桩
      const container = document.getElementById('container')
      const ports = container.querySelectorAll('.x6-port-body')
      showPorts(ports, true)
    })
  )

  // 鼠标移出节点事件
  graph.on('node:mouseleave', () => {
    // 隐藏连接桩
    const container = document.getElementById('container')
    const ports = container.querySelectorAll('.x6-port-body')
    showPorts(ports, false)
  })

  // 鼠标移入连接线事件
  graph.on('edge:mouseenter', ({ e, edge, view }) => {
    edge.addTools({
      name: 'button-remove',
      args: {
        distance: '50%'
      }
    })
  })

  // 鼠标移出连接线事件
  graph.on('edge:mouseleave', ({ e, edge, view }) => {
    // 移除工具
    edge.removeTools()
  })

  // 连线结束事件
  graph.on('edge:connected', ({ isNew, edge }) => {
    if (isNew) {
      const edges = graph.toJSON().cells.filter(e => e.shape === 'edge')
      const len = edges.length - 1
      // 获取当前连线的source和target
      const s = edges[len].source.cell
      const t = edges[len].target.cell

      // 节点不能重复连线
      const isRepeat = determineRepeat(s, t, graph).length > 1
      isRepeat && graph.removeCells([edge.id])
      // 闭环判断，不能形成闭环
      !isRepeat && closedLoopJudge(s, t, graph, edge.id)

      // 更新连线样式
      edge.attr({
        line: {
          strokeDasharray: ''
          // targetMarker: '',
        }
      })
    }
  })

  // 节点点击右键事件
  graph.on('node:contextmenu', ({ cell, e }) => {
    _that.currentCell = cell
    const obj = {
      icon: 'icon-icon_list_qiyong',
      name: '启用'
    }
    const obj2 = {
      icon: 'icon-jinzhi',
      name: '停用'
    }
    _that.selectList[3] = cell.store.data.nodeType === 0 ? obj2 : obj
    const p = graph.clientToGraph(e.clientX, e.clientY)
    // console.log(p)
    // console.log(_that.$refs.contextMenu)
    const page = graph.localToClient(p.x, p.y)
    _that.showMask = true
    console.log(page)
    console.log(document.body.clientHeight)
    console.log(p.y)
    _that.$refs.contextMenu.style.top = page.y + 'px'
    _that.$refs.contextMenu.style.left = page.x + 'px'
  })
}
