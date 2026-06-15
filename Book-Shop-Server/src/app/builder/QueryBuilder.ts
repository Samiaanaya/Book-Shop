/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchText = this?.query?.search;

    if (searchText) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchText, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = [
      'search',
      'fields',
      'priceRange',
      'sort',
      'limit',
      'page',
    ];

    excludeFields.forEach((el) => delete queryObj[el]);

    const priceFilter: Record<string, any> = {};

    if (this.query.priceRange === '100') {
      priceFilter['price'] = { $gte: 0, $lte: 100 };
    } else if (this.query.priceRange === '200') {
      priceFilter['price'] = { $gte: 100, $lte: 200 };
    } else if (this.query.priceRange === '300') {
      priceFilter['price'] = { $gte: 200, $lte: 300 };
    } else if (this.query.priceRange === '400') {
      priceFilter['price'] = { $gte: 300, $lte: 400 };
    } else if (this.query.priceRange === 'high') {
      priceFilter['price'] = { $gte: 400 };
    }

    this.modelQuery = this.modelQuery.find({
      ...queryObj,
      ...priceFilter,
    } as FilterQuery<T>);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }

  paginate() {
    const page = Number(this?.query?.page || 1);
    const limit = Number(this?.query?.limit || 10);
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;
