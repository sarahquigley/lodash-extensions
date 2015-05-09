describe 'Utilities', ->
  describe 'Lodash extensions', ->
    describe '.isEqualIgnoringFxn', ->
      it 'should return true for equal values of simple types', ->
        expect(_.isEqualIgnoringFxn(1, 1)).toBe(true)
        expect(_.isEqualIgnoringFxn('test', 'test')).toBe(true)

      it 'should return true for equal arrays of values of simple types', ->
        expect(_.isEqualIgnoringFxn([], [])).toBe(true)
        expect(_.isEqualIgnoringFxn([1, 'test'], [1, 'test'])).toBe(true)

      it 'should return true for equal objects with attributes of simple types', ->
        expect(_.isEqualIgnoringFxn({test: 'test', one: 1}, {test: 'test', one: 1})).toBe(true)

      it 'should return false for unequal values of simple types', ->
        expect(_.isEqualIgnoringFxn(1, 2)).toBe(false)
        expect(_.isEqualIgnoringFxn(1, '1')).toBe(false)
        expect(_.isEqualIgnoringFxn('test', 'test2')).toBe(false)

      it 'should return false for unequal arrays of values of simple types', ->
        expect(_.isEqualIgnoringFxn([1, 'test'], ['test', 1])).toBe(false)
        expect(_.isEqualIgnoringFxn([1, 'test'], [1, 'test1'])).toBe(false)
        expect(_.isEqualIgnoringFxn([1, 'test'], [1, 'test', 'test1'])).toBe(false)
        expect(_.isEqualIgnoringFxn([1, 'test', 'test1'], [1, 'test'])).toBe(false)

      it 'should return false for unequal objects with attributes of simple types', ->
        expect(_.isEqualIgnoringFxn({test: 'test1', one: '1'}, {test: 'test', one: 1})).toBe(false)
        expect(_.isEqualIgnoringFxn({test: 'test', one: 1, two: 2}, {test: 'test', one: 1})).toBe(false)
        expect(_.isEqualIgnoringFxn({test: 'test', one: 1}, {test: 'test', one: 1, two: 2})).toBe(false)

      it 'should ignore functions when checking the equality of objects', ->
        class Test
          constructor: (@x, @y) ->
          test: =>
        expect(_.isEqualIgnoringFxn(new Test(1, 1), new Test(1, 1))).toBe(true)
        expect(_.isEqualIgnoringFxn(new Test(1, 1), new Test(1, 2))).toBe(false)

      it 'should give correct value with nested objects and arrays', ->
        item = {test: {one: 1, two: 2}, test1: {one: [1, 1], two: [2, 2]}}
        other = {test: {one: 1, three: 3}, test1: {one: [1, 2], two: [2, 1]}}
        expect(_.isEqualIgnoringFxn(item, _.cloneDeep(item))).toBe(true)
        expect(_.isEqualIgnoringFxn(item, other)).toBe(false)

      xit 'should work with cyclic objects', ->
        item = {}
        other = {field: item}
        item.field = other
        expect(_.isEqualIgnoringFxn(item, other)).toBe(false)
