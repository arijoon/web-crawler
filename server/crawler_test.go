package main

import (
	"fmt"
	"testing"
)

// Test crawling a sample url

func TestCrawl(t *testing.T) {
	crawler := Crawler{}

	net := crawler.Crawl("https://golang.org/", fetcher)

	for k, v := range fetcher {
		if !net.HasItem(k) {
			t.Errorf("Net does not contain url: %v", k)
		}

		result := net.items[k][:]
		expected := v.urls[:]
		for index, value := range expected {
			if value != result[index] {
				t.Errorf("Net has different items at %v, Result: %v\n Expected: %v", k, result, expected)
			}
		}
	}

}

// fakeFetcher is Fetcher that returns canned results taken from Go tutorial
type fakeFetcher map[string]*fakeResult
type fakeResult struct {
	urls []string
}

func (f fakeFetcher) Fetch(url string) ([]string, error) {
	if res, ok := f[url]; ok {
		return res.urls, nil
	}

	return nil, fmt.Errorf("not found: %s", url)
}

var fetcher = fakeFetcher{
	"https://golang.org/": &fakeResult{
		[]string{
			"https://golang.org/pkg/",
			"https://golang.org/cmd/",
		},
	},
	"https://golang.org/pkg/": &fakeResult{
		[]string{
			"https://golang.org/",
			"https://golang.org/cmd/",
			"https://golang.org/pkg/fmt/",
			"https://golang.org/pkg/os/",
		},
	},
	"https://golang.org/pkg/fmt/": &fakeResult{
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
	"https://golang.org/pkg/os/": &fakeResult{
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
}
