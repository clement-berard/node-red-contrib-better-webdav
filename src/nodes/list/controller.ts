import type { NodeControllerConfig, NodeControllerInst } from '@keload/node-red-dxp/editor';
import { omit, tryit } from 'radash';
import { methodsSchema, validateAction } from '../../common/validator';
import { resolveWebDavClient } from '../../common/webdavClient';
import type { NodeListProps } from './types';

function resolveActionData(config: NodeControllerConfig<any>, action: string, innerPayload: Record<any, any>) {
  const realData = omit(innerPayload || config[action], ['action']);
  const errValidate = validateAction(action, realData);

  return [errValidate, realData] as const;
}

export default function (this: NodeControllerInst<NodeListProps>, config: NodeControllerConfig<NodeListProps>) {
  RED.nodes.createNode(this, config);

  const webDavClient = resolveWebDavClient(config.webdavServer);

  const action = config.action;

  const actions = {
    getDirectoryContents: (innerPayload: Record<any, any>) => {
      const [err, resp] = resolveActionData(config, 'getDirectoryContents', innerPayload);
      if (err) {
        return [err] as const;
      }

      const { directory, ...options } = resp || {};
      return tryit(webDavClient.getDirectoryContents)(directory || '/', options || {});
    },
    deleteFile: (innerPayload: Record<any, any>) => {
      const [err, resp] = resolveActionData(config, 'deleteFile', innerPayload);
      if (err) {
        return [err] as const;
      }

      const { directory, ...options } = resp || {};
      return tryit(webDavClient.deleteFile)(directory || '/');
    },
  };

  this.on('input', async (msg) => {
    // @ts-ignore
    const [, innerPayload] = tryit(RED.util.evaluateNodeProperty)(config.entry, config.entryType, this, msg) as [
      Error,
      any,
    ];

    const currentAction = innerPayload?.action || action;

    const [errValidationAction] = methodsSchema.validate(currentAction);

    if (errValidationAction) {
      this.error({
        message: errValidationAction.message,
      });
      return;
    }

    const handler = actions[action];
    if (handler) {
      const [err, resp] = await handler(innerPayload);
      const errResponse = err?.response as Response;
      if (err) {
        this.error({
          message: err.message,
          status: errResponse?.status,
          statusText: errResponse?.statusText,
        });
        return;
      }

      this.send({
        ...msg,
        payload: resp,
      });
    } else {
      this.error(`Unknown action: ${action}`);
    }
  });
}
