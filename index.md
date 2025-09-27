---
layout: default
title: "Boot Sequence"
---

<div class="terminal-intro">
  <h1 class="crt-green">Stephen Barker</h1>
  {% assign latest_post = site.posts.first %}
  {% if latest_post %}
    <div class="latest-transmission my-2">
      <span class="crt-green">&gt;&gt; LATEST TRANSMISSION:</span> <a href="{{ latest_post.url | relative_url }}">{{ latest_post.title | split: ' // ' | first }}</a>
    </div>
  {% endif %}
    <img src="{{ '/assets/img/76668045986__ECEF6A7B-9EAD-4065-8C80-F523EC358B7C.jpeg' | relative_url }}" alt="Stephen Barker as a hacker, wearing sunglasses." title="Stephen Barker as a hacker, wearing sunglasses." class="ice-image">
  <div class="tagline glitch">Killing The Corp®rate buzzwords, one commit at a time.</div>
  <pre class="typewriter">$ whoami HotChip  $ cat /etc/motd Where code meets resistance.
</pre>
 <p>&gt;&gt; Access the <a href="/archive/">full archive</a> for all prior transmissions.</p>
</div>


