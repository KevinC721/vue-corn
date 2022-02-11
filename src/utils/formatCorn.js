/**
 * @param {*} originalVal 待处理数据
 */
const formatCorn = (originalVal) => {
  var originalValArr = originalVal.split(',')
  let dealRes = originalValArr.map((item) => {
    var itemRes = item !== '00' ? item.replace(/0*(\d+)/, '$1') : '0'
    return itemRes
  })
  let result = dealRes.join(',')
  return result
}

// 节点样式数据结构
const modelNodeMarkup = (nodeName, type) => {
  return [
    {
      tagName: 'rect',
      selector: 'body',
      attrs: {
        stroke: 'transparent'
      }
    },
    {
      tagName: 'foreignObject',
      className: 'foreignObject',
      selector: 'foreignObject',
      children: [
        {
          tagName: 'body',
          selector: 'node_body',
          className: 'node_body',
          ns: 'http://www.w3.org/1999/xhtml',
          children: [
            {
              tagName: 'div',
              selector: 'node_item_v1',
              className: 'node_item',
              children: [
                {
                  tagName: 'div',
                  selector: 'node_item_v2',
                  className: 'node_item',
                  children: [
                    {
                      tagName: 'div',
                      selector: 'nodeElement',
                      className: 'nodeElement',
                      children: [
                        {
                          tagName: 'div',
                          selector: 'node_icon',
                          className: 'node_icon',
                          children: [
                            {
                              tagName: 'span',
                              selector: 'begin',
                              className: 'iconfont ' + type + ' icon_style'
                            }
                          ]
                        },
                        {
                          tagName: 'div',
                          selector: 'notation',
                          className: 'notation',
                          children: [
                            {
                              tagName: 'div',
                              selector: 'node_text',
                              className: 'node_text',
                              textContent: nodeName
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

// 节点点击
const nodeClick = (node, graph, _that) => {
  if (node.id === 'node_4') {
    _that.graphInfo.nodes = {}
    _that.graphInfo.edges = {}
    graph.fromJSON(_that.graphInfo)
    _that.currentNode = _that.graphInfo.nodes[3]
  }
}

export {
  formatCorn,
  modelNodeMarkup,
  nodeClick
}
