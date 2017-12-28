var _ = require('underscore');

export function diff(old, new_) {
  var changes = [];

  changes = changes.concat(compare([], old, new_));

  comparing = [];
  return changes;
}

function delCheck(op) {
  if (op.type === 'put' && op.value === undefined) {
    op.type = 'del';
    delete op.value;
  }
  return op;
}

var comparing = [];
function compare(path, old, new_) {
  var changes = [];
  if (old !== null && new_ !== null &&
      typeof old === 'object' &&
      !_.contains(comparing, old)) {

    comparing.push(old);
    var oldKeys = Object.keys(old);
    var newKeys = Object.keys(new_);

    var sameKeys = _.intersection(oldKeys, newKeys);
    sameKeys.forEach(function (k) {
      var childChanges = compare(path.concat(k), old[k], new_[k]);
      changes = changes.concat(childChanges);
    });

    var delKeys = _.difference(oldKeys, newKeys);
    delKeys.forEach(function (k) {
      changes.push({ type: 'del', key: path.concat(k) });
    });

    var newKeys_ = _.difference(newKeys, oldKeys);
    newKeys_.forEach(function (k) {
      changes.push(delCheck(
        { type: 'post', key: path.concat(k), value: new_[k] }));
    });

  } else if (old !== new_) {
    changes.push(delCheck({ type: 'put', key: path, value: new_ }));
  }

  return changes;
}

export function apply(changes, target, modify) {
  let obj = target;
  changes.forEach(function (ch) {
    var ptr, keys, len;
    switch (ch.type) {
      case 'put':
      case 'post':
        ptr = obj;
        keys = ch.key;
        len = keys.length;
        if (len) {
          keys.forEach(function (prop, i) {
            if (!(prop in ptr)) {
              ptr[prop] = {};
            }

            if (i < len - 1) {
              ptr = ptr[prop];
            } else {
              ptr[prop] = ch.value;
            }
          });
        } else {
          obj = ch.value;
        }
        break;

      case 'del':
        ptr = obj;
        keys = ch.key;
        len = keys.length;
        if (len) {
          keys.forEach(function (prop, i) {
            if (!(prop in ptr)) {
              ptr[prop] = {};
            }

            if (i < len - 1) {
              ptr = ptr[prop];
            } else {
              delete ptr[prop];
            }
          });
        } else {
          obj = null;
        }
        break;
    }
  });
  return obj;
}

export function annotateLeft(changes, target, modify = true) {
  let obj = target;
  changes.forEach(function (ch) {
    var ptr, keys, len;
    switch (ch.type) {
      case 'put':
        ptr = obj;
        keys = ch.key;
        len = keys.length;
        if (len) {
          keys.forEach(function (prop, i) {
            if (!(prop in ptr)) {
              ptr[prop] = {};
            }

            if (i < len - 1) {
              ptr = ptr[prop];
            } else {
              //ptr[prop] = ch.value;
              ptr['@' + prop + "(class='update')"] = ptr[prop]
              delete ptr[prop];
            }
          });
        } else {
          obj = ch.value;
        }
        break;

      case 'del':
        ptr = obj;
        keys = ch.key;
        len = keys.length;
        if (len) {
          keys.forEach(function (prop, i) {
            if (!(prop in ptr)) {
              ptr[prop] = {};
            }

            if (i < len - 1) {
              ptr = ptr[prop];
            } else {
              //console.log("DELETE" + prop)
              ptr['@' + prop + "(class='delete')"] = ptr[prop]
              delete ptr[prop];
            }
          });
        } else {
          obj = null;
        }
        break;
    }
  });
  return obj;
}

export function annotateRight(changes, target, modify = true) {
  let obj = target;
  changes.forEach(function (ch) {
    var ptr, keys, len;
    switch (ch.type) {
      case 'put':
      case 'post':
        ptr = obj;
        keys = ch.key;
        len = keys.length;
        if (len) {
          keys.forEach(function (prop, i) {
            if (!(prop in ptr)) {
              ptr[prop] = {};
            }

            if (i < len - 1) {
              ptr = ptr[prop];
            } else {
              //ptr[prop] = ch.value;
              if (ch.type === 'put') {
                ptr['@' + prop + "(class='update')"] = ptr[prop]
              } else {
                ptr['@' + prop + "(class='add')"] = ptr[prop]
              }
              delete ptr[prop];
            }
          });
        } else {
          obj = ch.value;
        }
        break;
    }
  });
  return obj;
}
