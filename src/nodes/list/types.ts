import type { Infer } from 'superstruct';
import type { actionValidators } from '../../common/validator';

type OrEmpty<T> = T | Record<any, any>;

export interface NodeListProps {
  webdavServer: string;
  action: string;
  entry: string;
  entryType: string;
  getDirectoryContents: OrEmpty<Infer<(typeof actionValidators)['getDirectoryContents']['schema']>>;
  deleteFile: OrEmpty<Infer<(typeof actionValidators)['deleteFile']['schema']>>;
  getFileContents: OrEmpty<Infer<(typeof actionValidators)['getFileContents']['schema']>>;
  createDirectory: OrEmpty<Infer<(typeof actionValidators)['createDirectory']['schema']>>;
  exists: OrEmpty<Infer<(typeof actionValidators)['exists']['schema']>>;
}
