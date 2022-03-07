const utils = {}

/**
 * Returns a promise that will resolve after the `minDelay`. If
 * a `randomMaxDelay` is provided, the promise will resove in
 * a delay range between the two numbers.
 *
 * @param {Number} minDelay Delay in miliseconds.
 * @param {Number} randomMaxDelay? Delay in miliseconds.
 * @returns {Promise}
 */
utils.sleep = async (minDelay, randomMaxDelay = false) => {
	return new Promise((resolve) => {
		if (randomMaxDelay !== false) {
			minDelay = Math.round(
				minDelay + (randomMaxDelay - minDelay) * Math.random(),
			)
		}
		setTimeout(resolve, minDelay)
	})
}

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
