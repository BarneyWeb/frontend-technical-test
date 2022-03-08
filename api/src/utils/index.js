const utils = {}

/**
 * Sort an array of object by one property of its objects.
 *
 * @param {Array} array
 * @param {String} key
 * @param {Boolean} reverse
 *
 * @returns {Array} Same reference as `array` to allow chaining.
 */
utils.sortByKey = (array, key, reverse = false) => {
	const order = reverse ? -1 : 1
	return array.sort(function (a, b) {
		var x = a[key]
		var y = b[key]
		return (x < y ? -1 : x > y ? 1 : 0) * order
	})
}

module.exports = utils
