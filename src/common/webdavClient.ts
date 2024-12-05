import { AuthType, createClient } from 'webdav';

type GetWebDavClientParams = {
  host: string;
  basePath: string;
  user?: string;
  password?: string;
};

export function getWebDavClient(params: GetWebDavClientParams) {
  // let basePath = params.basePath || '';
  //
  // if (basePath === '/') {
  //   basePath = '';
  // }
  //
  // if (basePath !== '' && basePath.endsWith('/')) {
  //   basePath = basePath.slice(0, -1);
  // }

  return createClient(`${params.host}`, {
    username: params?.user,
    password: params?.password,
    remoteBasePath: '/',
    authType: AuthType.Auto,
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
