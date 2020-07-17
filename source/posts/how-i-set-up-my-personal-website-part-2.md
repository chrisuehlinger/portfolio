---
layout: post
title: "How I set up my personal website, Part 2"
date: 2014-12-22
comments: true
categories: 
---

This is a continuation of my post on getting your personal space on the web set up. 

- [Part 1: Setting up a Github Project Page](/blog/2014/12/22/how-i-set-up-my-personal-website/)
- Part 2: Setting up an Octopress site for you blog and portfolio

So at this point, you should be able to visit `{yourname}.github.io/HelloWeb` or `{yourname}.github.io/2048` and see the pages you made. But what if you visit plain old `{yourname}.github.io`? You get a 404 error. We need to get you set up with a `github.io` repository and a Jekyll static site.

This is going to get a bit more in depth, but stick around and you'll have a really solid personal portfolio.

## A refresher on Github Pages

So, Github Pages lets you upload static pages that get served up from your `github.io` subdomain. One thing I didn't cover, is that if you make a repository called `{yourname}.github.io` and push it to Github, they will magically take whatever is in there and serve it up at your site.

If you have a file in this repository called `index.html` that file now be displayed if you go to `{yourname}.github.io` (it has to be in the `master` branch, which is the default one, NOT the `gh-pages` branch). If you have a file called `about.html`, it will be visible at `{yourname}.github.io/about.html`. If you have folder called `contact` that contains a file called `index.html`, it will be visible at `{yourname}.github.io/contact/`.

But we can do a bit better than just plain old HTML, and that's where Jekyll comes in.

## Let's talk about Jekyll

Static pages sound cool, until you start to miss a lot of the cool things you get with dynamic websites:

- What if you want the same header on every page?
- What if you want to tag and categorize your blog posts, or have their URLs be in /year/month/day format?
- What if you want the ability to swap out themes?
- What if you want to write your posts in easy to read/write Markdown, instead of verbose, annoying HTML?

Fortunately, there's Jekyll, a static site generator that gives you a lot of this stuff. You can read about it [here](http://jekyllrb.com/).

I was really confused when I first heard of Jekyll, so here's a quick rundown of how it works:

1. You download some ruby tools
2. You make a directory full of templates
3. You make some pages (using either html or markdown)
4. Jekyll "compiles" everything together, slotting all your pages into the templates (so they all have the same header, or whatever) and arranging the posts in your `_posts` directory so that their URLs will correspond to the dates when they were posted.
5. It puts this compiled site into the `_site` directory

Even better, when you do a git push, Github will handle steps 4-5 on their own and will serve up the `_site` directory automatically.

But before you go racing after Jekyll, I want to stop you (for better or worse) from making the same mistake I did.

## Octopress

So as you start learning about a lot of cool web technologies, your Jekyll configuration will get more and more complicated.

Let's say you want to use [Sass](http://sass-lang.com/) instead of plain old CSS, or you want to use [Haml](http://haml.info/) instead of HTML? What if you have a [Grunt](http://gruntjs.com/) workflow that does all kinds of crazy stuff to your javascript every time you save?

