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
  methodsEnum,
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
    methodsEnum.forEach((method) => {
      this[method] = getFormValues(method);
    });
  },
  oneditprepare: function () {
    jqSelector('$entry').typedInput({
      types: ['msg', 'flow', 'global', 'json', 'jsonata'],
      typeField: resolveSelector('$entryType'),
    });
    methodsEnum.forEach((method) => {
      setFormValues(method, this[method]);
    });
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
  },
});

export default List;
