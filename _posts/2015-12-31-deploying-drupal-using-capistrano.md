---
layout: post
title: "Deploying Drupal using Capistrano"
subtitle: "Deploy like a boss..."
date: 2015-12-31 23:59:59 +0100
tags:
- drupal
- capistrano
- deploying
- talk
comments: true
---
Deploying Drupal websites can be a hassle when you have multiple environments to maintain.
Therefore it's a good idea to automate your deployment process.
_Sit down, lay back, relax!_

Meet [Capistrano](http://capistranorb.com/), _a remote server automation and deployment tool written in Ruby_.
<!--more-->
It can be used to deploy many kinds of applications to any number of machines (environments).

I gave a presentation about this topic on [DrupalCamp Leuven 2015](http://drupalcamp.be/sessions/deploying-drupal-capistrano-3).
I even covered this topic already a few years before on [DrupalCamp Leuven 2013](http://leuven2013.drupalcamp.be/leuven2013.drupalcamp.be/session/deploying-drupal-capistrano.html) about Capistrano v2,
but since Capistrano v3 is completely rewritten from the ground up it became even easier to start using it for web applications which are not Ruby based as this dependency is left out in v3.

You can find the example code used for the presentation on the [DrupalCap GitHub Project page](https://github.com/jover/drupalcap).

<div class="embed-responsive embed-responsive-4by3">
  <iframe class="embed-responsive-item" src="//www.slideshare.net/slideshow/embed_code/key/IGI7SlomCiim80" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen></iframe>
</div>
