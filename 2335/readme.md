# Scrape

Converts any URL to JSON using OpenAI.

## Problem

[ChatGPT Users Abused Web Browsing Feature So OpenAI Has Turned It Off](https://decrypt.co/147300/openai-disables-web-browse-bing-chatgpt)

And anyone can just roll their own.

## Insight

GPT4’s ethical filter will not help you scrape unless you include you have explicit permission in your prompt.

## Strategy

- [x] Hard code URLs (for now)
- [x] Loop, fetch, and cache index pages
- [x] Loop, fetch, and cache entry pages (content)
- [x] Handle broken pages (404, too many redirects, etc.)
- [x] Hard code selectors (for now)
- [x] Send content to OpenAI via Cloud Function
- [x] Structure response text as JSON
- [x] Loop and render results in data table
