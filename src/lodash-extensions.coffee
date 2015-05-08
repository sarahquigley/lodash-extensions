_.isEqualIgnoringFxn = (item, other) ->
  if typeof item != typeof other
    return false

  else if _.isFunction(item)
    return true

  else if _.isObject(item)
    return false if _.keys(item).length != _.keys(other).length
    equality = true
    _.each item, (value, key) ->
      if !_.isEqualIgnoringFxn(value, other[key])
        equality = false
    return equality

  else
    return _.isEqual(item, other)
