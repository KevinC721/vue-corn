<template>
  <div class="relation">
    <div class="tree-box">
      <div class='tree'>
        <el-tree
          :data='data'
          node-key='id'
          default-expand-all
          @node-drag-start='handleDragStart'
          @node-drag-enter='handleDragEnter'
          @node-drag-leave='handleDragLeave'
          @node-drag-over='handleDragOver'
          @node-drag-end='handleDragEnd'
          @node-drop='handleDrop'
          draggable
          :allow-drop='allowDrop'
          :allow-drag='allowDrag'
        >
        </el-tree>
      </div>
    </div>
    <div class="graph-box">
      <div id="container" @dragover="onDragOver"></div>
      <div id="mask" ref="mask" v-show="showMask" @click="showMask = false">
        <div
          id="contextMenu"
          v-show="showMask"
          ref="contextMenu"
          style="position:absolute"
        >
          <ul>
            <li
              @click="clickSelect(item)"
              v-for="(item, index) in selectList"
              :key="index"
            >
              <span class="iconfont" :class="item.icon"></span>{{ item.name }}
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { Graph, Markup, Path, Shape } from '@antv/x6'
import insertCss from 'insert-css'
// import { findObj } from '../utils/findData'
import { modelNodeMarkup, nodeClick } from '../utils/formatCorn'
import graphEvents from './js/graphEvents'
// import { delNode } from './js/methods'

// 连接桩模板数据结构
const modelPortMarkup = [
  {
    tagName: 'foreignObject',
    className: 'foreignObject_port',
    selector: 'foreignObject_port',
    attrs: {
      magnet: true
    },
    children: [
      {
        tagName: 'body',
        selector: 'port_body',
        className: 'port_body',
        ns: 'http://www.w3.org/1999/xhtml',
        children: [
          {
            tagName: 'span',
            selector: 'in_left',
            className: 'item',
            children: [
              {
                tagName: 'span',
                selector: 'ais-port',
                className: 'ais-port'
              }
            ]
          }
        ]
      }
    ]
  }
]

// 链接桩组
const groups = {
  in_left: {
    position: {
      name: 'absolute',
      args: { x: '25%', y: -4 }
    },
    zIndex: 10,
    markup: modelPortMarkup
  },
  in_right: {
    position: {
      name: 'absolute',
      args: { x: '75%', y: -4 }
    },
    zIndex: 10,
    markup: modelPortMarkup
  },
  out_left: {
    position: {
      name: 'absolute',
      args: { x: '25%', y: '90%', magnet: 'true' }
    },
    zIndex: 10,
    markup: modelPortMarkup
  },
  out_right: {
    position: {
      name: 'absolute',
      args: { x: '75%', y: '90%' }
    },
    zIndex: 10,
    markup: modelPortMarkup
  },
  left_mid: {
    position: {
      name: 'absolute',
      args: { x: -4, y: '40%', magnet: 'true' }
    },
    zIndex: 10,
    markup: modelPortMarkup
  },
  right_mid: {
    position: {
      name: 'absolute',
      args: { x: '105%', y: '40%', magnet: 'true' }
    },
    zIndex: 10,
    markup: modelPortMarkup
  }
}

const ports = {
  groups: groups,
  items: [
    {
      id: 'port1',
      group: 'left_mid'
    },
    {
      id: 'port2',
      group: 'right_mid'
    }
  ]
}

