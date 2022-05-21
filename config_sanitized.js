
var config = {
	address: "localhost", 	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/", 	// The URL path where MagicMirror is hosted. If you are using a Reverse proxy
					// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], 	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true
    customCss: "config.css",
	language: "en",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "imperial",
	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left",
            displaySeconds: false,
            clockBold: true,
            
		},
		{
			module: "calendar",
            disabled: true,
			header: "US Holidays",
			position: "top_left",
			config: {
				calendars: [
					{
						symbol: "calendar-check",
						url: "https://calendar.google.com/calendar/ical/your_calendar_here.ics"}
				],
                maximumEntries: 4
			}
		},
        {
        	module: "MMM-Traffic",
        	position: "top_left",
        	config: {
        		accessToken: "your_token_here",
        		originCoords: "-81.689962,30.223477",
        		destinationCoords: "-81.395029,30.323883",
                firstLine: "{duration} mins",
                secondLine: "Home to Work"
            }
        },
		{
			module: "currentweather",
			position: "top_right",
			config: {
				location: "Jacksonville, Florida",
				locationID: "4160021", 
				appid: "your_app_id",
                roundTemp: true,
                showHumidity: true,
                showSun: true,
                showWindDirection: true,
                degreeLabel: true
			}
		},
        {
            module: "MMM-WindyV2",
            disabled: true,
            position: 'fullscreen_above',          // this must be set to 'fullscreen_above'
            config: {
                apiKey: 'your_api_key',		 // insert your free or paid API key here
                	initLoadDelay: 50,               // optional, default is 50 milliseconds
                  	latitude: 30.373,         // example: 69.123
                    longitude: -87.344,       // example: 17.123
                    zoomLevel: 6,                    // set your preferred zoom level
                    showLayer: 'rain',		 // wind, rain, clouds, temp, pressure, currents, waves
                rotateLayers: false,		 // set to true to rotate layers
                layersToRotate: ['wind','rain','clouds','temp','pressure'], // layers to rotate
                delayRotate: 10000,		 // delay between rotated layers, in milliseconds
                wMinZoom: 3,			 // set minimum zoom level for WindyV2
                wMaxZoom: 17,			 // set maximum zoom level for WindyV2
                windyMetric: 'm/s',		 // 'kt', 'bft', 'm/s', 'km/h' and 'mph'
                updateTimer: 60 * 60 * 1000 * 6, // update per 6 hours
                retainZoom: true		 // retain zoomlevel between changing overlays
            }
        },
        {
            module: "MMM-quote-of-the-day",
            position: "upper_third",
            config: {
                language: "en",
                updateInterval: "1d"
        	}
        },
		{
			module: "newsfeed",
			position: "upper_third",
			config: {
				feeds: [
					{
						title: "New York Times",
						url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					},
                    {
    					title: "BBC",
    					url: "http://feeds.bbci.co.uk/news/video_and_audio/news_front_page/rss.xml?edition=uk",
				    }
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true,
                maxNewsItems: 10,
                ignoreOldItems: true
			}
		},
        {
            module: "MMM-MonthlyCalendar",
            disabled: true,
            position: "middle_center",
            config: { 
              mode: "currentMonth",
              firstDayOfWeek: "Sunday"
            }
        },
		{
			module: "weatherforecast",
            disabled: false,
			position: "top_right",
			header: "Weather Forecast",
			config: {
				location: "Jacksonville, Florida",
				locationID: "4160021", 
				appid: "your_appid_here",
                roundTemp: true,
                degreeLabel: true,
                showWindDirection: true,
                showHumidity: true,
                makNumberOfDays: 7,
                showRainAmount: true,
                fade: true,
                tableClass: "medium",
                scale: true
			}
		},
        {
        module: 'MMM-RAIN-RADAR',
        position: 'bottom_right',
        config: {
            useHeader: false, // true if you want a header
            lat: "30.0", // Latitude
            lon: "-82.0", // Longitude
            area: 'FL', // US State
            zoomLevel: 6,
            mapType: 2, //0-Road Map 1-Satellite 2-Dark Map 3-OpenStreetMaps 4-Light Map
            color: 3, //0-Original 1-Universal Blue 2-TITAN 3-The Weather Channel 5-NEXRAD Level-III 6-RAINBOW @ SELEX-SI
            snow: 1,
            smoothing: 1,
            opacity: 88,
            fastAnimation: 0,
            coverage: 0,
            darkTheme: 1,
            UTCtime: 0,
            legend: 0,
            legendMin: 0, //set legend to 1 if you want legendMin to show
            animate: 1,
            updateOnWarning: 0, // 1: after updateInterval, weather warnings for your US states will be used to determine if module should be hidden. 0 module is perpertually displayed
            updateInterval: 5 * 60 * 1000, // number of milliseconds. 
        }
        },
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
