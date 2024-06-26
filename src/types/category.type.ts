import { BaseModel } from '@app/types';

interface Category extends BaseModel {
  name: string;
  childrenCategory?: ChildCategory;
  products?: string[];
  priority?: number;
  visible?: boolean;
  avatar?: string;
  slug?: string;
}

interface ChildCategory {
  parentId?: string;
  category?: Category[];
}

export { Category, ChildCategory };
