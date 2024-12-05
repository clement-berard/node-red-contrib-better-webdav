import { type NodeEditorProps, createEditorNode } from '@keload/node-red-dxp/editor';
import {
  getFormValues,
  initSelect,
  jqSelector,
  resolveSelector,
  setFormValues,
  watchInput,
} from '@keload/node-red-dxp/editor/dom-helper';
import {
  NODES_CATEGORY,
  NODES_COLOR,
  NODES_ICONS,
  cleanWebdavMethodsForSelect,
} from '../../../common/constants-client-side';
import type { NodeListProps } from '../types';

const List = createEditorNode<NodeEditorProps<NodeListProps>>({
  category: NODES_CATEGORY,
  color: NODES_COLOR,
  defaults: {
    webdavServer: { value: '', type: 'webdav-config', required: true },
    name: { value: '' },
    entry: { value: '', required: false },
    entryType: { value: '', required: false },
    action: { value: '' },
    getDirectoryContents: { value: {} },
    deleteFile: { value: {} },
  },
  inputs: 1,
  outputs: 1,
  icon: NODES_ICONS,
  paletteLabel: 'webdav fns',
  label: function () {
    return this.name || this.action || 'webdav fns';
  },
  oneditsave: function () {
    this.getDirectoryContents = getFormValues('getDirectoryContents');
    this.deleteFile = getFormValues('deleteFile');
  },
  oneditprepare: function () {
    jqSelector('$entry').typedInput({
      types: ['msg', 'flow', 'global', 'json', 'jsonata'],
      typeField: resolveSelector('$entryType'),
    });
    setFormValues('getDirectoryContents', this.getDirectoryContents);
    setFormValues('deleteFile', this.deleteFile);
    initSelect('$action', cleanWebdavMethodsForSelect, {
      selected: this.action,
      emptyValue: ' ',
    });

    jqSelector('.extra-params').addClass('hidden');

    function handleSelectActionChange(currentAction: string) {
      jqSelector('.extra-params').addClass('hidden');
      if (currentAction) {
        jqSelector(`.${currentAction}`).removeClass('hidden');
        console.log('actionValue', currentAction);
      }
    }

    handleSelectActionChange(this.action);

    watchInput('$action', ([actionValue]) => {
      handleSelectActionChange(actionValue);
    });

    // const actions = ['list', 'delete'];
    // console.log('cleanWebdavMethodsForSelect', cleanWebdavMethodsForSelect);
    // if (this.action) {
    //   handleAddRemoveClassesOnSelectors('remove', [`.action-${this.action}`], ['hidden']);
    // }
    //
    // watchInput('$action', ([actionValue]) => {
    //   handleAddRemoveClassesOnSelectors(
    //     'add',
    //     actions.map((action) => `.action-${action}`),
    //     ['hidden'],
    //   );
    //   if (actionValue) {
    //     handleAddRemoveClassesOnSelectors('remove', [`.action-${actionValue}`], ['hidden']);
    //   }
    // });
  },
});

export default List;
