_.isEqualIgnoringFxn = (value, other) ->
  _.isEqual value, other, (item, other) ->
    if typeof item == typeof other
      if _.isFunction(item)
        return true

      if _.isObject(item)
        item_keys = _.keys(item)
        return false if item_keys.length != _.keys(other).length
        return _.all item_keys, (key) ->
          _.isEqualIgnoringFxn(item[key], other[key])
