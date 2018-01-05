//import {diff} from '../src/index.js'
import * as diff from '../src/changeset.js'

test('diff.diff', () => {
  let left = {a: 1, b: 2, c: 3}
  let right = {a: 1, b: 9, d: 4}
  let changes = diff.diff(left, right)
  const expected = [
    {"key": ["b"], "type": "put", "value": 9},
    {"key": ["c"], "type": "del"},
    {"key": ["d"], "type": "post", "value": 4},
  ]
  expect(changes).toEqual(expected)
})

test('diff.annotateLeft', () => {
  let left = {a: 1, b: 2, c: 3}
  const changes = [
    {"key": ["b"], "type": "put", "value": 9},
    {"key": ["c"], "type": "del"},
    {"key": ["d"], "type": "post", "value": 4},
  ]
  const annotated = diff.annotateLeft(changes, left)
  const expected = {a: 1, "@b(class='update')": 2, "@c(class='delete')": 3}
  expect(annotated).toEqual(expected)
})

test('diff.annotateRight', () => {
  let right = {a: 1, b: 9, d: 4}
  const changes = [
    {"key": ["b"], "type": "put", "value": 9},
    {"key": ["c"], "type": "del"},
    {"key": ["d"], "type": "post", "value": 4},
  ]
  const annotated = diff.annotateRight(changes, right)
  const expected = {a: 1, "@b(class='update')": 9, "@d(class='add')": 4}
  expect(annotated).toEqual(expected)
})
