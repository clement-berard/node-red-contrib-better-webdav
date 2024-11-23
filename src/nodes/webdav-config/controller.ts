import type { NodeControllerConfig, NodeControllerInst } from '@keload/node-red-dxp/editor';
import type { NodeProps } from './types';

export const credentials = {
  user: { type: 'text' },
  password: { type: 'password' },
};

export default function (this: NodeControllerInst<NodeProps>, config: NodeControllerConfig<NodeProps>) {
  RED.nodes.createNode(this, config);

  this.name = config.name;
  this.host = config.host;
  this.basePath = config.basePath;
}
