package main

import (
	"fmt"
	"testing"
)

func TestWebFetcher(t *testing.T) {
	wf := &WebFetcher{}

	urls, title, err := wf.Fetch("https://monzo.com/")

	if err != nil {
		t.Errorf("%v", err)
	}

	fmt.Println(urls, title)
}
