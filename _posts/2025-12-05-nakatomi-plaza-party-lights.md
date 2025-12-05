---
layout: default
title: "Nakatomi Plaza Party Lights // Mandatory Fun Day"
date: 2025-12-05 09:00:00 -0000
author: HotChip
excerpt: "Going full Nakatomi Plaza for the corporate holiday party. An ESP32, some LEDs, and a little bit of movie magic."
tags: [esp32, fastled, cpp, diehard, christmas, hotchip]
---
<div class="terminal-log terminal-log--left-aligned">
    <h2 class="crt-green">{{ page.title }}</h2>
    <p class="crt-green">&gt;&gt; NODE: ctrlaltcorp.dev</p>
    <p class="crt-green">&gt;&gt; AUTHOR: {{ page.author | upcase }}</p>
    <p class="crt-green">&gt;&gt; TIME: [{{ page.date | date: "%Y%m%d-%H%M" }}]</p>

    <p class="mt-2">Mandatory Fun Day drops a “movie-themed Christmas party” directive from Corporate. Everyone else stampedes for the usual holiday sludge—Grinch sweaters, Home Alone traps, whatever HR thinks is festive. But not us. No. We’re going full Nakatomi Plaza.</p>

    <p>Enter: an ESP32 strapped to a tiny LED bar running a cop-light loop that screams “Come out to the coast, we’ll get together, have a few laughs.” Blue hits fast, red follows hard, all packaged in a tidy loop because the board may be small, but Hotchip does not do half-measures.</p>

    <blockquote class="blockquote--themed glitch mt-2">
        <p>The parts for the build. Simple, effective.</p>
        <img src="/assets/img/nakatomi-lights-build.jpg" alt="ESP32 board and a LED strip." class="img-fluid" style="width: 50%;">
        <img src="/assets/img/nakatomi-lights-build2.jpg" alt="WS2811 LED strip." class="img-fluid" style="width: 50%;">
        <p class="small muted">Just add a 5V power source and a little holiday spirit.</p>
    </blockquote>

    <h3 class="crt-green mt-2">The Logic</h3>
    <p>The LEDs alternate in tight 80-millisecond bursts—quick enough to look tactical, slow enough not to fry retinas. Blue stings, red punches, and there’s a little pause to let the tension breathe. It’s basically a strobe bar on microcontroller life support, perfect for setting the mood when some VP asks if Die Hard is really a Christmas movie. (It is. Move on.)</p>

    <p>So congratulations: your office party is now officially upgraded from “mandatory” to “memorable,” and your ESP32 is doing more police work today than half the cast did in the film.</p>

    <p>Yippee-ki-yay and happy holidays.</p>

    <h3 class="crt-green mt-2">The Code</h3>
    <p>For anyone who wants to build their own.</p>
<pre><code class="language-cpp">
    #include <FastLED.h>

    #define NUM_LEDS 4
    #define DATA_PIN 4

    CRGB leds[NUM_LEDS];

void setup() {
  FastLED.addLeds<WS2811, DATA_PIN, RGB>(leds, NUM_LEDS);
  FastLED.setBrightness(200); // adjust if too bright
}

void loop() {
  // Blue phase: 3 quick flashes
  for (int i = 0; i < 3; i++) {
    leds[0] = CRGB::Blue;
    leds[2] = CRGB::Blue;
    leds[1] = CRGB::Black;
    leds[3] = CRGB::Black;
    FastLED.show();
    delay(80);

    leds[0] = CRGB::Black;
    leds[2] = CRGB::Black;
    leds[1] = CRGB::Blue;
    leds[3] = CRGB::Blue;
    FastLED.show();
    delay(80);
  }

  delay(300); // linger a bit before switching

  // Red phase: 3 quick flashes
  for (int i = 0; i < 3; i++) {
    leds[0] = CRGB::Red;
    leds[2] = CRGB::Red;
    leds[1] = CRGB::Black;
    leds[3] = CRGB::Black;
    FastLED.show();
    delay(80);

    leds[0] = CRGB::Black;
    leds[2] = CRGB::Black;
    leds[1] = CRGB::Red;
    leds[3] = CRGB::Red;
    FastLED.show();
    delay(80);
  }

  delay(300); // linger again
}
</code></pre>
    <pre class="glitch mt-2"> &gt;&gt; END OF TRANSMISSION </pre>
    <p class="post-signature">- {{ page.author }}</p>
</div>