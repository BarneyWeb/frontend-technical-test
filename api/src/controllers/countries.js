const { sleep, sortByKey } = require("../utils")
const removeAccents = require("remove-accents")

// List of countries with searchable name
const COUNTRIES = require("../../data/countries.json")
COUNTRIES.forEach((c) => (c._searchable = removeAccents(c.name).toLowerCase()))

const countryController = {}

countryController.getCountries = async (req, res) => {
	await sleep(10, 300)

	// Options
	let limit = parseInt(req.query.limit) || 10
	limit = Math.min(Math.max(1, limit), 100)
	let offset = parseInt(req.query.offset) || 0
	offset = Math.max(0, offset)
	let search = (req.query.search || "").toLowerCase()
	let order = (req.query.order || "").toLowerCase()
	order = ["asc", "desc"].includes(order) ? order : "asc"

	// List
	let results = COUNTRIES

	// Filter: text search (basic lower case exact match)
	if (search) {
		results = results.filter((c) => c.name.toLowerCase().includes(search))
	}

	// Total (after filtering)
	const total = results.length

	// Sort
	sortByKey(results, "_searchable", order === "desc")

	// Pagination
	results = results.slice(offset, offset + limit)

	// Filter keys to return as result
	results = results.map((c) => ({ name: c.name, code: c.code }))

	// Response
	res.json({
		results,
		offset,
		limit,
		total,
		order,
	})
}

countryController.getCountryByCode = async (req, res) => {
	await sleep(10, 300)

	// query the data
	const countryCode = (req.params.countryCode || "").toUpperCase()
	const country = COUNTRIES.find((c) => c.code === countryCode)

	// if don't exist
	if (!country) {
		res.status(404).json({ error: "Country not found." })
		return
	}

	// response
	res.contentType("application/json").json({
		...country,
	})
}

module.exports = countryController
