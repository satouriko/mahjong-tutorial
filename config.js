const config = {
	"gatsby": {
		"pathPrefix": "/",
		"siteUrl": "https://mahjong.innocent.love",
		"gaTrackingId": null,
		"trailingSlash": false
	},
	"header": {
		"logo": "https://img.itch.zone/aW1nLzE4NTM1NTQucG5n/32x32%23/90uG22.png",
		"logoLink": "https://mahjong.innocent.love",
		"title": "八重梨子",
		"githubUrl": "https://github.com/satouriko/mahjong-tutorial",
		"helpUrl": "",
		"tweetText": "",
		"links": [
			{ "text": "", "link": ""}
		],
		"search": {
			"enabled": false,
			"indexName": "",
			"algoliaAppId": process.env.GATSBY_ALGOLIA_APP_ID,
			"algoliaSearchKey": process.env.GATSBY_ALGOLIA_SEARCH_KEY,
			"algoliaAdminKey": process.env.ALGOLIA_ADMIN_KEY
		}
	},
	"sidebar": {
		"forcedNavOrder": [
			"/", // add trailing slash if enabled above
      "0",
      "1"
		],
		"links": [
		],
		"frontline": false,
		"ignoreIndex": false,
	},
	"siteMetadata": {
		"title": "梨子的麻雀生态研究笔记",
		"description": "Documentation built with mdx.",
		"ogImage": null,
		"docsLocation": "https://github.com/satouriko/mahjong-tutorial",
		"favicon": "https://img.itch.zone/aW1nLzE4NTM1NTQucG5n/32x32%23/90uG22.png"
	},
	"pwa": {
		"enabled": false, // disabling this will also remove the existing service worker.
		"manifest": {
			"name": "Gatsby Gitbook Starter",
			"short_name": "GitbookStarter",
			"start_url": "/",
			"background_color": "#6b37bf",
			"theme_color": "#6b37bf",
			"display": "standalone",
			"crossOrigin": "use-credentials",
			icons: [
				{
					src: "src/pwa-512.png",
					sizes: `512x512`,
					type: `image/png`,
				},
			],
		},
	}
};

module.exports = config;
