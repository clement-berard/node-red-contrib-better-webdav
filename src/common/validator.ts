import * as sstruct from 'superstruct';
import type { Infer } from 'superstruct';
import { methodsEnum } from './constants-client-side';

export const methodsSchema = sstruct.enums(methodsEnum);

export const actionValidators = {
  getDirectoryContents: {
    schema: sstruct.object({
      details: sstruct.optional(sstruct.boolean()),
      deep: sstruct.optional(sstruct.boolean()),
      directory: sstruct.string(),
    }),
  },
  deleteFile: {
    schema: sstruct.object({
      directory: sstruct.string(),
    }),
  },
};

export function validateAction(actionName: string, toValidate: Record<string, any>) {
  const [errValidate] = sstruct
    .assign(
      sstruct.object({
        action: methodsSchema,
      }),
      actionValidators?.[actionName]?.schema || {},
    )
    .validate({ action: actionName, ...toValidate });

  return errValidate;
}
