package main

import (
	"net/http"

	"golang.org/x/net/html"
)

// Fetcher fetch urls from a page
type Fetcher interface {
	Fetch(url string) ([]string, error)
}

// WebFetcher fetches urls from a webpage
type WebFetcher struct{}

// Fetch fetch all a tags that are from the same domain from a web url
func (fetcher *WebFetcher) Fetch(url string) ([]string, error) {
	resp, err := http.Get(url)

	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	// Now we must find all the valid a tags
	urls := make([]string, 0)
	tokenizer := html.NewTokenizer(resp.Body)
	for {
		tt := tokenizer.Next()
		switch tt {
		case html.ErrorToken:
			return urls, nil

		case html.StartTagToken:
			t := tokenizer.Token()

			if t.Data == "a" {
				if href, ok := getAttribute(&t, "href"); ok {
					urls = append(urls, href)
				}

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
