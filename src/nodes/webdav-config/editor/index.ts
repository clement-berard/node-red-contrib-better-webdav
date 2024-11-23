import { type NodeEditorProps, createEditorNode } from '@keload/node-red-dxp/editor';
import { watchInput } from '@keload/node-red-dxp/editor/dom-helper';
import { validators } from '@keload/node-red-dxp/utils';
import type { NodeCredentials, NodeProps } from '../types';

const WebdavConfig = createEditorNode<NodeEditorProps<NodeProps>, NodeCredentials>({
  category: 'config',
  color: '#a6bbcf',
  defaults: {
    name: { value: '', required: true },
    basePath: { value: '' },
    host: { value: '', required: true, validate: (v) => validators.isUrl(v) },
  },
  credentials: {
    user: { type: 'text' },
    password: { type: 'password' },
  },
  inputs: 1,
  outputs: 1,
  icon: 'font-awesome/fa-tower-broadcast',
  label: function () {
    return this.name || 'WebdavConfig';
  },
  oneditprepare: () => {
    // $age == #node-input-age in DOM
    watchInput('$age', ([ageValue]) => {
      console.log('ageValue', ageValue);
    });
  },
});

export default WebdavConfig;
