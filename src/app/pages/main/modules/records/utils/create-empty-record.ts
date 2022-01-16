import { NewRecord } from '../types/new-record-type';

export function createEmptyRecord(): NewRecord {
  return { title: '', description: '', login: '', password: '' };
}
