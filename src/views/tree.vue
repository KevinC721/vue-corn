<template>
  <div class='tree-box'>
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
    <!-- <div
      class='optional'
      >
      <draggable
        group="components"
        draggable=".drag-item"
        animation="300"
        @add="onAdd"
        >
        <div
          v-for='(item, index) in view'
          :key='index'
          :id='index'
          class='drag-item'
          :style="{'left': item.left + 'px', 'top': item.top + 'px'}"
          @drag="onDragStart"
          @dragend="onDragEnd"
          linkAddable=true
          >
          {{item.title}}
        </div>
        <div class="guid-box" :style="{'left': guidBoxStyle.left + 'px', 'top': guidBoxStyle.top + 'px', 'display': guidBoxStyle.display}"></div>
      </draggable>
    </div> -->
  </div>
</template>

<script>
import Draggable from 'vuedraggable'

export default {
  components: {
    Draggable
  },
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
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      currDragNode: '',
      view: [
        {
          id: 0,
          type: 'info',
          title: '页面标题',
          top: 50,
          left: 20
        },
        {
          id: 1,
          type: 'banner', // 组件类型
          status: 1, // 默认状态
          data: [], // 数据
          options: {}, // 选项操作
          title: 'test',
          top: 30,
          left: 100
        }
      ],
      isMove: false,
      originalTop: '',
      originalLeft: '',
      originalCursorTop: '',
      originalCursorLeft: '',
      guidBoxStyle: {
        left: '',
        top: '',
        display: 'none'
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
      let obj = {
        id: this.view.length,
        type: 'banner', // 组件类型
        status: 1, // 默认状态
        data: [], // 数据
        options: {}, // 选项操作
        title: dropNode.label,
        top: '',
        left: ''
      }
      this.view.push(obj)
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
    }
    // onDragStart (evt) {
    //   if (!this.isMove) {
    //     // 将正在拖拽中标识改为true
    //     this.isMove = true
    //     // 获取当前拖拽节点的初始位置
    //     this.originalTop = evt.target.offsetTop
    //     this.originalLeft = evt.target.offsetLeft
    //     this.originalCursorTop = evt.offsetY
    //     this.originalCursorLeft = evt.offsetX
    //     this.guidBoxStyle.left = this.view[this.view.length - 1].left + 100
    //     this.guidBoxStyle.top = this.view[this.view.length - 1].top + 30
    //     this.guidBoxStyle.display = 'block'
    //   }

    //   console.log('进来了', this.originalCursorTop, this.originalCursorLeft)
    //   evt.preventDefault()
    // },
    // onDragEnd (e) {
    //   let endTop = e.offsetY - this.originalCursorTop + this.originalTop
    //   let endLeft = e.offsetX - this.originalCursorLeft + this.originalLeft
    //   console.log(e, endTop, endLeft)

    //   this.view[e.target.id].top = endTop
    //   this.view[e.target.id].left = endLeft

    //   this.guidBoxStyle.display = 'none'
    //   this.isMove = false
    // },
    // onAdd (evt) { // 元素从另一个列表拖放到列表中
    //   console.log(evt)
    // }
  }
}
</script>

<style>
.tree-box {
  background-color: aliceblue;
  display: flex;
  justify-content: space-between;
}
.tree {
  width: 30%;
}
.optional {
  position: relative;
  width: 70%;
  background-color: lightskyblue;
}
.drag-item {
  position: absolute;
  padding: 5px;
  border-radius: 10px;
  border: 2px solid black;
}
.guid-box {
  position: absolute;
  width: 120px;
  height: 30px;
  border: 2px dotted black;
  border-radius: 25px;
}
</style>
