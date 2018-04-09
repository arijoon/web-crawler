package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
)

func main() {
	fmt.Println("This is main package")

	crawler := &Crawler{}
	fetcher := &WebFetcher{}

	net := crawler.Crawl("http://monzo.com", fetcher)

	jsonData, _ := json.MarshalIndent(net.items, "", "  ")
	ioutil.WriteFile("monzo.json", jsonData, 0644)
}