export default {
  components: {},
  data () {
    return {
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2',
              children: [
                {
                  id: 11,
                  label: '三级 3-2-1'
                },
                {
                  id: 12,
                  label: '三级 3-2-2'
                },
                {
                  id: 13,
                  label: '三级 3-2-3'
                }
              ]
            }
          ]
        }
      ],
      graphInfo: {
        // 节点
        nodes: [],
        // 边
        edges: []
      },
      selectList: [
        // 右键菜单数据
        { icon: 'icon-zengjiaxinzeng', name: '新增节点' },
        { icon: 'icon-tabAdd', name: '添加子任务' },
        { icon: 'icon-zhongmingming', name: '重命名' },
        { icon: 'icon-jinzhi', name: '停用' },
        { icon: 'icon-bianji', name: '编辑' },
        { icon: 'icon-shanchu1', name: '删除' }
      ],
      showMask: false,
      nodeModel: {
        id: '',
        width: 180, // Number，可选，节点大小的 width 值
        height: 32, // Number，可选，节点大小的 height 值
        x: 20, // Number，必选，节点位置的 x 值
        y: 80, // Number，必选，节点位置的 y 值
        portMarkup: [Markup.getForeignObjectMarkup()],
        markup: modelNodeMarkup(
          '节点名称', // 节点名称
          'icon-a-xianbeifen2' // 节点类型
        ),
        attrs: {
          status: {
            fill: '#2c3e50'
          },
          body: {
            stroke: 'transparent',
            fill: 'transparent'
          }
        },
        ports: ports
      },
      // 连接线样式
      connectEdgeType: {
        // 连线方式[直角]
        // connector: 'normal',
        // router: {
        //   name: 'manhattan' // smooth(曲线)/ manhattan(直角线)
        // }

        // 连线方式[曲线]
        connector: 'curve',
        router: {
          name: 'normal'
        }
      },
      mouseInContainerPosition: {
        x: 0,
        y: 0
      }
    }
  },
  methods: {
    // 树拖拽方法集 -- start
    handleDragStart (node, ev) {
      console.log('drag start', node.label)
      this.currDragNode = node.label
    },
    handleDragEnter (draggingNode, dropNode, ev) {
      // console.log('tree drag enter: ', dropNode.label)
    },
    handleDragLeave (draggingNode, dropNode, ev) {
      // console.log('tree drag leave: ', dropNode.label)
    },
    handleDragOver (draggingNode, dropNode, ev) {
      // console.log('tree drag over: ', dropNode.label)
    },
    handleDragEnd (draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType)
      this.addNode(dropNode.label)
    },
    handleDrop (draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType)
    },
    allowDrop (draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    allowDrag (draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1
    },
    // 树拖拽方法集 -- end

    repeatTest (edgesIfo, sourceCell, targetCell) {
      // console.log(edgesIfo,'edgesIfo')
      // console.log(sourceCell,'sourceCell')
      // console.log(targetCell,'targetCell')
      for (const item of edgesIfo.values()) {
        if (
          item.source.cell === sourceCell.id &&
          item.target.cell === targetCell.id
        ) {
          return false
        }
      }
      return true
    },

    // 初始化画布
    initGraph () {
      let _that = this
      // 画布信息
      _that.graph = new Graph({
        container: document.getElementById('container'),
        // 可连接节点连接桩高亮设置
        highlighting: {
          nodeAvailable: {
            name: 'className',
            args: {
              className: 'available'
            }
          },
          magnetAvailable: {
            name: 'className',
            args: {
              className: 'available'
            }
          },
          magnetAdsorbed: {
            name: 'className',
            args: {
              className: 'adsorbed'
            }
          }
        },
        width: 1200,
        height: 600,
        panning: true,
        background: {
          color: '#fffbe6' // 设置画布背景颜色
        },
        grid: {
          size: 10, // 网格大小 10px
          visible: true // 渲染网格背景
        },
        resizing: {
          // 调整节点宽高
          enabled: false,
          orthogonal: false
        },
        // selecting: true, // 可选
        snapline: true,
        interacting: {
          edgeLabelMovable: true
        },

        // 配置全局的连线规则
        connecting: {
          // 将锚点作为连接点
          anchor: 'center',
          // 连线位于锚点的位置 - 中心
          connectionPoint: 'anchor',
          // 是否允许连接到画布的空白处
          allowBlank: false,
          // 是否启用对齐线
          snap: true,
          // 连线时是否高亮连接点
          highlight: true,
          // 创建边
          createEdge () {
            return new Shape.Edge({
              attrs: {
                line: {
                  stroke: '#1890ff',
                  strokeWidth: 2,
                  targetMarker: {
                    name: 'classic',
                    size: 8
                  },
                  // 绘制虚线
                  strokeDasharray: '5 5',
                  style: {
                    animation: 'ant-line 30s infinite linear'
                  }
                }
              },
              // 连接线上的工具
              // tools: {
              //   name: 'button-remove',
              //   args: { distance: '50%' }
              // },
              // 连接线上的文本信息
              label: {
                text: ''
              },
              // 连接器，这里选择了曲线
              connector: _that.connectEdgeType.connector,
              // 连接路由
              router: {
                name: _that.connectEdgeType.router.name || ''
              },
              zIndex: 0
            })
          },

          // 配置节点和边的交互规则
          validateMagnet ({ e, magnet, view, cell }) {
            // 如果某个节点不能拉线则通过 cell.id 找到当前节点，并 return false 即可
            // 输入节点不允许拉线
            if (magnet.getAttribute('port-group').includes('left_mid')) {
              return false
            }

            return true
          },

          // 在移动连接线的时候判断可以连接的点
          validateConnection ({
            edge,
            edgeView,
            sourceView,
            targetView,
            sourcePort,
            targetPort,
            sourceMagnet,
            targetMagnet,
            sourceCell,
            targetCell,
            type
          }) {
            console.log('🚀🚀🚀', _that.graph)
            const edgesInfo = _that.graph
              .toJSON()
              .cells.filter(e => e.shape === 'edge')

            if (targetView) {
              // 不能连接自己
              if (sourceView.cell.id === targetView.cell.id) return false
            }

            // 只能从输出连接桩创建连接
            if (
              !sourceMagnet ||
              sourceMagnet.getAttribute('port-group').includes('left_mid')
            ) {
              return false
            }

            // 只能连接到输入桩连接桩
            if (
              !targetMagnet ||
              targetMagnet.getAttribute('port-group').includes('right_mid')
            ) {
              return false
            }

            // 同一节点不能重复连
            let repeatRes = _that.repeatTest(edgesInfo, sourceCell, targetCell)
            if (!repeatRes) {
              return false
            }
            return true
          }
        }
      })
      insertCss(`
        @keyframes ant-line {
          to {
            stroke-dashoffset: -1000
          }
        }
      `)

      // 绘制画布
      this.graph.fromJSON(this.graphInfo)

      /* 注册事件 */
      graphEvents(this.graph, _that)
    },

    // 新增节点
    /**
     * @param {*} label type: String 当前拖如节点的标签名
     */
    addNode (label) {
      let currNode = JSON.parse(JSON.stringify(this.nodeModel))
      currNode.id = 'node' + label
      currNode.x = this.mouseInContainerPosition.x - currNode.width / 2
      currNode.y = this.mouseInContainerPosition.y - currNode.height / 2
      currNode.markup = modelNodeMarkup(
        label, // 节点名称
        'el-icon-connection' // 节点类型
      )

      console.log('🚚🚚🚚', currNode)
      // this.graphInfo.nodes.push(currNode)
      // this.graph.fromJSON(this.graphInfo)
      this.graph.addNode(currNode)
    },
    // 监听将节点拖拽到画布上方的事件，实时更新
    onDragOver (e) {
      this.mouseInContainerPosition.x = e.offsetX
      this.mouseInContainerPosition.y = e.offsetY
    },

    // 节点点击
    nodeClick (node, graph = this.graph, _that = this) {
      nodeClick(node, graph, _that)
    }

    // clickSelect (item) {
    //   if (item.name === '启用') {
    //     this.currentCell.store.data.nodeType = 0
    //     // for(const item of ports.items.values()){
    //     //   this.graph.getCellById(this.currentCell.id).addPort(item)
    //     // }
    //   }
    //   if (item.name === '停用') {
    //     this.currentCell.store.data.nodeType = 1
    //     // this.ports = this.graph.getCellById(this.currentCell.id).removePorts()
    //   }
    //   // console.log(this.graph.getCellById(this.currentCell.id).getPorts())

    //   this.graph
    //     .getCellById(this.currentCell.id)
    //     .setMarkup(
    //       modelNode(
    //         this.currentCell.id,
    //         this.currentCell.store.data.nodeType === 1 ? true : false
    //       ).markup
    //     )

    //   toggleStatus(this.currentCell, this.graph, this)
    // }
  },
  mounted () {
    // 自定义连线轨迹
    Graph.registerConnector(
      'curve',
      (sourcePoint, targetPoint) => {
        const path = new Path()
        path.appendSegment(Path.createSegment('M', sourcePoint))
        path.appendSegment(
          Path.createSegment(
            'C',
            sourcePoint.x,
            sourcePoint.y + 120,
            targetPoint.x,
            targetPoint.y - 120,
            targetPoint.x,
            targetPoint.y
          )
        )
        return path.serialize()
      },
      true
    )

    this.initGraph()
    // findObj(this.arrTest, 'id', 'node2', true)
  }
}
</script>

<style lang="scss" scoped>
@import './style/index.scss';
.relation {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
}
.tree-box, .graph-box {
  height: 550px;
}
.tree-box {
  width: 180px;
}
.tree {
  display: inline-block;
  width: 150px;
  height: 100%;
  padding: 10px;
  background-color: antiquewhite;
  border: 4px groove rgb(31, 126, 150);
}
</style>
