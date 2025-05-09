/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { expect } from 'chai';

import { Bytes, GeoPoint, Timestamp } from '../../../src';
import { Bound, boundEquals } from '../../../src/core/bound';
import { OrderBy } from '../../../src/core/order_by';
import {
  canonifyQuery,
  LimitType,
  newQueryComparator,
  newQueryForPath,
  Query,
  queryMatches,
  queryNormalizedOrderBy,
  queryWithAddedFilter,
  queryWithEndAt,
  queryWithLimit,
  queryWithStartAt,
  stringifyQuery,
  queryToAggregateTarget,
  queryToTarget,
  QueryImpl,
  queryEquals,
  queryMatchesAllDocuments,
  queryCollectionGroup,
  newQueryForCollectionGroup
} from '../../../src/core/query';
import { canonifyTarget } from '../../../src/core/target';
import { MutableDocument } from '../../../src/model/document';
import { DOCUMENT_KEY_NAME, ResourcePath } from '../../../src/model/path';
import { addEqualityMatcher } from '../../util/equality_matcher';
import {
  andFilter,
  bound,
  doc,
  expectCorrectComparisons,
  expectEqualitySets,
  filter,
  orderBy,
  orFilter,
  query,
  ref,
  wrap
} from '../../util/helpers';

describe('Bound', () => {
  function makeBound(values: unknown[], inclusive: boolean): Bound {
    return new Bound(
      values.map(el => wrap(el)),
      inclusive
    );
  }

  it('implements isEqual', () => {
    let bound = makeBound([1, 2], true);
    expect(boundEquals(bound, makeBound([1, 2], true))).to.be.true;

    // Mismatch values
    expect(boundEquals(bound, makeBound([2, 2], true))).to.be.false;
    expect(boundEquals(bound, makeBound([1, 3], true))).to.be.false;

    // Mismatch before
    expect(boundEquals(bound, makeBound([1, 2], false))).to.be.false;

    // Unequal lengths
    expect(boundEquals(bound, makeBound([], true))).to.be.false;
    expect(boundEquals(bound, makeBound([1], true))).to.be.false;
    expect(boundEquals(bound, makeBound([1, 2, 3], true))).to.be.false;

    // Zero length
    bound = makeBound([], false);
    expect(boundEquals(bound, makeBound([], false))).to.be.true;
  });
});

