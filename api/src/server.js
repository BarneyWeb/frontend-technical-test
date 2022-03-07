const express = require("express")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("../docs/swagger.json")
const countryController = require("./controllers/country")

/* -------------------------
	SETUP EXPRESS
------------------------- */

const app = express()
app.set("json spaces", 2)

/* -------------------------
	SWAGGER
------------------------- */

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

/* -------------------------
	MIDDLEWARE
------------------------- */

app.use((req, res, next) => {
	// CORS
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Methods", "GET")

	// Always respond as JSON
	res.contentType("application/json")

	// Log route info
	res.on("finish", () => {
		console.info(
			`\x1b[32m> %d %s %s\x1b[0m`,
			res.statusCode,
			req.method,
			req.originalUrl,
		)
	})

	next()
})

/* -------------------------
	ROUTES
------------------------- */

app.get("/", (req, res) => res.json({ message: "Welcome" }))

app.get("/country", (req, res, next) => {
	countryController.getCountries(req, res).catch((err) => next(err))
})

app.get("/country/:countryCode", (req, res, next) => {
	countryController.getCountryByCode(req, res).catch((err) => next(err))
})

/* -------------------------
	ROUTE FALLBACK
------------------------- */

app.use((req, res, next) => {
	res.status(404).json({ error: "Not found." })
})

/* -------------------------
	ERROR HANDLER
------------------------- */

app.use((err, req, res, next) => {
	console.info(`\x1b[31m%s\x1b[0m`, err)
	res.status(500).json({ error: "Server error." })
})

/* -------------------------
	START
------------------------- */

app.listen(1337, (error) => {
	if (error) console.error(error)
	else console.info("API started 👌")
})
