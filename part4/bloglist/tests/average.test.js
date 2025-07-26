const { test, describe } = require('node:test')
const assert = require('node:assert')

const averageTest = require('../utils/for_testing').average

describe('average', () => {
    test('of one value is the value itself', () => {
        assert.strictEqual(averageTest([1]), 1)
    })

    test('of many is calculated right', () => {
        assert.strictEqual(averageTest([1, 2, 3, 4, 5, 6]), 3.5)
    })

    test.skip('of empty array is zero', () => {
        assert.strictEqual(averageTest([]), 0)
    })
})