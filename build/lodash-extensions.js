(function() {
  _.isEqualIgnoringFxn = function(item, other) {
    var equality;
    if (typeof item !== typeof other) {
      return false;
    } else if (_.isFunction(item)) {
      return true;
    } else if (_.isObject(item)) {
      if (_.keys(item).length !== _.keys(other).length) {
        return false;
      }
      equality = true;
      _.each(item, function(value, key) {
        if (!_.isEqualIgnoringFxn(value, other[key])) {
          return equality = false;
        }
      });
      return equality;
    } else {
      return _.isEqual(item, other);
    }
  };

}).call(this);
