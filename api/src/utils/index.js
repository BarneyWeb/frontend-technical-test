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
utils.sleep = async function (minDelay, randomMaxDelay = false) {
	return new Promise((resolve) => {
		if (randomMaxDelay !== false) {
			minDelay = Math.round(
				minDelay + (randomMaxDelay - minDelay) * Math.random(),
			)
		}
		setTimeout(resolve, minDelay)
	})
}

module.exports = utils
