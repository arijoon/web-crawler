package main

import (
	"log"
	"sync"
)

// Crawler crawls and populates a net of urls
type Crawler struct {
	mux sync.Mutex
}

// Crawl a url and find all links with same domain
func (c *Crawler) Crawl(url string, fetcher Fetcher) Net {
	net := NewNet()

	// the count shows the crawls in progress
	countChan := make(chan int)
	count := 1

	go c.crawl(url, &net, fetcher, countChan)

	for i := range countChan {
		count = count + i
		if count == 0 {
			break
		}
	}

	return net
}

func (c *Crawler) crawl(url string, net *Net, fetcher Fetcher, countChan chan int) {
	defer reportCount(countChan, -1)

	urls, title, err := fetcher.Fetch(url)
	if err != nil {
		log.Printf("Failed to fetch url %v, err: %v", url, err)
		return
	}

	c.mux.Lock()
	defer c.mux.Unlock()
	net.SetValue(url, Page{title, urls})

	for _, url := range urls {
		if !net.HasItem(url) {
			reportCount(countChan, 1)
			go c.crawl(url, net, fetcher, countChan)
		}
	}
}

func reportCount(countChan chan int, value int) {
	countChan <- value
}
