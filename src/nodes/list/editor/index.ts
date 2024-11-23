import { type NodeEditorProps, createEditorNode } from '@keload/node-red-dxp/editor';
import { handleAddRemoveClassesOnSelectors, watchInput } from '@keload/node-red-dxp/editor/dom-helper';
import { NODES_CATEGORY, NODES_COLOR, NODES_ICONS } from '../../../common/constants';
import type { NodeListProps } from '../types';

const List = createEditorNode<NodeEditorProps<NodeListProps>>({
  category: NODES_CATEGORY,
  color: NODES_COLOR,
  defaults: {
    webdavServer: { value: '', type: 'webdav-config', required: true },
    name: { value: '' },
    action: { value: '' },
    listDirectory: { value: '' },
    deleteDirectory: { value: '' },
  },
  inputs: 1,
  outputs: 1,
  icon: NODES_ICONS,
  paletteLabel: 'List / Delete',
  label: function () {
    return this.name || this.action || 'List';
  },
  oneditprepare: function () {
    const actions = ['list', 'delete'];

    if (this.action) {
      handleAddRemoveClassesOnSelectors('remove', [`.action-${this.action}`], ['hidden']);
    }

    watchInput('$action', ([actionValue]) => {
      handleAddRemoveClassesOnSelectors(
        'add',
        actions.map((action) => `.action-${action}`),
        ['hidden'],
      );
      if (actionValue) {
        handleAddRemoveClassesOnSelectors('remove', [`.action-${actionValue}`], ['hidden']);
      }
    });
  },
});

export default List;
