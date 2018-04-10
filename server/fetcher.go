package main

import (
	"log"
	"net/http"
	"net/url"
	"strings"

	"golang.org/x/net/html"
)

// Fetcher fetch urls from a page
type Fetcher interface {
	Fetch(url string) ([]string, string, error)
}

// WebFetcher fetches urls from a webpage
type WebFetcher struct{}

// Fetch fetch all a tags that are from the same domain from a web url
func (fetcher *WebFetcher) Fetch(address string) ([]string, string, error) {
	resp, err := http.Get(address)

	if err != nil {
		return nil, "", err
	}

	defer resp.Body.Close()

	// Now we must find all the valid a tags
	mainURL, err := url.ParseRequestURI(address)
	if err != nil {
		return nil, "", err
	}

	hostname := mainURL.Hostname()

	urls := make([]string, 0)
	var title string

	tokenizer := html.NewTokenizer(resp.Body)
	for {
		tt := tokenizer.Next()
		switch tt {
		case html.ErrorToken: // EOF return result
			return urls, title, nil

		case html.StartTagToken:
			t := tokenizer.Token()

			if t.Data == "title" {
				tokenizer.Next()
				title = tokenizer.Token().Data
			}

			if t.Data != "a" {
				continue
			}

			if href, ok := getAttribute(&t, "href"); ok {
				if href == "/" {
					continue
				}

				// ignore anchor tel, mailto and javascript, possibly place in an array and loop
				if strings.HasPrefix(href, "#") ||
					strings.HasPrefix(href, "tel:") ||
					strings.HasPrefix(href, "mailto:") ||
					strings.HasPrefix(href, "javascript:") {
					continue
				}

				parsedURL, err := url.Parse(href)
				if err != nil {
					log.Printf("Failed to parse link %v", href)
					continue
				}

				if strings.HasPrefix(href, "http") {
					if hostname != parsedURL.Hostname() {
						// Different host so we can ignore
						continue
					}
				} else {
					// relative path
					res := mainURL.ResolveReference(parsedURL)
					href = res.String()
				}

				urls = append(urls, href)
			}
		}
	}
}

func getAttribute(t *html.Token, attrKey string) (val string, ok bool) {
	for _, attr := range t.Attr {
		if attr.Key == attrKey {
			return attr.Val, true
		}
	}

	return "", false
}
