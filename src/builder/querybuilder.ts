import { FilterQuery, Query } from 'mongoose';

interface QueryParams {
  search?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
  fields?: string;
  filter?: string;
  [key: string]: unknown;
}

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: QueryParams;

  constructor(modelQuery: Query<T[], T>, query: QueryParams) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query.search;
    console.log(searchTerm)
    if (searchTerm && searchableFields.length > 0) {
      const searchQuery = {
        $or: searchableFields.map((field) => ({
          [field]: { $regex: new RegExp(searchTerm as string, 'i') },
        })),
      };
      this.modelQuery = this.modelQuery.find(searchQuery as FilterQuery<T>);
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludedFields = ['search', 'page', 'limit', 'sortOrder', 'sortBy', 'fields'];
    excludedFields.forEach((key) => delete queryObj[key]);

    const filterQuery: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(queryObj)) {
      filterQuery[key] = { $regex: new RegExp(value as string, 'i') };
    }
    
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  paginate() {
    const page = Math.max(1, Number(this.query.page) || 1);
    const limit = Math.max(1, Number(this.query.limit) || 10);
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  sort() {
    const sortBy = this.query.sortBy || 'createdAt';
    const sortOrder = this.query.sortOrder === 'desc' ? '-' : '';
    const sortStr = `${sortOrder}${sortBy}`;

    this.modelQuery = this.modelQuery.sort(sortStr);
    return this;
  }

  select() {
    const fields = (this.query.fields as string)?.split(',').join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  build() {
    return this.modelQuery;
  }
}

export default QueryBuilder;