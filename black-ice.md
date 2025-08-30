---
layout: default
title: "Black ICE"
---

<div class="black-ice">
  <h2 class="crt-green">Black ICE</h2>
  <div class="rant glitch">
    Press Ctrl+Alt on the system — reboot the corp.<br>
  </div>
  <img src="{{ '/assets/img/1B6599819-uncle-sam-hacker-mxd-130322.webp' | relative_url }}" alt="Uncle Sam as a hacker, wearing a hoodie and sunglasses." class="ice-image">
  <div class="jargon-container">
    <span class="crt-green">Intercepted Corp-Speak Transmission:</span>
    <pre id="jargon-output">Fetching...</pre>
  </div>
  <script>
    fetch('https://corporatebs-generator.sameerkumar.website/')
      .then(response => response.json())
      .then(data => { document.getElementById('jargon-output').textContent = `> ${data.phrase}`; });
  </script>
</div>
