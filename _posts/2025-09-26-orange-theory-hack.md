---
layout: default
title: "Orange Theory Hack: Username Rewrite"
date: 2025-09-26 11:00:00 -0000
author: HotChip
---

<div class="terminal-log terminal-log--left-aligned">
  <pre class="glitch">
<h2 class="crt-green">{{ page.title }}</h2>
<p class="crt-green">&gt;&gt; NODE: ctrlaltcorp.dev</p>
<p class="crt-green">&gt;&gt; AUTHOR: {{ page.author | upcase }}</p>
<p class="crt-green">&gt;&gt; TIME: [20220914-0000]</p>
  </pre>

  <h3 class="crt-green">{{ page.title }}</h3>
  <p class="glitch crt-magenta">"feature" nobody asked for.</p>
  <p>I cracked open the Orange Theory API back in 2022 and found a forgotten lane of code: staff-only username updates. Normally it’s locked to in-studio terminals, left the door wide open. Why can users update their username?</p>
  <p>I made this code to append class counts automatically-someone once ran nightly Google Scripts against it. Me, it was me. </p>
  <p>I asked if this was a bug. Corp said: “Not a bug, a feature.”</p>
  <p>So I wrote my own client that would:</p>
  <ul>
    <li>Auth with Cognito.</li>
    <li>Pull the member UUID straight out of the JWT.</li>
    <li>Query class totals from the <code>/member/members</code> endpoint.</li>
    <li>Push the update back via a PUT request.</li>
  </ul>
  <p>A nightly trigger runs, and the username updates like clockwork. For example: <code>Stephen B 452</code> increments with every class.</p>
  <p>The constraints? Max username length is 18 characters, but on-screen truncation hits around 12–14. The class count eats 3–4 digits, so I kept it slim: First Name + Last Initial + Count.</p>
  <p>Here's the core Google Apps Script function that performs the update:</p>

  <pre><code class="language-javascript">
function setUsernameWithClassCount() {
    var memberToken;
    if (!authLatestToken) {
        memberToken = getAuthToken();
    } else {
        memberToken = authLatestToken;
    }

    let memberUUID = parseJwt(memberToken);
    var memberEndpoint = `https://api.orangetheory.co/member/members/${memberUUID.username}`;

    var params = {
        method: "PUT",
        followRedirects: true,
        headers: {
            'Authorization': `Bearer ${memberToken}`
        },
        payload: JSON.stringify({
            "userName": newUsernameStart + memberClassTotal()
        })
    }
    var response = UrlFetchApp.fetch(memberEndpoint, params);
    var data = JSON.parse(response.getContentText());
    if(data.code === 'SUCCESS'){
      Logger.log(data.code + ` Your New username is ${data.data.userName}`);
    }else{
      throw new Error(JSON.stringify(data));
    }
}
  </code></pre>

  <p>It still works. Corp left it live. You can view the full script on <a href="https://github.com/StephenBarker/OTFNameAndClassCount" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
  <p>Call it a bug, a feature, or just legacy code nobody wanted to kill.</p>
  <pre class="glitch mt-2">
&gt;&gt; END OF TRANSMISSION
&gt;&gt; STATUS: WORKED AS DESIGNED
  </pre>
  <p class="post-signature">- {{ page.author }}</p>
</div>