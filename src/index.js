import Vue from 'vue'
import TreeViewItemValue from './TreeViewItemValue.vue'
import TreeViewItem from './TreeViewItem.vue'
import TreeView from './TreeView.vue'
import * as diff from './changeset.js'

TreeView.install = () => {
  Vue.component("tree-view-item-value", TreeViewItemValue);
  Vue.component("tree-view-item", TreeViewItem);
  Vue.component("tree-view", TreeView);
}

export {
  TreeView,
  TreeViewItem,
  TreeViewItemValue,
  diff,
}
