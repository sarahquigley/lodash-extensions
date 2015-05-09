
/*
Performs a deep comparison between two values to determine if they are equal.
Unlike Lodash's conventional `isEqual` method, functions are ignored when making
comparisons. This is particularly useful when comparing instances of classes that
use Coffeescript's fat arrow syntax for method definitions. For instances of these
classes, function definitions are attached directly to the object, rather than just
to its prototype. As a result, _.isEquals erroneously returns false, when it should
return true.

@param {*} value The value to compare
@param {*} other The other value to compare
@returns {boolean} Returns `true` if values are equivalent ignoring functions,
otherwise returns `false`
 */

(function() {
  _.isEqualIgnoringFxn = function(value, other) {
    return _.isEqual(value, other, function(item, other) {
      var item_keys;
      if (typeof item === typeof other) {
        if (_.isFunction(item)) {
          return true;
        }
        if (_.isObject(item)) {
          item_keys = _.keys(item);
          if (item_keys.length !== _.keys(other).length) {
            return false;
          }
          return _.all(item_keys, function(key) {
            return _.isEqualIgnoringFxn(item[key], other[key]);
          });
        }
      }
    });
  };

}).call(this);
