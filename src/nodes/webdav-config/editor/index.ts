import { type NodeEditorProps, createEditorNode } from '@keload/node-red-dxp/editor';
import { isUrl } from '@keload/node-red-dxp/utils';
import type { NodeCredentials, NodeProps } from '../types';

const WebdavConfig = createEditorNode<NodeEditorProps<NodeProps>, NodeCredentials>({
  category: 'config',
  defaults: {
    name: { value: '', required: true },
    basePath: { value: '' },
    host: { value: '', required: true, validate: (v) => isUrl(v) },
  },
  credentials: {
    user: { type: 'text' },
    password: { type: 'password' },
  },
  label: function () {
    return this.name || 'WebdavConfig';
  },
});

export default WebdavConfig;
