---
layout: post
title: "My Voice Controlled Smart Mirror: A Postmortem"
date: 2016-08-20
comments: true
---

I just built something I'm pretty happy with. It was a really fun project, and I want to share my process. To begin, here's a demo of what I built:

<iframe width="560" height="315" src="https://www.youtube.com/embed/NE_brdljjFA" frameborder="0" allowfullscreen></iframe>

(For any doubters out there, that was shot in one take. Amazon Echo is pretty awesome.)

First off, here's where I got the generall idea for this project. A few months ago, this awesome project showed up on Hacker News:

<iframe width="560" height="315" src="https://www.youtube.com/embed/oLpwJAphU7Y" frameborder="0" allowfullscreen></iframe>

Now I normally argue that execution is more important than ideas, but if I hadn't seen this there's no way I'd have come up with it on my own. I want to start by giving a huge thanks to [Adafruit](https://learn.adafruit.com/android-smart-home-mirror) and [Hannah Mitt](https://github.com/HannahMitt/HomeMirror) for inspiring this project.

My Kindle Fire has been lying dormant since I got an iPad about a year ago, and this seemed like a great way to turn it into a really neat IoT project. I also had an Amazon Echo, and thought it would be neat if I could use it to control what was displayed on the mirror using my voice.

This project combined some skills I was already really good at (building a web server with Express, turning a web page into a PhoneGap mobile app, making graphs with D3), some skills I had less experience with (WebSockets, the peculiarities of Amazon Fire OS, the Hacker News and Forecast.io APIs) and some things I'd never done (building an Alexa Skill, mounting a piece of technology on my wall). It was a fun and challenging project that took me about a month to finish (admittedly, some of that time I was working on other things).

The Alexa Skill
---------------

The Alexa Skills Kit is pretty easy to work with. Once you sign into the Amazon Developer portal (using your Amazon login, no need for additional signup) you can pretty easily create a "skill" and get going. Any Skill that you have in development is immediately available to the Amazon Echos that are tied to your account, which makes for rapid iteration. It also means that you can develop an Alexa Skill for your own personal use with no intent to put it into the Marketplace, and that's just fine.

There are a lot of confusing options when it comes to working with Alexa. I wasn't sure if I'd do better making a "Custom Skill" or a "Smart Home Skill". In the end I settled on making a Custom Skill. All of Amazon's tutorials for this try to get you to use Amazon Lambda as your back end, but I wanted to write my own back end to ensure I'd have maximum leeway to do what I wanted. This is totally possible: you can point your Alexa Skill at any HTTPS secured API endpoint, and it will gladly work with whatever is there. I still think this was the best possible choice (Custom Skill with a non-Lambda backend) given the weird things I wanted to do with my server (arbitrary API calls, WebSockets and possibly push notifications later).

