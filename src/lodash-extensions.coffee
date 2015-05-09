_.isEqualIgnoringFxn = (item, other) ->
  if typeof item != typeof other
    return false

  else if _.isFunction(item)
    return true

  else if _.isObject(item)
    item_keys = _.keys(item)
    return false if item_keys.length != _.keys(other).length
    return _.all item_keys, (key) ->
      _.isEqualIgnoringFxn(item[key], other[key])

  else
    return _.isEqual(item, other)
