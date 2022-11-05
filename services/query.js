// ======================== Query Pagination ===========================

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 20;
const DEFAULT_SORT = "_id";

// ======================== Get Pagination =============================
const getPagination = (query) => {
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
  const skip = (page - 1) * limit;
  const select = query.select;
  const endIndex = page * limit;

  const sort = query.sort || DEFAULT_SORT;
  return {
    page,
    skip,
    limit,
    sort,
    select,
    endIndex,
  };
};

// ======================== Set Pagination =============================

const setPagination = (skip, endIndex, total, page, limit) => {
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (skip > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  return pagination;
};

// ======================== Export All Functions =======================

module.exports = { getPagination, setPagination };

// =====================================================================
