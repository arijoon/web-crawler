package main

import (
	"encoding/json"
	"log"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	urls, ok := r.URL.Query()["url"]

	if !ok || len(urls) < 1 {
		log.Println("Invalid number of URLS")
		return
	}

	url := urls[0]

	log.Println("Processing url ", url)

	// For testing
	// json, _ := ioutil.ReadFile("monzo.json")

	crawler := &Crawler{}
	fetcher := &WebFetcher{}

	net := crawler.Crawl(url, fetcher)

	json, err := json.Marshal(net.items)

	if err != nil {
		log.Printf("Error, failed to crawl %v, due to %v", url, err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(json)
}

func main() {
	http.HandleFunc("/crawl", handler)

	log.Fatal(http.ListenAndServe(":8088", nil))
}
