var test = {
  a: [1, 2, 3],
  b: {
    bb: "ok"
  },
  c: [[1, 2], [3, 4]]
};
assert.equal(match(test, {
  c: [[1, 2], [$, 4]]
}, ({
  c: [[_, _2], [d, _3]]
}) => d, $, bbb => "foo"), 3);
assert.equal(match(test, {
  a: [1, $, $.rest]
}, ({
  a: [_4, it]
}) => it + 100, $, bbb => "foo"), 102);