To trigger changes on the mirror, I have to say something like "Alexa, ask XANA about the weather." or "Alexa, ask XANA for the Top Hacker News stories." The name XANA (I named the Alexa Skill XANA after [the evil A.I. character from Code Lyoko with the same name](https://www.youtube.com/watch?v=HoTq1DUk0M8)) tells Alexa which Skill I want to interact with and the key phrases "weather" and "Hacker News" trigger the `"WEATHER"` and `"HACKER NEWS"` intents.

The Server
----------

When Express is your hammer, everything looks like an Express project... or something like that. I've used Express to make tons of projects (even some where it behaves more like the background process of an Electron app). I fired up [Yeoman's Express Generator](https://github.com/petecoop/generator-express) and started building an app that would fetch data and pass it back to the Alexa Skill. Since Alexa can only hit HTTPS endpoints, I used [localtunnel.me](https://localtunnel.github.io/www/) to test against locally hosted versions of the server. Once I was reliably pulling weather data, I deployed my server to Heroku (which comes with HTTPS out of the box) and started using my Heroku instance as my server.

I pulled the weather data from [forecast.io](https://developer.forecast.io/) and the Hacker News data using the [Hacker News API](https://github.com/HackerNews/API). Since the HN API is RESTful to a fault, this involved chaining a lot of callbacks together in order to get the data I needed for the top 10 stories. I was definitely aided by [TonicDev's Node.js sandbox](https://tonicdev.com/npm/hackernews-api). Seriously, when you look at a module's page on npm and there's a link that says "Try out [XYZ] in the browser", give it a shot. I was able to iterate super quickly in that environment.

My biggest difficulty on the server side was with WebSockets, but I'll address that when talking about the app itself.

The Kindle Fire App
-------------------

I've had some truly great experiences with PhoneGap recently. At work, I was able to turn a complicated JS app into a mobile app in about 40 minutes and test it using the `phonegap serve` command and Adobe's PhoneGap app for iOS (this even had live reload out of the box!). I was looking forward to a similar experience on this project, but was a bit disappointed.

My Kindle Fire is running Fire OS 4.x.x, which I suspect (but cannot confirm) maps to Android 4.x.x. I'm pretty sure my hardware is just barely old enough to stop supporting updates to Android 5.x.x, which is unfortunate, because most of the new PhoneGap and Cordova tools (including Adobe's PhoneGap app) either won't support Fire OS, won't support non-Google versions of Android, or won't support versions of Android before 5.0.0.

I briefly considered rooting my Kindle Fire so that it could run stock Android, but decided it would be too much work. I had made a proof-of-concept Kindle Fire app about a year ago using Cordova, so I knew it was possible. In the end, I had to use an old version of the PhoneGap push notifications plugin and install the `amazon-fireos` platform using Cordova, not PhoneGap, but in the end it all worked out.

I've got to say though, developing a web-based app for Fire OS is rough. I couldn't get any sort of DevTools based debugging to work and Amazon Silk-based WebViews have issues supporting Google Fonts. A lot of the benefits I usually associate with web-based development just weren't there. But enough whining, let's talk about what did work!

All the actions in this app had to be triggered by the Heroku server when it received an HTTP request from Amazon Echo. To make this work, I had my app contact the server and set up a WebSocket. Whenever Alexa sent a request to the server, it would fetch the appropriate data, write a readable summary to send back to Alexa, and message my app over WebSockets with the raw data it had retrieved. This way, I could reuse the data from the API calls and make it all available to my app.

Once the app received the data from the WebSocket, it would render a view using jQuery and D3 (this project didn't feel heavyweight enough for Angular or React). The D3 graph of the "Chance of Precipitation" was a lot of fun. It was a simple D3 line graph with a time series along the X axis, but [getting the line to animate](http://stackoverflow.com/a/13893296) was a simple but really satisfying touch. As were the jQuery `fadeIn`s and `fadeOut`s. There really is so much awesome stuff you can do with just a little jQuery!

The Build
---------

This was my first IoT project, and my first programming project in years that also involved "building" something physical.

I purchased the piece of two-way mirror plastic from [Tap Plastics](http://www.tapplastics.com/product/plastics/cut_to_size_plastic/two_way_mirrored_acrylic/558), and it arrived in about 3 days. My sheet was 11"x17" (equal to a "tabloid size" printout). In choosing a size, bear in mind that you don't want something too big: two-way mirror plastic can get expensive, and a giant mirror with a tiny display in the corner might look a bit weird.

I mostly followed Adafruit's directions for covering the back of the mirror with construction paper and then using industrial velcro to stick it to the wall. I originally tried sticking the device to the plastic with double sided tape, but found this made it difficult to plug the device in to charge. In the end, I simply velcroed the device and the mirror to the wall separately and lined them up just right. This also makes it easier to service the tablet if the app crashes or the device somehow turns off.

Keeping it all Running
----------------------

At the beginning of August, I'd thought that I'd finished this project. I'd built the server and the app, mounted the mirror, and showed it off to a bunch of friends at a house party. But this project was not meant to be a simple parlor trick, I wanted it to be something I'd really use every day, and making that leap proved slightly difficult.

There were a number of problems with keeping the app running for more than a couple hours:

- My house's WiFi is a bit far from my room, which meant that my tablet would occasionally get disconnected from the internet, which would play havoc with the WebSocket connection.
- I have a feeling Heroku might have difficulty handling long-term WebSocket connections. I'm not sure if its Heroku or another part of my stack that is to blame, But I'd often receive multiple socket connections on the client side or randomly drop connections.
- Sometimes the app would take several seconds to respond to requests if it had been running for a while.
- Occasionally the app would freeze (the clock would stop updating and fall minutes behind) and then eventually crash to the home screen.

Many of these problems would've been solvable if there was a good debugging story for working with Silk WebViews. Unfortunately, most of the remote debugging guides I found were either for Stock Android, newer versions of Fire OS, or just didn't work.

So, I took a duct tape and string approach to solving this problem. This is not my proudest engineering achievement, but the app has now had weeks of uptime and responds to Alexa's requests with acceptable latency every time:

- I used `window.onerror` and `alert()` to write out error messages or debug info to the screen (I took this out at the end, since `alert()`s stop JS execution and get in the way of my other tactics)
- I moved all client side styles, assets and JS code onto my server to be served up as static files. This gutted my app's code, but meant most of my code was now in one repository, and updates could be sent by just telling the app to refresh the page.
- I set the client side socket code to attempt a reconnect whenever disconnected (with a 1 second delay to prevent a DoS on myself)
- In the event of a script error, I'd reload the page after a 1 second delay.
- I set a "rolling timeout" that would reload the page every 15 minutes. The timeout would be reset after any user interaction, so charts or other data that I'd summoned would be guarunteed to be onscreen for 15 minutes.
- I added an Alexa action, sever route and socket message that would allow me to tell Alexa to tell the app to reload the page (this was useful for dispatching updates).

In short: when in doubt, refresh the page. This very effectively solved all of my problems.

Conclusion
----------

This was a fun and satisfying project to build, and is the kind of thing you can actually show off to non-technical people without their eyes glazing over. When you get something like this going, you really start to feel like you're actually living in the future. If you've got the tools available, I hope this inspires you to build something like this too! (If you don't, options like the [Amazon Echo Raspberry Pi projects](https://github.com/alexa/alexa-avs-raspberry-pi), [used/refurbished Kindle Fires](https://www.amazon.com/kindle-fire-hd-best-family-kids-tablet/dp/B00CU0NSCU/ref=dp_ob_title_def) or [Kindle Fire with Special Offers](https://www.amazon.com/dp/B00TSUGXKE/ref=fs_ods_fs_tab_fd) can help bring the price down.)

Code
----

If you're interested in building one of these yourself, I've uploaded my code to 2 git repos. The server repo (which also serves the client side code) could probably be re-used, but the app code (which is pretty much gutted to include only index.html) is kind of a mess. It worked for me, but if you have a device with a more up to date OS, you could probably make a much cleaner repository.

- [smart-mirror-server](https://github.com/chrisuehlinger/smart-mirror-server)
- [smart-mirror-app](https://github.com/chrisuehlinger/smart-mirror-app)
