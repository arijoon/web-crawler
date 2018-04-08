package main

import "fmt"

func main() {
	fmt.Println("This is main package")

	crawler := &Crawler{}
	fetcher := &WebFetcher{}

	net := crawler.Crawl("http://monzo.com", fetcher)

	fmt.Println(net)
}
