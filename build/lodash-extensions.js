(function() {
  _.isEqualIgnoringFxn = function(item, other) {
    var item_keys;
    if (typeof item !== typeof other) {
      return false;
    } else if (_.isFunction(item)) {
      return true;
    } else if (_.isObject(item)) {
      item_keys = _.keys(item);
      if (item_keys.length !== _.keys(other).length) {
        return false;
      }
      return _.all(item_keys, function(key) {
        return _.isEqualIgnoringFxn(item[key], other[key]);
      });
    } else {
      return _.isEqual(item, other);
    }
  };

}).call(this);
