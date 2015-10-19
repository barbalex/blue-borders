# The DocPad Configuration File
# It is simply a CoffeeScript Object which is parsed by CSON

_ = require('lodash')

docpadConfig = {

	# =================================
	# Template Data
	# These are variables that will be accessible via our templates
	# To access one of these within our templates, refer to the FAQ: https://github.com/bevry/docpad/wiki/FAQ

	templateData:

		# Specify some site properties
		site:
			# The production url of our website
			url: "http://website.com"

			# Here are some old site urls that you would like to redirect from
			oldUrls: [
				'www.website.com',
				'website.herokuapp.com'
			]

			# The default title of our website
			title: "blue borders"

			# The website description (for SEO)
			description: """
				There are land or 'green' borders, and there are maritime or 'blue' borders. The focus of this website is on the latter - and on migration.
				"""

			# The website keywords (for SEO) separated by commas
			keywords: """
				migration, migrants, mediterranean, Italy, Malta, Tunisia, Libya
				"""

			# The website author's name
			author: "Jürg Martin Gabriel"

			# The website author's email
			email: "gabriel@ethz.ch"

			# Styles
			styles: [
				"/styles/twitter-bootstrap.css"
				"/styles/style.css"
			]

			# Scripts
			scripts: [
				"//cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min.js"
				"//cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js"
				"/vendor/twitter-bootstrap/dist/js/bootstrap.min.js"
				"/scripts/script.js"
			]



		# -----------------------------
		# Helper Functions

		# Get the prepared site/document title
		# Often we would like to specify particular formatting to our page's title
		# we can apply that formatting here
		getPreparedTitle: ->
			# if we have a document title, then we should use that and suffix the site's title onto it
			if @document.title
				"#{@document.title} | #{@site.title}"
			# if our document does not have it's own title, then we should just use the site's title
			else
				@site.title

		# Get the prepared site/document description
		getPreparedDescription: ->
			# if we have a document description, then we should use that, otherwise use the site's description
			@document.description or @site.description

		# Get the prepared site/document keywords
		getPreparedKeywords: ->
			# Merge the document keywords with the site keywords
			@site.keywords.concat(@document.keywords or []).join(', ')

		getSumOfArrivalsFromEvents: ->
			events = @getCollection('events').toJSON()
			sum = 0
			events.forEach((event) ->
				arrivals = 0
				if event.arrivals
					arrivals = parseInt(event.arrivals, 10)
				sum = sum + arrivals
			)
			return sum

		getSumOfVictimsFromEvents: ->
			events = @getCollection('events').toJSON()
			sum = 0
			events.forEach((event) ->
				victims = 0
				if event.victims
					victims = parseInt(event.victims, 10)
				sum = sum + victims
			)
			return sum

		getNumberOfEvents: ->
			events = @getCollection('events').toJSON()
			return events.length

		getTagsOfEvents: ->
			events = @getCollection('events').toJSON()
			tags = []
			events.forEach((event) ->
				if event.tags
					tags = _.union(tags, event.tags)
			)
			return tags


	# =================================
	# Collections
	# These are special collections that our website makes available to us

	collections:
		# used to build the menu left of publications
		pages: (database) ->
			database.findAllLive({pageOrder: $exists: true}, [pageOrder:1,title:1])

		# used to build the menu for publications
		publicationPages: (database) ->
			database.findAllLive({publicationPageOrder: $exists: true}, [publicationPageOrder:1,title:1])

		# used to build the menu right of publications
		pagesAfterPublications: (database) ->
			database.findAllLive({pagesAfterPublicationsOrder: $exists: true}, [pagesAfterPublicationsOrder:1,title:1])

		events: (database) ->
			database.findAllLive({articleType:$eq:'event'}, [name:-1])

		commentaries: (database) ->
			database.findAllLive({articleType:$eq:'commentary'}, [datum:-1])


	# =================================
	# Plugins

	plugins:
		downloader:
			downloads: [
				{
					name: 'Bootstrap'
					path: 'src/files/vendor/twitter-bootstrap'
					url: 'https://codeload.github.com/twbs/bootstrap/tar.gz/master'
					tarExtractClean: true
				}
			]


	# =================================
	# DocPad Events

	# Here we can define handlers for events that DocPad fires
	# You can find a full listing of events on the DocPad Wiki
	events:

		# Server Extend
		# Used to add our own custom routes to the server before the docpad routes are added
		serverExtend: (opts) ->
			# Extract the server from the options
			{server} = opts
			docpad = @docpad

			# As we are now running in an event,
			# ensure we are using the latest copy of the docpad configuraiton
			# and fetch our urls from it
			latestConfig = docpad.getConfig()
			oldUrls = latestConfig.templateData.site.oldUrls or []
			newUrl = latestConfig.templateData.site.url

			# Redirect any requests accessing one of our sites oldUrls to the new site url
			server.use (req,res,next) ->
				if req.headers.host in oldUrls
					res.redirect(newUrl+req.url, 301)
				else
					next()
}


# Export our DocPad Configuration
module.exports = docpadConfig
