import _ from 'lodash';
import dot from 'dot-object';

function escapeQueryStringQuery(query) {
  let regexString;
  let regex;

  // Taken from https://github.com/lanetix/ng-elasticsearch-sanitize/blob/master/src/ng-elastic-escape.js
  query = query
    .replace(/([-!(){}\[\]^"~*?:\+\/\\])/g, '\\$1') // replace single character special characters
    .replace(/(\|\|)/g, '\\$1') // replace ||
    .replace(/(\&\&)/g, '\\$1'); // replace &&
  _.map(['AND', 'OR', 'NOT'], (operator) => {
    regexString = `s*\\b(${operator})\\b\\s*`;
    regex = new RegExp(regexString, 'g');
    query = query.replace(regex, `${_.map(operator.split(''), ch => `\\${ch}`).join('')} `);
  });
  return query;
}

export function QueryPromise(query, func) {
  // We wrap a promise for the query. To allow chaining of methonds
  // in between the 'then-able'. func argument takes a single query argument
  // and returns a promise that is resolved with the found document.
  // This allows calls like, .find().sort().then(...)

  const self = this;
  self.q = _.cloneDeep(query);
  self.p = {
    resolve() {},
    reject() {},
  };
  self.isExecuted = false;

  self._exec = function exec() {
    if (!self.isExecuted) {
      self.isExecuted = true;


      func(self.q)
        .then((res) => {
          self.p.resolve(res);
        })
        .catch((err) => {
          self.p.reject(err);
        });
    }
  };

  self.then = function then(resolve, reject) {
    const promise = new Promise((success, error) => {
      self.p.resolve = success;
      self.p.reject = error;
      self._exec();
    });

    return promise.then(resolve, reject);
  };

  self.populate = function populate(value) {
    addPopulations(self.q, value);
    return self;
  };

  self.must = function must(value) {
    addTermFilters(self.q, value);
    return self;
  };

  self.missing = function missing(value) {
    addExistenceFilters(self.q, value);
    return self;
  };

  self.exists = function exists(value) {
    addExistenceFilters(self.q, null, value);
    return self;
  };

  self.not = function not(value) {
    addTermFilters(self.q, null, value);
    return self;
  };

  self.sort = function sort(value) {
    addSorts(self.q, value);
    return self;
  };

  // If .then() is never called, make sure we execute the query.
  // This allows the '.findAndRemove' type queries to still work
  // even when .then() is never called.
  process.nextTick(() => {
    self._exec();
  });
}

export function PagedResponse(data) {
  const self = this;
  _.assign(self, data);
}
PagedResponse.prototype.toObject = function () {
  return {
    total: this.total,
    hits: _.map(this.hits, h => h.toObject()),
    page: this.page,
    pages: this.pages,
  };
};

PagedResponse.prototype.toJSON = function () {
  return this.toObject();
};

function parseRequest(indices, types, matches, options) {
  options = options || {};
  const req = {
    index: indices,
    type: types,
    body: {
      query: { match_all: {} },
    },
  };

  let allowedOptions = [];

  if (options.id) {
    allowedOptions = ['id', 'fields', 'populate'];
  } else if (options.ids) {
    allowedOptions = ['ids', 'fields', 'populate', 'sort', 'page', 'per_page'];
  } else {
    allowedOptions = [
      'missing',
      'exists',
      'must',
      'not',
      'fields',
      'sort',
      'page',
      'per_page',
      'q',
      'populate',
    ];
  }
  options = _.pick(options, allowedOptions);

  if (options.id) req.id = options.id;
  if (options.ids) {
    req.body.query = {
      ids: {
        values: options.ids,
      },
    };
  }

  if (!_.isEmpty(matches)) {
    if (_.isString(matches)) options.q = matches;
    if (_.isPlainObject(matches)) options.must = _.merge({}, options.must, matches);
  }

  if (options.q && _.isString(options.q)) {
    // escape any special characters in the query string
    // see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html
    options.q = escapeQueryStringQuery(options.q);
    req.body.query = { query_string: { query: options.q } };
  }

  if (options.fields) {
    req.body.fields = _.isArray(options.fields) ? options.fields : [options.fields];
  }

  if (options.sort) {
    addSorts(req, options.sort);
  }

  if (options.page || options.per_page) {
    addPagination(req, options.page, options.per_page);
  }

  if (options.must || options.not) {
    addTermFilters(req, options.must, options.not, options.missing, options.exists);
  }

  if (options.missing || options.exists) {
    addExistenceFilters(req, options.missing, options.exists);
  }

  if (!req.hasOwnProperty('size')) {
    // NOTE: we use a high number as our default to return everything
    // because mongoose also does so.
    req.size = 999999;
    req.from = 0;
  }

  return req;
}

export function parseResponse(options, query, res) {
  console.log('Parse Response ---------');
  console.log(query);
  console.log(res);
  if (query.body && query.body.fields) {
    // elasticsearch wraps field queries in its own body, so we clean it up a bit.
    // all in the name of an easy to use API
    res.hits.hits = _.chain(res.hits.hits)
      .pluck('fields')
      .map(_v =>
        _.map(_v, (v, k) => {
          const item = {};
          if (_.isArray(v) && v.length === 1) {
            item[k] = v[0];
          } else {
            item[k] = v;
          }
          return item;
        }))
      .flatten()
      .value();
  }

  console.log(res);

  // if _source exists, set the item as _source
  res.hits.hits = _.map(res.hits.hits, v => v._source || v);

  if (options && (options.page || options.per_page)) {
    return new PagedResponse({
      total: res.hits.total,
      hits: res.hits.hits,
      page: options.page,
      pages: Math.ceil(res.hits.total / query.size),
    });
  }
  return res.hits.hits;
}

export function addExistenceFilters(req, missingFilters, existsFilters) {
  // see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-missing-filter.html
  // and https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-filters.html

  // is this a filtered query, or a regulat?
  const boolFilter = dot.pick('body.query.filtered', req);

  const getPreviousFilters = function () {
    let andFilters;
    if (boolFilter) {
      andFilters = dot.pick('body.query.filtered.query.constant_score.filter.and', req);
    } else {
      andFilters = dot.pick('body.query.constant_score.filter.and', req);
    }
    return andFilters || [];
  };

  const query = {
    constant_score: {
      filter: {
        and: getPreviousFilters(),
      },
    },
  };

  const makeFilter = function (name, filters) {
    if (filters) {
      filters = _.isArray(filters) ? filters : [filters];
      _.forEach(filters, (v) => {
        const f = {};
        f[name] = { field: v };
        query.constant_score.filter.and.push(f);
      });
    }
  };

  makeFilter('missing', missingFilters);
  makeFilter('exists', existsFilters);

  if (boolFilter) {
    req.body.query.filtered.query = query;
  } else {
    req.body.query = query;
  }
}

export function addTermFilters(req, mustFilters, notFilters) {
  const filter = {
    bool: {
      must: [],
      must_not: [],
    },
  };

  const makeTermFilter = function (v, k) {
    const f = {};
    if (_.isArray(v)) {
      f.terms = {};
      f.terms[k] = v;
    } else {
      f.term = {};
      f.term[k] = v;
    }
    return f;
  };

  filter.bool.must = _.map(mustFilters, makeTermFilter);
  filter.bool.must_not = _.map(notFilters, makeTermFilter);

  // Remove any empty filters, Elasticsearch will throw an error.
  _.each(filter.bool, (v, k) => {
    if (!v || !v.length) delete filter.bool[k];
  });

  // No filters found? return now.
  if (_.isEmpty(filter.bool)) return void 0;

  // Is this a new filtered query, or an existing to merge with?
  const boolFilter = dot.pick('body.query.filtered.filter.bool', req);

  const mergeFilter = function mergeFilter(filterName, data) {
    if (_.isArray(boolFilter[filterName])) {
      req.body.query.filtered.filter.bool[filterName] = req.body.query.filtered.filter.bool[
        filterName
      ].concat(data);
    } else if (_.isPlainObject(boolFilter[filterName])) {
      req.body.query.filtered.filter.bool[filterName] = [boolFilter[filterName]];
      req.body.query.filtered.filter.bool[filterName] = req.body.query.filtered.filter.bool[
        filterName
      ].concat(data);
    } else {
      req.body.query.filtered.filter.bool[filterName] = data;
    }
  };

  if (boolFilter) {
    if (filter.bool.must) mergeFilter('must', filter.bool.must);
    if (filter.bool.must_not) mergeFilter('must_not', filter.bool.must_not);
  } else {
    req.body.query = {
      filtered: {
        query: req.body.query,
        filter,
      },
    };
  }

  // /Pretty sure elasticsearch doesn't allow arrays for 'must' when only one rule is added.
  if (
    req.body.query.filtered.filter.bool.must &&
    req.body.query.filtered.filter.bool.must.length === 1
  ) {
    req.body.query.filtered.filter.bool.must = req.body.query.filtered.filter.bool.must[0];
  }
  if (
    req.body.query.filtered.filter.bool.must_not &&
    req.body.query.filtered.filter.bool.must_not.length === 1
  ) {
    req.body.query.filtered.filter.bool.must_not = req.body.query.filtered.filter.bool.must_not[0];
  }
}

export function addPagination(req, page, per_page) {
  if (!page && !per_page) return void 0;
  page = isNaN(parseInt(page)) || page <= 0 ? 1 : parseInt(page);
  per_page = isNaN(parseInt(per_page)) || per_page <= 1 ? 10 : parseInt(per_page);
  req.from = (page - 1) * per_page;
  req.size = per_page;
}

function addSorts(req, sorts) {
  sorts = _.isString(sorts) ? [sorts] : sorts;

  const result = {
    sort: [],
  };

  const makeSort = function (sort) {
    let item = {},
      order;
    if (_.startsWith(sort, '-')) {
      sort = sort.substring(1);
      order = 'desc';
    } else {
      order = 'asc';
    }
    item[sort] = { order, ignore_unmapped: true };
    return item;
  };

  result.sort = _.map(sorts, makeSort);

  if (result.sort.length === 1) {
    result.sort = result.sort[0];
  }

  if (_.isArray(req.body.sort)) {
    req.body.sort = req.body.sort.concat(result.sort);
  } else {
    req.body.sort = result.sort;
  }
}

function addPopulations(req, value) {
  if (!req.populate) req.populate = [];
  req.populate.push(value);
}
