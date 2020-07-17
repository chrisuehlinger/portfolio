---
layout: post
title: "Making a Widget with Khan Academy"
date: 2014-03-15
comments: true
---

Last week I took a look at Khan Academy's coding environment.

One thing that's been on my mind lately is waves. I want to make an audio programming environment that shows what happens to signals before and after they're processed. In other words: if you're programming a synth, I think you should be able to see what each filter, effect, etc. is doing to your wave, in addition to hearing it. I'm still a long way off from building something like this, but it was fun to get my feet wet building a small Javascript widget.

One thing I've been learning about is Fourier Transforms. I've spent a lot of time trying to figure these things out, and I think [BetterExplained's Khalid Azad has the best explanation](http://betterexplained.com/articles/an-interactive-guide-to-the-fourier-transform/) I've seen on the internet.

He uses a widget to demonstrate how waves can be built and taken apart. It's a really cool piece of work, and does the job well. However, I did see a way it could be improved: Direct Manipulation.

When I looked at Azad's widget, the first thing I did was try and grab at the waves and circles with my mouse. However, the visual part of the widget can only be changed by changing the numbers in the input box. I wanted to take this a step further. So here are my two widgets.

<h2><a href="https://www.khanacademy.org/cs/wave-builder/5393741848248320">Wave Builder</a></h2> <script src="https://www.khanacademy.org/cs/wave-builder/5393741848248320/embed.js?editor=no&amp;buttons=yes&amp;author=yes&amp;embed=yes"></script> <p>Made using: <a href="https://www.khanacademy.org/cs">Khan Academy Computer Science</a>.</p>

The Wave Builder is designed to help teach students how small waves can be combined into bigger ones. Grabbing and dragging the circles will change the amplitude and phase of the wave, while tugging at the wave itself will affect it's amplitude and period (you can hold Shift to keep amplitude steady while you change phase or period). The wave at the bottom is the sum of the two waves, and cannot be directly changed, it can only change as a result of changing the component waves.

In order to teach about why we need Fourier Transforms, I also build the Wave Crusher. This widget presents students with a composite wave and challenges them to find the two waves that are needed to make it. If you can find the two waves, they'll cancel out the wave on the top, and the wave on the bottom should be flat.

<h2><a href="https://www.khanacademy.org/cs/wave-crusher/5601532835790848">Wave Crusher</a></h2> <script src="https://www.khanacademy.org/cs/wave-crusher/5601532835790848/embed.js?editor=no&amp;buttons=yes&amp;author=yes&amp;embed=yes"></script> <p>Made using: <a href="https://www.khanacademy.org/cs">Khan Academy Computer Science</a>.</p>

The Wave Crusher is admittedly really hard to use. Unless one of the component waves is right at the beginning, your chances of correctly finding the other wave are pretty slim. However, if the goal is to show that we can't do this by hand and that we really need Fourier Transforms, I'd say it's successful!

Khan Academy's coding environment is pretty awesome. They caught a lot of flak from Bret Victor in his now legendary [Learnable Programming](http://worrydream.com/LearnableProgramming) article (it's pretty much a rule that every post in this blog will contain a link to this article). However, they seem to have taken some of his pointers. The documentation underneath the editor was very useful, and I did find myself doing a lot of "creating by reacting": I didn't plan things out too much, I just worked from what I saw on the canvas. It was a pretty cool way to make a prototype.
