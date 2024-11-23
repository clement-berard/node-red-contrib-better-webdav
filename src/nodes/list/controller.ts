import type { NodeControllerConfig, NodeControllerInst } from '@keload/node-red-dxp/editor';
import { tryit } from '@keload/node-red-dxp/utils';
import { resolveWebDavClient } from '../../common/webdavClient';
import type { NodeListProps } from './types';

export default function (this: NodeControllerInst<NodeListProps>, config: NodeControllerConfig<NodeListProps>) {
  RED.nodes.createNode(this, config);

  const webDavClient = resolveWebDavClient(config.webdavServer);

  const action = config.action;

  const actions = {
    list: () => {
      console.log('config.listDirectory', config.listDirectory);
      return tryit(webDavClient.getDirectoryContents)(config.listDirectory || '/');
    },
    delete: () => {
      return tryit(webDavClient.deleteFile)(config.deleteDirectory);
    },
  };

  this.on('input', async (msg) => {
    const handler = actions[action];
    if (handler) {
      const [err, resp] = await handler();
      const errResponse = err?.response as Response;
      if (err) {
        this.error({
          message: err.message,
          status: errResponse.status,
          statusText: errResponse.statusText,
        });
        return;
      }

      this.send({
        payload: resp,
      });
    } else {
      this.error(`Unknown action: ${action}`);
    }
  });
}
