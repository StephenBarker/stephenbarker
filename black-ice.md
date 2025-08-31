---
layout: default
title: "Black ICE"
description: "A commentary on corporate jargon and the nature of digital resistance, featuring an intercepted corp-speak transmission."
---

<div class="black-ice">
  <h2 class="crt-green">Black ICE</h2>
  <div class="rant glitch">
    Press Ctrl+Alt on the system — reboot the corp.<br>
  </div>
  <img src="{{ '/assets/img/AQPYpjftWxpl8m1jJO6AQgClnFhzBUSjpdzLaOtdFAbwyQyy73B7jCHLTSdVwYHs3etKdChh6u15p4MwoOwdg8yI_8R0YBgHleCVBT85pEPEI3f1IHpAvHhAylTd7UXw.webp' | relative_url }}" alt="Uncle Sam as a hacker, wearing a hoodie and sunglasses." title="Uncle Sam as a hacker, wearing a hoodie and sunglasses." class="ice-image">
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
