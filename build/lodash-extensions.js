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
