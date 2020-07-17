---
layout: post
title: "How I set up my personal website, Part 1"
date: 2014-12-22
comments: true
---

This is part 1 in a series on setting up your personal space on the web:

- Part 1: Setting up a Github Project Page
- [Part 2: Setting up an Octopress site for you blog and portfolio](/blog/2014/12/22/how-i-set-up-my-personal-website-part-2/)

Setting up a personal space on the web is easily one of the best things I've done this year. If you're new to Web Design/Development and you want to know what the single best thing you can do is, I'm going to lay it all out for you right here.

So before we get started, a few disclaimers: 

1. These are my suggestions. There's a lot of flexibility here. You can use different tools, different hosting, whatever. 
2. Some of this stuff may seem complicated or excessive. I'll try and cover the "why" of each step in an aside, in case you're curious. However, some of these tools have entire books dedicated to them, so I'll try and redirect you to a better source if you're still puzzled.
3. I'm assuming some familiarity with these tools (especially Git). If something seems crazy, I'll link to more documentation, but I'm going to be moving at a bit of a brisk pace.
4. None of these steps matter, as long as in the end you achieve the following:

**You need to have a place on the web that you can call your own.** Ideally, it should be:

- A place where, if an idea strikes you, you can **immediately** build it and share it.
- A place where, if someone wants to see real examples of your work, all your weekend projects and little experiments are on display.
- Hosted in such a way that it won't keel over if you get a couple thousand hits from Hacker News.

I posit that the best way to do this is to get an octopress blog on github pages on a personal domain, and then develop all your projects with a `gh-pages` branch so you can share them easily. After about a year of having this easy publishing at your disposal, you'll suddenly realize that you now have an easily shareable online portfolio. Awesome.

If you want to see the code for my personal website (which should include the file with this blog post) I've uploaded it [here](https://github.com/chrisuehlinger/chrisuehlinger.github.io). This is the kind of thing you're going to end up with at the end of all this.

## Getting your environment set up

For this first part, all you need is a terminal (I use the Mac OS X Terminal that comes with any Mac), and an install of git (which comes with every Mac).

You should also have your text editor of choice. Any text editor will do, although I highly reccomend [Sublime Text](http://www.sublimetext.com/) and/or [Brackets](http://brackets.io/).

## Let's talk about Github pages

So [Github](https://github.com/) is a great website that lets you upload your code to share with others. There are tons of great codebases on there, and you could spend days just poring over the code in some of the really great projects. However, what we're really interested in here is [Github Pages](https://pages.github.com/).

Basically, Github will host your site for free. Yes. Free. The catch is that your site has to be static. It has to be a folder full of html, css, javascript and image files that the server can throw at someone if they ask for them by name. No database, no backend logic, just a folder full of files.

There are huge advantages to having a site like this. Even if you don't use Github Pages, you can easily find cheap hosting for a static site. There's also the fact that static sites are really cheap and easy to serve, so your site can stand up to monstrous amounts of traffic. As of today, I've never heard of anyone's Github Pages site going down due to too many requests, and Github never comes after your credit card.



And it gets better. With Github Pages you can easily make a page for any of your projects. If one of your Github repositories has a branch called `gh-pages`, and that branch has an `index.html` file, you can easily get to it at `{yourname}.github.io/{repository-name}`. These project pages are the best part of this whole thing, so let's get that squared away right now.

## Let's publish a project

To start out, go to [Github](https://github.com) and make a new respository. Call it `HelloWeb`, decide whether you want a README file and a `.gitignore` file (you can start with one or make one later, it doesn't really matter) ...alright good. Now go into your Terminal, find a nice cozy part of your hard drive (I recommend making a `~/Development` directory to keep all your dev stuff in) and type the following command:

```bash
git clone https://github.com/{yourname}/HelloWeb
```

This will download the git repository and store it in a directory named `HelloWeb`. USe the command `cd HelloWeb` to go inside the repository. Now, you'll start off on the `master` branch, so you'll need to make a `gh-pages` branch where you'll be doing your coding.

```bash
git branch gh-pages
git checkout gh-pages
```

So far so good, now fire up your text editor and make a file in `~/Development/HelloWeb` called `index.html`. You can keep it simple:

```html
<h1>Hello!</h1>
<script>
    alert('Hello Hello!');
</script>
```

Save that, head back to the Terminal, and add this file to your repository:

```bash
git add index.html
```

Now make a commit to "save" what you've done:

```bash
git commit -am "Added index.html"
```

Now push the `gh-pages` branch up to GitHub (they take care of setting up a lot of the remote stuff)

```bash
git push origin gh-pages
```

Now go to `{yourname}.github.io/HelloWeb`. There's your page! (It may take a minute or so the first time)

The hard part is done. You have an HTML file on your computer. You can put any HTML, CSS or Javascript in there, and it will show up, as you wrote it, to anyone, on any computer, anywhere in the world (if they visit your website).

Feel that? That's what power feels like.

Now let's try something else. Let's take someone else's project, make some changes to it, and upload it to our site.

## Make your own 2048

Let's say you really like the game [2048](http://gabrielecirulli.github.io/2048/), and you want to make a spinoff that works a little differently. A lot of my projects start off like this-- I'll see something cool, imagine a different way it could work, make some changes, and then share it (giving credit to the person who had the idea of course).

You may have noticed, 2048 is on a `github.io` domain. The guy who made it pushed it to the `gh-pages` branch of a repo named "2048". This will be pretty easy. First, go to [https://github.com/gabrielecirulli/2048](https://github.com/gabrielecirulli/2048) and click the button in the upper right part of the screen labeled "Fork".

Once you've forked the repo (that is, you've made a personally copy of it that is now under your name) download it to your `~/Development/` directory:

```bash
git clone https://github.com/{yourname}/2048
cd 2048
git checkout gh-pages
```

Ready to go? Alright, make a change to one of the files in there. Do anything. Make the background pink. [Use CSS filters to make the numbers blurry.](http://css-tricks.com/almanac/properties/f/filter/) Put your name on the page as an `<h1>`, anything. When you're done, do this:

```bash
git add {any new files you made if you made any}
git commit -am "{write a description of your change}"
git push origin gh-pages
```

Boom. It's up there. Now you can show anyone your "Pink, blurry, personally branded 2048". If you go to [http://chrisuehlinger.com/2048/](http://chrisuehlinger.com/2048/) you'll see my version. I tried to write an AI that would beat the game. I did that because I was bored one afternoon, and now it's part of my portfolio, and I can bring it up on my iPhone in the middle of an interview.

So now you've got an easy way to publish anything you do. But what would really help would be a centralized site with a blog, and a portfolio page, and other goodies. I'll cover that in my next post.

## A few last goodies

You're going to want a way to run your site on your computer, so you don't need to push to Github every time you want to check if somethings working. I highly reccomend the Node.js module `http-server`. If you already have the Node package manager `npm`, type this to install the package:

```bash
npm install -g http-server
```

Then go to the directory where the HTML files are and type:

```bash
http-server -p 1234
```

Your website should now appear at `http://localhost:1234`. Anytime you change something, just refresh the page and you'll see the change.

I also HIGHLY reccomend the node app called `ungit`. It's a GUI that makes it much easier to use git. To install it, type:

```bash
npm install -g ungit
```

Go to the directory where your repository is and type:

```bash
ungit
```

Now visiting `http://localhost:9000` will show you the app.