describe('Query', () => {
  addEqualityMatcher({ equalsFn: queryEquals, forType: QueryImpl });

  it('can get collection group', () => {
    expect(queryCollectionGroup(query('foo'))).to.equal('foo');
    expect(queryCollectionGroup(query('foo/bar'))).to.equal('foo');
    expect(queryCollectionGroup(newQueryForCollectionGroup('foo'))).to.equal(
      'foo'
    );
  });

  it('matches based on document key', () => {
    const queryKey = new ResourcePath(['rooms', 'eros', 'messages', '1']);
    const doc1 = doc('rooms/eros/messages/1', 0, { text: 'msg1' });
    const doc2 = doc('rooms/eros/messages/2', 0, { text: 'msg2' });
    const doc3 = doc('rooms/other/messages/1', 0, { text: 'msg3' });
    // document query
    const query = newQueryForPath(queryKey);
    expect(queryMatches(query, doc1)).to.equal(true);
    expect(queryMatches(query, doc2)).to.equal(false);
    expect(queryMatches(query, doc3)).to.equal(false);
  });

  it('matches correctly for shallow ancestor query', () => {
    const queryPath = new ResourcePath(['rooms', 'eros', 'messages']);
    const doc1 = doc('rooms/eros/messages/1', 0, { text: 'msg1' });
    const doc1meta = doc('rooms/eros/messages/1/meta/1', 0, {
      meta: 'meta-value'
    });
    const doc2 = doc('rooms/eros/messages/2', 0, { text: 'msg2' });
    const doc3 = doc('rooms/other/messages/1', 0, { text: 'msg3' });
    // shallow ancestor query
    const query = newQueryForPath(queryPath);
    expect(queryMatches(query, doc1)).to.equal(true);
    expect(queryMatches(query, doc1meta)).to.equal(false);
    expect(queryMatches(query, doc2)).to.equal(true);
    expect(queryMatches(query, doc3)).to.equal(false);
  });

  it('matches primitive values for filters', () => {
    const query1 = query('collection', filter('sort', '>=', 2));
    const query2 = query('collection', filter('sort', '<=', 2));
    const doc1 = doc('collection/1', 0, { sort: 1 });
    const doc2 = doc('collection/2', 0, { sort: 2 });
    const doc3 = doc('collection/3', 0, { sort: 3 });
    const doc4 = doc('collection/4', 0, { sort: false });
    const doc5 = doc('collection/5', 0, { sort: 'string' });

    expect(queryMatches(query1, doc1)).to.equal(false);
    expect(queryMatches(query1, doc2)).to.equal(true);
    expect(queryMatches(query1, doc3)).to.equal(true);
    expect(queryMatches(query1, doc4)).to.equal(false);
    expect(queryMatches(query1, doc5)).to.equal(false);

    expect(queryMatches(query2, doc1)).to.equal(true);
    expect(queryMatches(query2, doc2)).to.equal(true);
    expect(queryMatches(query2, doc3)).to.equal(false);
    expect(queryMatches(query2, doc4)).to.equal(false);
    expect(queryMatches(query2, doc5)).to.equal(false);
  });

  it('matches array-contains filters', () => {
    const query1 = query('collection', filter('array', 'array-contains', 42));

    // not an array
    let document = doc('collection/1', 0, { array: 1 });
    expect(queryMatches(query1, document)).to.be.false;

    // empty array.
    document = doc('collection/1', 0, { array: [] });
    expect(queryMatches(query1, document)).to.be.false;

    // array without element (and make sure it doesn't match in a nested field
    // or a different field).
    document = doc('collection/1', 0, {
      array: [41, '42', { a: 42, b: [42] }],
      different: [42]
    });
    expect(queryMatches(query1, document)).to.be.false;

    // array with element.
    document = doc('collection/1', 0, { array: [1, '2', 42, { a: 1 }] });
    expect(queryMatches(query1, document)).to.be.true;
  });

  it('matches array-contains filters with object values', () => {
    // Search for arrays containing the object { a: [42] }
    const query1 = query(
      'collection',
      filter('array', 'array-contains', { a: [42] })
    );

    // array without element.
    let document = doc('collection/1', 0, {
      array: [{ a: 42 }, { a: [42, 43] }, { b: [42] }, { a: [42], b: 42 }]
    });
    expect(queryMatches(query1, document)).to.be.false;

    // array with element.
    document = doc('collection/1', 0, {
      array: [1, '2', 42, { a: [42] }]
    });
    expect(queryMatches(query1, document)).to.be.true;
  });

  it('matches IN filters', () => {
    const query1 = query('collection', filter('zip', 'in', [12345]));

    let document = doc('collection/1', 0, { zip: 12345 });
    expect(queryMatches(query1, document)).to.be.true;

    // Value matches in array.
    document = doc('collection/1', 0, { zip: [12345] });
    expect(queryMatches(query1, document)).to.be.false;

    // Non-type match.
    document = doc('collection/1', 0, { zip: '123435' });
    expect(queryMatches(query1, document)).to.be.false;

    // Nested match.
    document = doc('collection/1', 0, {
      zip: [123, '12345', { zip: 12345, b: [42] }]
    });
    expect(queryMatches(query1, document)).to.be.false;
  });

  it('matches IN filters with object values', () => {
    const query1 = query('collection', filter('zip', 'in', [{ a: [42] }]));

    // Containing object in array.
    let document = doc('collection/1', 0, {
      zip: [{ a: 42 }]
    });
    expect(queryMatches(query1, document)).to.be.false;

    // Containing object.
    document = doc('collection/1', 0, {
      zip: { a: [42] }
    });
    expect(queryMatches(query1, document)).to.be.true;
  });

  it('matches not-in filters', () => {
    const query1 = query('collection', filter('zip', 'not-in', [12345]));

    // No match.
    let document = doc('collection/1', 0, { zip: 23456 });
    expect(queryMatches(query1, document)).to.be.true;

    // Value matches in array.
    document = doc('collection/1', 0, { zip: [12345] });
    expect(queryMatches(query1, document)).to.be.true;

    // Non-type match.
    document = doc('collection/1', 0, { zip: '12345' });
    expect(queryMatches(query1, document)).to.be.true;

    // Nested match.
    document = doc('collection/1', 0, {
      zip: [123, '12345', { zip: 12345, b: [42] }]
    });
    expect(queryMatches(query1, document)).to.be.true;

    // Null match.
    document = doc('collection/1', 0, {
      zip: null
    });
    expect(queryMatches(query1, document)).to.be.false;

    // NaN match.
    document = doc('collection/1', 0, {
      zip: Number.NaN
    });
    expect(queryMatches(query1, document)).to.be.true;

    // Direct match.
    document = doc('collection/1', 0, { zip: 12345 });
    expect(queryMatches(query1, document)).to.be.false;

    // Field not set.
    document = doc('collection/1', 0, { chip: 23456 });
    expect(queryMatches(query1, document)).to.be.false;
  });

  it('matches not-in filters with object values', () => {
    const query1 = query('collection', filter('zip', 'not-in', [{ a: [42] }]));

    // Containing object in array.
    let document = doc('collection/1', 0, {
      zip: [{ a: 42 }]
    });
    expect(queryMatches(query1, document)).to.be.true;

    // Containing object.
    document = doc('collection/1', 0, {
      zip: { a: [42] }
    });
    expect(queryMatches(query1, document)).to.be.false;
  });

  it('matches array-contains-any filters', () => {
    const query1 = query(
      'collection',
      filter('zip', 'array-contains-any', [12345])
    );

    let document = doc('collection/1', 0, { zip: [12345] });
    expect(queryMatches(query1, document)).to.be.true;

    // Value matches in non-array.
    document = doc('collection/1', 0, { zip: 12345 });
    expect(queryMatches(query1, document)).to.be.false;

    // Non-type match.
    document = doc('collection/1', 0, { zip: ['12345'] });
    expect(queryMatches(query1, document)).to.be.false;

    // Nested match.
    document = doc('collection/1', 0, {
      zip: [123, '12345', { zip: [12345], b: [42] }]
    });
    expect(queryMatches(query1, document)).to.be.false;
  });

  it('matches array-contains-any filters with object values', () => {
    const query1 = query(
      'collection',
      filter('zip', 'array-contains-any', [{ a: [42] }])
    );

    // Containing object in array.
    let document = doc('collection/1', 0, {
      zip: [{ a: [42] }]
    });
    expect(queryMatches(query1, document)).to.be.true;

    // Containing object.
    document = doc('collection/1', 0, {
      zip: { a: [42] }
    });
    expect(queryMatches(query1, document)).to.be.false;
  });

  it('matches NaN for filters', () => {
    const query1 = query('collection', filter('sort', '==', NaN));
    const doc1 = doc('collection/1', 0, { sort: NaN });
    const doc2 = doc('collection/2', 0, { sort: 2 });
    const doc3 = doc('collection/3', 0, { sort: 3.1 });
    const doc4 = doc('collection/4', 0, { sort: false });
    const doc5 = doc('collection/5', 0, { sort: 'string' });
    const doc6 = doc('collection/6', 0, { sort: null });

    expect(queryMatches(query1, doc1)).to.equal(true);
    expect(queryMatches(query1, doc2)).to.equal(false);
    expect(queryMatches(query1, doc3)).to.equal(false);
    expect(queryMatches(query1, doc4)).to.equal(false);
    expect(queryMatches(query1, doc5)).to.equal(false);
    expect(queryMatches(query1, doc6)).to.equal(false);

    const query2 = query('collection', filter('sort', '!=', NaN));
    expect(queryMatches(query2, doc1)).to.equal(false);
    expect(queryMatches(query2, doc2)).to.equal(true);
    expect(queryMatches(query2, doc3)).to.equal(true);
    expect(queryMatches(query2, doc4)).to.equal(true);
    expect(queryMatches(query2, doc5)).to.equal(true);
    expect(queryMatches(query2, doc6)).to.equal(false);
  });

  it('matches null for filters', () => {
    const query1 = query('collection', filter('sort', '==', null));
    const doc1 = doc('collection/1', 0, { sort: null });
    const doc2 = doc('collection/2', 0, { sort: 2 });
    const doc3 = doc('collection/3', 0, { sort: 3.1 });
    const doc4 = doc('collection/4', 0, { sort: false });
    const doc5 = doc('collection/5', 0, { sort: 'string' });
    const doc6 = doc('collection/1', 0, { sort: NaN });

    expect(queryMatches(query1, doc1)).to.equal(true);
    expect(queryMatches(query1, doc2)).to.equal(false);
    expect(queryMatches(query1, doc3)).to.equal(false);
    expect(queryMatches(query1, doc4)).to.equal(false);
    expect(queryMatches(query1, doc5)).to.equal(false);
    expect(queryMatches(query1, doc6)).to.equal(false);

    const query2 = query('collection', filter('sort', '!=', null));
    expect(queryMatches(query2, doc1)).to.equal(false);
    expect(queryMatches(query2, doc2)).to.equal(true);
    expect(queryMatches(query2, doc3)).to.equal(true);
    expect(queryMatches(query2, doc4)).to.equal(true);
    expect(queryMatches(query2, doc5)).to.equal(true);
    expect(queryMatches(query2, doc6)).to.equal(true);
  });

  it('matches complex objects for filters', () => {
    const query1 = query('collection', filter('sort', '<=', 2));
    const query2 = query('collection', filter('sort', '>=', 2));

    const doc1 = doc('collection/1', 0, { sort: 2 });
    const doc2 = doc('collection/2', 0, { sort: [] });
    const doc3 = doc('collection/3', 0, { sort: [1] });
    const doc4 = doc('collection/4', 0, { sort: { foo: 2 } });
    const doc5 = doc('collection/5', 0, { sort: { foo: 'bar' } });
    const doc6 = doc('collection/6', 0, {}); // no sort field
    const doc7 = doc('collection/7', 0, { sort: [3, 1] });

    expect(queryMatches(query1, doc1)).to.equal(true);
    expect(queryMatches(query1, doc2)).to.equal(false);
    expect(queryMatches(query1, doc3)).to.equal(false);
    expect(queryMatches(query1, doc4)).to.equal(false);
    expect(queryMatches(query1, doc5)).to.equal(false);
    expect(queryMatches(query1, doc6)).to.equal(false);
    expect(queryMatches(query1, doc7)).to.equal(false);

    expect(queryMatches(query2, doc1)).to.equal(true);
    expect(queryMatches(query2, doc2)).to.equal(false);
    expect(queryMatches(query2, doc3)).to.equal(false);
    expect(queryMatches(query2, doc4)).to.equal(false);
    expect(queryMatches(query2, doc5)).to.equal(false);
    expect(queryMatches(query2, doc6)).to.equal(false);
    expect(queryMatches(query2, doc7)).to.equal(false);
  });

  it("doesn't crash querying unset fields", () => {
    const query1 = query('collection', filter('sort', '==', 2));

    const doc1 = doc('collection/1', 0, { sort: 2 });
    const doc2 = doc('collection/1', 0, {});

    expect(queryMatches(query1, doc1)).to.equal(true);
    expect(queryMatches(query1, doc2)).to.equal(false);
  });

  it("doesn't remove complex objects with orderBy", () => {
    const query1 = query('collection', orderBy('sort'));

    const doc1 = doc('collection/1', 0, { sort: 2 });
    const doc2 = doc('collection/2', 0, { sort: [] });
    const doc3 = doc('collection/3', 0, { sort: [1] });
    const doc4 = doc('collection/4', 0, { sort: { foo: 2 } });
    const doc5 = doc('collection/5', 0, { sort: { foo: 'bar' } });

    expect(queryMatches(query1, doc1)).to.equal(true);
    expect(queryMatches(query1, doc2)).to.equal(true);
    expect(queryMatches(query1, doc3)).to.equal(true);
    expect(queryMatches(query1, doc4)).to.equal(true);
    expect(queryMatches(query1, doc5)).to.equal(true);
  });

  it('filters based on array value', () => {
    const baseQuery = query('collection');
    const doc1 = doc('collection/doc', 0, { tags: ['foo', 1, true] });
    const matchingFilters = [filter('tags', '==', ['foo', 1, true])];
    const nonMatchingFilters = [
      filter('tags', '==', 'foo'),
      filter('tags', '==', ['foo', 1]),
      filter('tags', '==', ['foo', true, 1])
    ];
    for (const filter of matchingFilters) {
      const filteredQuery = queryWithAddedFilter(baseQuery, filter);
      expect(queryMatches(filteredQuery, doc1)).to.equal(true);
    }
    for (const filter of nonMatchingFilters) {
      const filteredQuery = queryWithAddedFilter(baseQuery, filter);
      expect(queryMatches(filteredQuery, doc1)).to.equal(false);
    }
  });

  it('filters based on object value', () => {
    const baseQuery = query('collection');
    const doc1 = doc('collection/doc', 0, {
      tags: { foo: 'foo', a: 0, b: true, c: NaN }
    });
    const matchingFilters = [
      filter('tags', '==', { foo: 'foo', a: 0, b: true, c: NaN }),
      filter('tags', '==', { b: true, a: 0, foo: 'foo', c: NaN }),
      filter('tags.foo', '==', 'foo')
    ];
    const nonMatchingFilters = [
      filter('tags', '==', 'foo'),
      filter('tags', '==', { foo: 'foo', a: 0, b: true })
    ];
    for (const filter of matchingFilters) {
      const filteredQuery = queryWithAddedFilter(baseQuery, filter);
      expect(queryMatches(filteredQuery, doc1)).to.equal(true);
    }
    for (const filter of nonMatchingFilters) {
      const filteredQuery = queryWithAddedFilter(baseQuery, filter);
      expect(queryMatches(filteredQuery, doc1)).to.equal(false);
    }
  });

  it('sorts documents in the correct order', () => {
    const query1 = query('collection', orderBy('sort'));

    const docs = [
      doc('collection/1', 0, { sort: null }),
      doc('collection/1', 0, { sort: false }),
      doc('collection/1', 0, { sort: true }),
      doc('collection/1', 0, { sort: 1 }),
      doc('collection/2', 0, { sort: 1 }), // by key
      doc('collection/3', 0, { sort: 1 }), // by key,
      doc('collection/1', 0, { sort: 1.9 }),
      doc('collection/1', 0, { sort: 2 }),
      doc('collection/1', 0, { sort: 2.1 }),
      doc('collection/1', 0, { sort: '' }),
      doc('collection/1', 0, { sort: 'a' }),
      doc('collection/1', 0, { sort: 'ab' }),
      doc('collection/1', 0, { sort: 'b' }),
      doc('collection/1', 0, { sort: ref('collection/id1') })
    ];

    expectCorrectComparisons(docs, newQueryComparator(query1));
  });

  it('sorts documents using multiple fields', () => {
    const query1 = query('collection', orderBy('sort1'), orderBy('sort2'));

    const docs = [
      doc('collection/1', 0, { sort1: 1, sort2: 1 }),
      doc('collection/1', 0, { sort1: 1, sort2: 2 }),
      doc('collection/2', 0, { sort1: 1, sort2: 2 }), // by key
      doc('collection/3', 0, { sort1: 1, sort2: 2 }), // by key
      doc('collection/1', 0, { sort1: 1, sort2: 3 }),
      doc('collection/1', 0, { sort1: 2, sort2: 1 }),
      doc('collection/1', 0, { sort1: 2, sort2: 2 }),
      doc('collection/2', 0, { sort1: 2, sort2: 2 }), // by key
      doc('collection/3', 0, { sort1: 2, sort2: 2 }), // by key
      doc('collection/1', 0, { sort1: 2, sort2: 3 })
    ];

    expectCorrectComparisons(docs, newQueryComparator(query1));
  });

  it('sorts documents with descending too', () => {
    const query1 = query(
      'collection',
      orderBy('sort1', 'desc'),
      orderBy('sort2', 'desc')
    );

    const docs = [
      doc('collection/1', 0, { sort1: 2, sort2: 3 }),
      doc('collection/3', 0, { sort1: 2, sort2: 2 }),
      doc('collection/2', 0, { sort1: 2, sort2: 2 }), // by key
      doc('collection/1', 0, { sort1: 2, sort2: 2 }), // by key
      doc('collection/1', 0, { sort1: 2, sort2: 1 }),
      doc('collection/1', 0, { sort1: 1, sort2: 3 }),
      doc('collection/3', 0, { sort1: 1, sort2: 2 }),
      doc('collection/2', 0, { sort1: 1, sort2: 2 }), // by key
      doc('collection/1', 0, { sort1: 1, sort2: 2 }), // by key
      doc('collection/1', 0, { sort1: 1, sort2: 1 })
    ];

    expectCorrectComparisons(docs, newQueryComparator(query1));
  });

  it('generates canonical ids', () => {
    /* tslint:disable:variable-name */
    const q1a = query('foo', filter('i1', '<', 2), filter('i2', '==', 3));
    const q1b = query('foo', filter('i1', '<', 2), filter('i2', '==', 3));

    const q2a = query('foo');
    const q2b = query('foo');

    const q3a = query('foo/bar');
    const q3b = query('foo/bar');

    const q4a = query('foo', orderBy('foo'), orderBy('bar'));
    const q4b = query('foo', orderBy('foo'), orderBy('bar'));
    const q5a = query('foo', orderBy('bar'), orderBy('foo'));

    const q6a = query('foo', filter('bar', '>', 2), orderBy('bar'));

    const q7a = queryWithLimit(query('foo'), 10, LimitType.First);
    const q8a = queryWithLimit(query('foo'), 10, LimitType.Last);

    const lip1a = bound(['coll/foo'], false);
    const lip1b = bound(['coll/foo'], true);
    const lip2 = bound(['coll/bar'], false);
    // TODO(b/35851862): descending key ordering not supported yet
    // const lip3 = bound([[DOCUMENT_KEY_NAME, 'coll/bar', 'desc']]);

    const q9a = queryWithStartAt(query('foo'), lip1a);
    const q10a = queryWithStartAt(query('foo'), lip1b);
    const q11a = queryWithStartAt(query('foo'), lip2);
    const q12a = queryWithEndAt(query('foo'), lip1a);
    const q13a = queryWithEndAt(query('foo'), lip1b);
    const q14a = queryWithEndAt(query('foo'), lip2);

    // TODO(b/35851862): descending key ordering not supported yet
    // const q15a = query('foo')
    // .addOderBy(orderBy(DOCUMENT_KEY_NAME, 'desc'))
    // .withUpperBound(lip3, 'inclusive');
    // const q16a = query('foo')
    // .addOderBy(orderBy(DOCUMENT_KEY_NAME, 'desc'))
    // .withUpperBound(lip3, 'exclusive');

    const relativeReference = ref('col/doc');
    const absoluteReference = ref(
      'projects/project1/databases/database1/documents/col/doc',
      5
    );

    const q17a = query(
      'foo',
      filter('object', '==', { ref: relativeReference })
    );
    const q17b = query(
      'foo',
      filter('object', '==', { ref: absoluteReference })
    );

    const q18a = query('foo', filter('array', '==', [relativeReference]));
    const q18b = query('foo', filter('array', '==', [absoluteReference]));

    const queries = [
      [q1a, q1b],
      [q2a, q2b],
      [q3a, q3b],
      [q4a, q4b],
      [q5a],
      [q6a],
      [q7a],
      [q8a],
      [q9a],
      [q10a],
      [q11a],
      [q12a],
      [q13a],
      [q14a],
      //[q15a],
      //[q16a],
      [q17a, q17b],
      [q18a, q18b]
    ];

    expectEqualitySets(
      queries,
      (q1, q2) => {
        return canonifyQuery(q1) === canonifyQuery(q2);
      },
      stringifyQuery
    );
  });

  it('canonical ids are stable', () => {
    // This test aims to ensure that we do not break canonical IDs, as they are
    // used as keys in the TargetCache.

    const baseQuery = query('collection');

    assertCanonicalId(baseQuery, 'collection|f:|ob:__name__asc');
    assertCanonicalId(
      query('collection', filter('a', '>', 'a')),
      'collection|f:a>a|ob:aasc,__name__asc'
    );
    assertCanonicalId(
      query('collection', filter('a', '<=', new GeoPoint(90.0, -90.0))),
      'collection|f:a<=geo(90,-90)|ob:aasc,__name__asc'
    );
    assertCanonicalId(
      query('collection', filter('a', '<=', new Timestamp(60, 3000))),
      'collection|f:a<=time(60,3000)|ob:aasc,__name__asc'
    );
    assertCanonicalId(
      query(
        'collection',
        filter('a', '>=', Bytes.fromUint8Array(new Uint8Array([1, 2, 3])))
      ),
      'collection|f:a>=AQID|ob:aasc,__name__asc'
    );
    assertCanonicalId(
      query('collection', filter('a', '==', [1, 2, 3])),
      'collection|f:a==[1,2,3]|ob:__name__asc'
    );
    assertCanonicalId(
      query('collection', filter('a', '!=', [1, 2, 3])),
      'collection|f:a!=[1,2,3]|ob:aasc,__name__asc'
    );
    assertCanonicalId(
      query('collection', filter('a', '==', NaN)),
      'collection|f:a==NaN|ob:__name__asc'
    );
    assertCanonicalId(
      query('collection', filter('__name__', '==', ref('collection/id'))),
      'collection|f:__name__==collection/id|ob:__name__asc'
    );
    assertCanonicalId(
      query(
        'collection',
        filter('a', '==', { 'a': 'b', 'inner': { 'd': 'c' } })
      ),
      'collection|f:a=={a:b,inner:{d:c}}|ob:__name__asc'
    );
    assertCanonicalId(
      query('collection', filter('a', 'in', [1, 2, 3])),
      'collection|f:ain[1,2,3]|ob:__name__asc'
    );
    assertCanonicalId(
      query('collection', filter('a', 'not-in', [1, 2, 3])),
      'collection|f:anot-in[1,2,3]|ob:aasc,__name__asc'
    );
    assertCanonicalId(
      query('collection', filter('a', 'array-contains-any', [1, 2, 3])),
      'collection|f:aarray-contains-any[1,2,3]|ob:__name__asc'
    );
    assertCanonicalId(
      query('collection', filter('a', 'array-contains', 'a')),
      'collection|f:aarray-containsa|ob:__name__asc'
    );
    assertCanonicalId(
      query('collection', orderBy('a')),
      'collection|f:|ob:aasc,__name__asc'
    );
    assertCanonicalId(
      queryWithStartAt(
        query('collection', orderBy('a', 'asc'), orderBy('b', 'asc')),
        bound(['foo', [1, 2, 3]], true)
      ),
      'collection|f:|ob:aasc,basc,__name__asc|lb:b:foo,[1,2,3]'
    );
    assertCanonicalId(
      queryWithEndAt(
        query('collection', orderBy('a', 'desc'), orderBy('b', 'desc')),
        bound(['foo', [1, 2, 3]], true)
      ),
      'collection|f:|ob:adesc,bdesc,__name__desc|ub:a:foo,[1,2,3]'
    );
    assertCanonicalId(
      queryWithLimit(query('collection'), 5, LimitType.First),
      'collection|f:|ob:__name__asc|l:5'
    );
    assertCanonicalId(
      queryWithLimit(query('collection'), 5, LimitType.Last),
      'collection|f:|ob:__name__desc|l:5'
    );
  });

  it("generates the correct implicit order by's", () => {
    const baseQuery = query('foo');
    // Default is ascending
    assertImplicitOrderBy(baseQuery, orderBy(DOCUMENT_KEY_NAME));
    // Explicit key ordering is respected
    assertImplicitOrderBy(
      query('foo', orderBy(DOCUMENT_KEY_NAME)),
      orderBy(DOCUMENT_KEY_NAME)
    );
    assertImplicitOrderBy(
      query('foo', orderBy(DOCUMENT_KEY_NAME, 'desc')),
      orderBy(DOCUMENT_KEY_NAME, 'desc')
    );
    assertImplicitOrderBy(
      query('foo', orderBy('foo'), orderBy(DOCUMENT_KEY_NAME)),
      orderBy('foo'),
      orderBy(DOCUMENT_KEY_NAME, 'asc')
    );
    assertImplicitOrderBy(
      query('foo', orderBy('foo'), orderBy(DOCUMENT_KEY_NAME, 'desc')),
      orderBy('foo'),
      orderBy(DOCUMENT_KEY_NAME, 'desc')
    );

    // Inequality filters add order by's
    assertImplicitOrderBy(
      query('foo', filter('foo', '<', 5)),
      orderBy('foo'),
      orderBy(DOCUMENT_KEY_NAME)
    );

    // Descending order by applies to implicit key ordering
    assertImplicitOrderBy(
      query('foo', orderBy('foo', 'desc')),
      orderBy('foo', 'desc'),
      orderBy(DOCUMENT_KEY_NAME, 'desc')
    );
    assertImplicitOrderBy(
      query('foo', orderBy('foo', 'asc'), orderBy('bar', 'desc')),
      orderBy('foo', 'asc'),
      orderBy('bar', 'desc'),
      orderBy(DOCUMENT_KEY_NAME, 'desc')
    );
    assertImplicitOrderBy(
      query('foo', orderBy('foo', 'desc'), orderBy('bar', 'asc')),
      orderBy('foo', 'desc'),
      orderBy('bar', 'asc'),
      orderBy(DOCUMENT_KEY_NAME, 'asc')
    );
  });

  it("generates the correct implicit order by's for multiple inequality", () => {
    assertImplicitOrderBy(
      query(
        'foo',
        filter('a', '<', 5),
        filter('a', '>=', 5),
        filter('aa', '>', 5),
        filter('b', '>', 5),
        filter('A', '>', 5)
      ),
      orderBy('A'),
      orderBy('a'),
      orderBy('aa'),
      orderBy('b'),
      orderBy(DOCUMENT_KEY_NAME)
    );

    // numbers
    assertImplicitOrderBy(
      query(
        'foo',
        filter('a', '<', 5),
        filter('1', '>', 5),
        filter('19', '>', 5),
        filter('2', '>', 5)
      ),
      orderBy('1'),
      orderBy('19'),
      orderBy('2'),
      orderBy('a'),

      orderBy(DOCUMENT_KEY_NAME)
    );

    // nested fields
    assertImplicitOrderBy(
      query(
        'foo',
        filter('a', '<', 5),
        filter('aa', '>', 5),
        filter('a.a', '>', 5)
      ),
      orderBy('a'),
      orderBy('a.a'),
      orderBy('aa'),
      orderBy(DOCUMENT_KEY_NAME)
    );

    // special characters
    assertImplicitOrderBy(
      query(
        'foo',
        filter('a', '<', 5),
        filter('_a', '>', 5),
        filter('a.a', '>', 5)
      ),
      orderBy('_a'),
      orderBy('a'),
      orderBy('a.a'),
      orderBy(DOCUMENT_KEY_NAME)
    );

    // field name with dot
    assertImplicitOrderBy(
      query(
        'foo',
        filter('a', '<', 5),
        filter('a.z', '>', 5), // nested field
        filter('`a.a`', '>', 5) // field name with dot
      ),
      orderBy('a'),
      orderBy('a.z'),
      orderBy('`a.a`'),
      orderBy(DOCUMENT_KEY_NAME)
    );

    // composite filter
    assertImplicitOrderBy(
      query(
        'foo',
        filter('a', '<', 5),
        andFilter(
          orFilter(filter('b', '>=', 1), filter('c', '<=', 1)),
          orFilter(filter('d', '>', 1), filter('e', '==', 1))
        )
      ),
      orderBy('a'),
      orderBy('b'),
      orderBy('c'),
      orderBy('d'),
      orderBy(DOCUMENT_KEY_NAME)
    );

    // OrderBy
    assertImplicitOrderBy(
      query(
        'foo',
        filter('b', '<', 5),
        filter('a', '>', 5),
        filter('z', '>', 5),
        orderBy('z')
      ),
      orderBy('z'),
      orderBy('a'),
      orderBy('b'),
      orderBy(DOCUMENT_KEY_NAME)
    );

    // last explicit order by direction
    assertImplicitOrderBy(
      query(
        'foo',
        filter('b', '<', 5),
        filter('a', '>', 5),
        orderBy('z', 'desc')
      ),
      orderBy('z', 'desc'),
      orderBy('a', 'desc'),
      orderBy('b', 'desc'),
      orderBy(DOCUMENT_KEY_NAME, 'desc')
    );

    assertImplicitOrderBy(
      query(
        'foo',
        filter('b', '<', 5),
        filter('a', '>', 5),
        orderBy('z', 'desc'),
        orderBy('c')
      ),
      orderBy('z', 'desc'),
      orderBy('c'),
      orderBy('a'),
      orderBy('b'),
      orderBy(DOCUMENT_KEY_NAME)
    );
  });

  it('matchesAllDocuments() considers filters, orders and bounds', () => {
    const baseQuery = newQueryForPath(ResourcePath.fromString('collection'));
    expect(queryMatchesAllDocuments(baseQuery)).to.be.true;

    let query1 = query('collection', orderBy('__name__'));
    expect(queryMatchesAllDocuments(query1)).to.be.true;

    query1 = query('collection', orderBy('foo'));
    expect(queryMatchesAllDocuments(query1)).to.be.false;

    query1 = query('collection', filter('foo', '==', 'bar'));
    expect(queryMatchesAllDocuments(query1)).to.be.false;

    query1 = queryWithLimit(query('foo'), 1, LimitType.First);
    expect(queryMatchesAllDocuments(query1)).to.be.false;

    query1 = queryWithStartAt(baseQuery, bound([], true));
    expect(queryMatchesAllDocuments(query1)).to.be.false;

    query1 = queryWithEndAt(baseQuery, bound([], false));
    expect(queryMatchesAllDocuments(query1)).to.be.false;
  });

  it('matches composite queries', () => {
    const doc1 = doc('collection/1', 0, { a: 1, b: 0 });
    const doc2 = doc('collection/2', 0, { a: 2, b: 1 });
    const doc3 = doc('collection/3', 0, { a: 3, b: 2 });
    const doc4 = doc('collection/4', 0, { a: 1, b: 3 });
    const doc5 = doc('collection/5', 0, { a: 1, b: 1 });

    // Two equalities: a==1 || b==1.
    const query1 = query(
      'collection',
      orFilter(filter('a', '==', 1), filter('b', '==', 1))
    );
    assertQueryMatches(query1, [doc1, doc2, doc4, doc5], [doc3]);

    // with one inequality: a>2 || b==1.
    const query2 = query(
      'collection',
      orFilter(filter('a', '>', 2), filter('b', '==', 1))
    );
    assertQueryMatches(query2, [doc2, doc3, doc5], [doc1, doc4]);

    // (a==1 && b==0) || (a==3 && b==2)
    const query3 = query(
      'collection',
      orFilter(
        andFilter(filter('a', '==', 1), filter('b', '==', 0)),
        andFilter(filter('a', '==', 3), filter('b', '==', 2))
      )
    );
    assertQueryMatches(query3, [doc1, doc3], [doc2, doc4, doc5]);

    // a==1 && (b==0 || b==3).
    const query4 = query(
      'collection',
      andFilter(
        filter('a', '==', 1),
        orFilter(filter('b', '==', 0), filter('b', '==', 3))
      )
    );
    assertQueryMatches(query4, [doc1, doc4], [doc2, doc3, doc5]);

    // (a==2 || b==2) && (a==3 || b==3)
    const query5 = query(
      'collection',
      andFilter(
        orFilter(filter('a', '==', 2), filter('b', '==', 2)),
        orFilter(filter('a', '==', 3), filter('b', '==', 3))
      )
    );
    assertQueryMatches(query5, [doc3], [doc1, doc2, doc4, doc5]);
  });

  it('matches composite queries with multiple inequality', () => {
    const doc1 = doc('collection/1', 0, { a: 1, b: 0 });
    const doc2 = doc('collection/2', 0, { a: 2, b: 1 });
    const doc3 = doc('collection/3', 0, { a: 3, b: 2 });
    const doc4 = doc('collection/4', 0, { a: 1, b: 3 });
    const doc5 = doc('collection/5', 0, { a: 1, b: 1 });

    // a>1 || b!=1.
    const query1 = query(
      'collection',
      orFilter(filter('a', '>', 1), filter('b', '!=', 1))
    );
    assertQueryMatches(query1, [doc1, doc2, doc3, doc4], [doc5]);

    // (a>=1 && b==0) || (a==1 && b!=1)
    const query2 = query(
      'collection',
      orFilter(
        andFilter(filter('a', '>=', 1), filter('b', '==', 0)),
        andFilter(filter('a', '==', 1), filter('b', '!=', 1))
      )
    );
    assertQueryMatches(query2, [doc1, doc4], [doc2, doc3, doc5]);

    // a<=2 && (a!=1 || b<3).
    const query3 = query(
      'collection',
      andFilter(
        filter('a', '<=', 2),
        orFilter(filter('a', '!=', 1), filter('b', '<', 3))
      )
    );
    assertQueryMatches(query3, [doc1, doc2, doc5], [doc3, doc4]);
  });

  it('generates appropriate order-bys for aggregate and non-aggregate targets', () => {
    const col = newQueryForPath(ResourcePath.fromString('collection'));

    // Build two identical queries
    const query1 = queryWithAddedFilter(col, filter('foo', '>', 1));
    const query2 = queryWithAddedFilter(col, filter('foo', '>', 1));

    // Compute an aggregate and non-aggregate target from the queries
    const aggregateTarget = queryToAggregateTarget(query1);
    const target = queryToTarget(query2);

    expect(aggregateTarget.orderBy.length).to.equal(0);
    expect(target.orderBy.length).to.equal(2);
    expect(target.orderBy[0].dir).to.equal('asc');
    expect(target.orderBy[0].field.canonicalString()).to.equal('foo');
    expect(target.orderBy[1].dir).to.equal('asc');
    expect(target.orderBy[1].field.canonicalString()).to.equal('__name__');
  });

  it('generated order-bys are not affected by previously memoized targets', () => {
    const col = newQueryForPath(ResourcePath.fromString('collection'));

    // Build two identical queries
    const query1 = queryWithAddedFilter(col, filter('foo', '>', 1));
    const query2 = queryWithAddedFilter(col, filter('foo', '>', 1));

    // query1 - first to aggregate target, then to non-aggregate target
    const aggregateTarget1 = queryToAggregateTarget(query1);
    const target1 = queryToTarget(query1);

    // query2 - first to non-aggregate target, then to aggregate target
    const target2 = queryToTarget(query2);
    const aggregateTarget2 = queryToAggregateTarget(query2);

    expect(aggregateTarget1.orderBy.length).to.equal(0);

    expect(aggregateTarget2.orderBy.length).to.equal(0);

    expect(target1.orderBy.length).to.equal(2);
    expect(target1.orderBy[0].dir).to.equal('asc');
    expect(target1.orderBy[0].field.canonicalString()).to.equal('foo');
    expect(target1.orderBy[1].dir).to.equal('asc');
    expect(target1.orderBy[1].field.canonicalString()).to.equal('__name__');

    expect(target2.orderBy.length).to.equal(2);
    expect(target2.orderBy[0].dir).to.equal('asc');
    expect(target2.orderBy[0].field.canonicalString()).to.equal('foo');
    expect(target2.orderBy[1].dir).to.equal('asc');
    expect(target2.orderBy[1].field.canonicalString()).to.equal('__name__');
  });

  function assertQueryMatches(
    query: Query,
    matching: MutableDocument[],
    nonMatching: MutableDocument[]
  ): void {
    for (const doc of matching) {
      expect(queryMatches(query, doc)).to.be.true;
    }
    for (const doc of nonMatching) {
      expect(queryMatches(query, doc)).to.be.false;
    }
  }

  function assertImplicitOrderBy(query: Query, ...orderBys: OrderBy[]): void {
    expect(queryNormalizedOrderBy(query)).to.deep.equal(orderBys);
  }

  function assertCanonicalId(query: Query, expectedCanonicalId: string): void {
    expect(canonifyTarget(queryToTarget(query))).to.equal(expectedCanonicalId);
  }
});
