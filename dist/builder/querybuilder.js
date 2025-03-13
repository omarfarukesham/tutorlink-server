"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        const searchTerm = this.query.search;
        if (searchTerm && searchableFields.length > 0) {
            const searchQuery = {
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: new RegExp(searchTerm, 'i') },
                })),
            };
            this.modelQuery = this.modelQuery.find(searchQuery);
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        const excludedFields = ['search', 'page', 'limit', 'sortOrder', 'sortBy', 'fields'];
        excludedFields.forEach((key) => delete queryObj[key]);
        if (queryObj.filter) {
            queryObj.author = queryObj.filter;
            delete queryObj.filter;
        }
        this.modelQuery = this.modelQuery.find(queryObj);
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
        var _a;
        const fields = ((_a = this.query.fields) === null || _a === void 0 ? void 0 : _a.split(',').join(' ')) || '-__v';
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
    build() {
        return this.modelQuery;
    }
}
exports.default = QueryBuilder;
