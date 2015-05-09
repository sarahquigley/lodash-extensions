###
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
###

_.isEqualIgnoringFxn = (value, other) ->
# With Lodash's `isEqual` method, if customizer callback returns undefined, comparisons 
# are handled by the method instead.
  _.isEqual value, other, (item, other) ->
    if typeof item == typeof other
      if _.isFunction(item)
        return true

      if _.isObject(item)
        item_keys = _.keys(item)
        return false if item_keys.length != _.keys(other).length
        return _.all item_keys, (key) ->
          _.isEqualIgnoringFxn(item[key], other[key])
