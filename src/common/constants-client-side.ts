import { title } from 'radash';

export const NODES_CATEGORY = 'webdav';
export const NODES_COLOR = '#00A6FB';
export const NODES_ICONS = 'font-awesome/fa-folder-open';

type WebdavMethods = {
  methodName: string;
  label?: string;
  enabled?: boolean;
};

export const webdavMethods: WebdavMethods[] = [
  {
    methodName: 'copyFile',
  },
  {
    methodName: 'createDirectory',
    enabled: true,
  },
  {
    methodName: 'createReadStream',
  },
  {
    methodName: 'createWriteStream',
  },
  {
    methodName: 'customRequest',
  },
  {
    methodName: 'deleteFile',
    label: 'Delete (Folder/File)',
    enabled: true,
  },
  {
    methodName: 'exists',
    enabled: true,
  },
  {
    methodName: 'getDirectoryContents',
    enabled: true,
  },
  {
    methodName: 'getFileContents',
    enabled: true,
  },
  {
    methodName: 'getFileDownloadLink',
  },
  {
    methodName: 'getFileUploadLink',
  },
  {
    methodName: 'getQuota',
  },
  {
    methodName: 'getStat',
  },
  {
    methodName: 'lock',
  },
  {
    methodName: 'moveFile',
  },
  {
    methodName: 'putFileContents',
  },
  {
    methodName: 'unlock',
  },
] as const;

export const cleanWebdavMethods = webdavMethods
  .map((method) => {
    return {
      ...method,
      label: method?.label || title(method.methodName),
    };
  })
  .filter((method) => method?.enabled);

export const cleanWebdavMethodsForSelect = cleanWebdavMethods.map((method) => ({
  value: method.methodName,
  text: method.label,
}));

export const methodsEnum = webdavMethods.filter((s) => s?.enabled).map((method) => method.methodName);
