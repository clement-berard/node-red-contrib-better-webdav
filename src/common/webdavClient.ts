import { createClient } from 'webdav';

type GetWebDavClientParams = {
  host: string;
  basePath: string;
  user?: string;
  password?: string;
};

export function getWebDavClient(params: GetWebDavClientParams) {
  const basePath = params.basePath || '/';

  return createClient(`${params.host}${basePath}`, {
    username: params?.user,
    password: params?.password,
    remoteBasePath: basePath,
  });
}

export function resolveWebDavClient(serverConfigId: string) {
  const webdavServer = RED.nodes.getNode(serverConfigId);

  // @ts-ignore
  return getWebDavClient({
    // @ts-ignore
    host: webdavServer.host,
    // @ts-ignore
    basePath: webdavServer.basePath,
    // @ts-ignore
    user: webdavServer.credentials.user,
    // @ts-ignore
    password: webdavServer.credentials.password,
  });
}
