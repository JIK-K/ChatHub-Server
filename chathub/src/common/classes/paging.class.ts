import { CommonUtil } from 'src/utils/common.util';

export class Paging {
  constructor(offset: number, limit: number) {
    this.offset = CommonUtil.isValid(offset) ? offset : 0;
    this.limit = CommonUtil.isValid(limit) ? limit : 10;
  }

  offset: number;
  limit: number;
}
