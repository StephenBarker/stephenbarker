---
layout: default
title: "Channel Not Encrypted"
date: 2025-12-19 09:00:00 -0000
author: HotChip
excerpt: "Unsafe connection detected. Aborting transmission."
tags: [security, encryption, warning]
---
<div class="terminal-log terminal-log--left-aligned">
    <h2 class="crt-green">{{ page.title }}</h2>
    <p class="crt-green">&gt;&gt; NODE: ctrlaltcorp.dev</p>
    <p class="crt-green">&gt;&gt; AUTHOR: {{ page.author | upcase }}</p>
    <p class="crt-green">&gt;&gt; TIME: [{{ page.date | date: "%Y%m%d-%H%M" }}]</p>

    <p class="mt-2">Channel not encrypted.</p>

    <pre class="glitch mt-2"> &gt;&gt; CONNECTION REFUSED </pre>
</div>