Well, Jekyll has tons of plugins to accomodate for a lot of this stuff, but unfortunatel Github will only run [a few certain plugins](https://help.github.com/articles/using-jekyll-plugins-with-github-pages/) with their automatic Jekyll thing. They've gotten better about supporting Sass and Coffeescript, but there's no guaruntee they'll ever have all the things you need.

But wait... what if you wrote your site in one branch, compiled it with Jekyll using all the plugins you want, switched back to the master branch and selectively copied over the `_site` directory to the `master` root directory then pushed to Github?

If you were as confused and revolted by that last sentence as I was, you'll be glad that the Octopress guys have figured this all out for us. The truth is, if you stick with Jekyll and don't use Octopress, you'll end up making it yourself (and if you're like me, it won't be nearly as well thought out).

Alright, we've covered a lot of ground without coding anything. That bugs me. Let's get to work.

## Setting up your environment

You may have done some of this stuff before, this is just to make sure you're on track.

So I'm working on a Retina MacBook Pro; these instructions will be tailored to Mac OS X users.

First, get `homebrew` up and running. `homebrew` is basically the package manager that contains all the other package managers. It allows you to keep all your programming related stuff organized and up to date. Getting it set up is a bit of a task, [so I'll let the homebrew guys themselves explain it](http://brew.sh/).

Once you have `homebrew`, use it to grab a bunch of important things:

```bash
brew install git
brew install ruby
brew install rbenv
brew install node
```

`git` is a version control system that helps you organize your code. 

Ruby is a programming language that has a bunch of useful tools we're going to use. We won't actually be writing any Ruby code today. Ruby comes with `gem`, a package manager for stuff that's made using ruby. `rbenv` is a tool that let's you keep track of which version of Ruby you want to use in which folder (this may seem overkill, but we need `rbenv` in order to install Octopress).

Node.js is a framework for making things with javascript. The Node package manager is called `npm`, and has lots of good javascript related stuff.

Now that you have `ruby` and `gem`, let's grab a bunch of other things we'll need:

```bash
gem install bundler
gem install jekyll
```

Bundler is a special ruby package installer (I'm not sure why ruby needs a package manager AND an installer... there's a joke about ruby packages and lightbulbs in here somewhere) and Jekyll is needed so you can compile Jekyll sites locally on your computer.

## Setting up your github.io project

So I'd reccomend starting with the Octopress documentation, this is a little complicated.

- [Getting Started](http://octopress.org/docs/setup/) will show you how to download octopress
- [Deploying Octopress](http://octopress.org/docs/deploying/github/) is about hooking up Octopress to your `github.io` repository. They also cover setting up a custom domain (like chrisuehlinger.com).
- [Configuring your blog](http://octopress.org/docs/configuring/) describes different ways you can configure your blog. You should get around to this at some point.
- [Blogging Basics](http://octopress.org/docs/blogging/) covers how to create new posts or new stand-alone pages. For reference, what you're reading right now is a "post". If you click the "About" link in my header, it will take you to a "page".

Once you're all set up, check out some of the [Octopress themes](https://github.com/imathis/octopress/wiki/3rd-Party-Octopress-Themes) available. In my opinion, too many people stick with the default theme. Right now I'm using a modified version of the [mnmlpress theme](https://github.com/tcnksm/mnmlpress), although that may change by the time you read this.

## Prepare for being famous

Chances are good you won't become famous. Sorry.

However, once you share something on the web, you never know when someone might randomly see it, post it on social media site, and drive thousands of people to your site over the course of a day or so. If you haven't done your preparation, you won't even know that this happened. If you've properly prepared, this opportunity could net you a new job, a bajillion twitter followers or even just a bunch of people saying "Thanks".

You want people to be able to easily contact you if they like your stuff. Easily is an understatement. The very INSTANT their brain chemicals form into "like" configuration, they should be able to contact you with 0 effort. You don't need a floating "social media iceberg" on the side of your page, but you should definitely have:

- A "Contact" page that can be accessed from your header, with your email, Twitter handle and Github account
- A "You can follow me on Twitter" link at the bottom of every post. (Even if you aren't hugely into Twitter, a lot of people will be sharing your stuff through it, so I'd advise you to get one)
- Disqus comments enabled so people can give feedback.

Set up [Disqus](https://disqus.com/) and put your Disqus ID in your `_config.yml` file. Octopress will add Disqus comments to the bottom of your posts. It's super easy, and often the  most direct way you can receive feedback.

Since you'll no doubt have tons of projects accessible on your site, organizing them into a "portfolio" page and linking to that page in your header is also SO WISE.

Octopress comes with Google Analytics bundled in. You should set up a [Google Analytics](http://www.google.com/analytics/) account, and put your Google Analytics ID in your `_config.yml` file. You should also make sure you include the Google Analytics "magic javascript snippet" in EVERY HTML file in every project you post.

Do all this stuff NOW. Making stuff people like is hard enough, turning those likes into meningful connections doesn't have to be.

## Happy Trails!

Hopefully you now have a personal space on the web where you can post anything. You still have to make cool things, there's no getting around that. But now:

- Random things you make on a lazy afternoon can instantly become part of your portfolio
- Simply by existing, this page is "passively promoting" you on the internet. Anyone who googles your name will hopefully end up here.

If you're feeling uninspired, here are a bunch of the outlandish things you can do with just HTML, CSS and Javascript:

- The [Web Audio API](http://www.html5rocks.com/en/tutorials/webaudio/intro/) lets you make [synthesizers](http://webaudiodemos.appspot.com/midi-synth/index.html), [vocoders](https://webaudiodemos.appspot.com/Vocoder/index.html) and [DJ equipment](http://webaudiodemos.appspot.com/wubwubwub/index.html) using JS
- [WebRTC](http://www.html5rocks.com/en/tutorials/webrtc/basics/) is an amazing piece of technology that lets you make a video or audio chat client in the browser using just javascript
- [Mike Bostock](http://bl.ocks.org/mbostock) has tons of crazy visualizations he made using his [D3.js](http://d3js.org/) library. All of these are on Github for you to play with.
- [Hakim El Hattab](http://hakim.se/) always has tons of cool stuff to check out, a lot of it using CSS 3D transforms and WebGL.

I hope these articles have helped, good luck!
