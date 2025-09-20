---
layout: default
title: "Archive // All Transmissions"
permalink: /archive/
---
<div class="terminal-log terminal-log--left-aligned">
  <h2 class="crt-green">{{ page.title }}</h2>
  <p class="crt-green">&gt;&gt; NODE: ctrlaltcorp.dev</p>
  <p class="crt-green">&gt;&gt; LOG: FULL HISTORY</p>

  {% for post in site.posts %}
    {% assign current_year = post.date | date: '%Y' %}
    {% assign current_month = post.date | date: '%B' %}

    {% if current_year != previous_year %}
      <h3 class="crt-green mt-2">[YEAR: {{ current_year }}]</h3>
    {% endif %}

    {% if current_month != previous_month or current_year != previous_year %}
      <h4 class="crt-green mt-1" style="margin-left: 1rem;">[{{ current_month | upcase }}]</h4>
    {% endif %}

    <p style="margin-left: 2rem;">
      <span class="crt-green">[{{ post.date | date: "%b %d" }}]</span> &mdash; <a href="{{ post.url | relative_url }}">{{ post.title | split: ' // ' | first }}</a>
    </p>
    {% assign previous_year = current_year %}
    {% assign previous_month = current_month %}
  {% endfor %}

</div>
