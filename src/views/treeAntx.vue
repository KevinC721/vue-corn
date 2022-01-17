<template>
  <div class="tree-ant">
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
      <div id="container"></div>
    </div>
  </div>
</template>

<script>
import { Graph } from '@antv/x6'

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
        nodes: [
          {
            id: 'node1', // String，可选，节点的唯一标识
            shape: 'rect',
            x: 40, // Number，必选，节点位置的 x 值
            y: 40, // Number，必选，节点位置的 y 值
            width: 80, // Number，可选，节点大小的 width 值
            height: 40, // Number，可选，节点大小的 height 值
            label: 'hello', // String，节点标签
            attrs: {
              body: {
                fill: '#2ECC71',
                stroke: '#000'
              },
              label: {
                text: 'Hello',
                fill: '#333',
                fontSize: 13
              }
            }
          },
          {
            id: 'node2', // String，节点的唯一标识
            shape: 'ellipse',
            x: 180, // Number，必选，节点位置的 x 值
            y: 10, // Number，必选，节点位置的 y 值
            width: 80, // Number，可选，节点大小的 width 值
            height: 40, // Number，可选，节点大小的 height 值
            label: 'world', // String，节点标签
            attrs: {
              body: {
                strokeDasharray: '10.2'
              }
            }
          },
          {
            id: 'node3', // String，节点的唯一标识
            shape: 'ellipse',
            x: 180, // Number，必选，节点位置的 x 值
            y: 70, // Number，必选，节点位置的 y 值
            width: 80, // Number，可选，节点大小的 width 值
            height: 40, // Number，可选，节点大小的 height 值
            label: 'world', // String，节点标签
            attrs: {
              body: {
                strokeDasharray: '10.2'
              }
            }
          }
        ],
        // 边
        edges: [
          {
            source: 'node1', // String，必须，起始节点 id
            target: 'node2', // String，必须，目标节点 id
            router: 'er',
            connector: {
              name: 'rounded'
            },
            attrs: {
              body: {
                strokeDasharray: '10.2'
              },
              line: {
                sourceMarker: 'path', // 实心箭头
                targetMarker: {
                  name: 'path', // 椭圆
                  rx: 10, // 椭圆箭头的 x 半径
                  ry: 6 // 椭圆箭头的 y 半径
                },
                strokeDasharray: '10.2'
              }
            }
          },
          {
            source: 'node1', // String，必须，起始节点 id
            target: 'node3', // String，必须，目标节点 id
            router: 'er',
            connector: {
              name: 'rounded'
            },
            attrs: {
              body: {
                strokeDasharray: '10.2'
              },
              line: {
                sourceMarker: 'path', // 实心箭头
                targetMarker: {
                  name: 'path', // 椭圆
                  rx: 10, // 椭圆箭头的 x 半径
                  ry: 6 // 椭圆箭头的 y 半径
                },
                strokeDasharray: '10.2'
              }
            }
          }
        ]
      }
    }
  },
  methods: {
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
      const currNodeLen = this.graphInfo.nodes.length
      let obj = {
        id: 'node' + (currNodeLen + 1),
        shape: 'ellipse',
        x: this.graphInfo.nodes[0].x + 140, // Number，必选，节点位置的 x 值
        y: this.graphInfo.nodes[currNodeLen - 1].y + 60, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        label: dropNode.label, // String，节点标签
        attrs: {
          body: {
            strokeDasharray: '10.2'
          }
        }
      }
      this.graphInfo.nodes.push(obj)

      const newedges = {
        source: 'node1', // String，必须，起始节点 id
        target: 'node4', // String，必须，目标节点 id
        router: 'er',
        connector: {
          name: 'rounded'
        },
        attrs: {
          body: {
            strokeDasharray: '10.2'
          },
          line: {
            sourceMarker: 'path', // 实心箭头
            targetMarker: {
              name: 'path', // 椭圆
              rx: 10, // 椭圆箭头的 x 半径
              ry: 6 // 椭圆箭头的 y 半径
            },
            strokeDasharray: '10.2'
          }
        }
      }
      this.graphInfo.edges.push(newedges)

      this.graph.fromJSON(this.graphInfo)
    },
    handleDrop (draggingNode, dropNode, dropType, ev) {
      // console.log('tree drop: ', dropNode.label, dropType)
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
    initGraph () {
      this.graph = new Graph({
        container: document.getElementById('container'),
        width: 800,
        height: 600,
        panning: true,
        background: {
          color: '#fffbe6' // 设置画布背景颜色
        },
        grid: {
          size: 10, // 网格大小 10px
          visible: true // 渲染网格背景
        }
      })
      this.graph.fromJSON(this.graphInfo)
    }
  },
  mounted () {
    this.initGraph()
  }
}
</script>

<style>
.tree-ant {
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
