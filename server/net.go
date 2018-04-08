package main

// Net structure representing a graph of urls
type Net struct {
	items map[string][]string
}

// NewNet creates a new instance of Net
func NewNet() Net {
	return Net{items: make(map[string][]string)}
}

// HasItem Checks whether a key exists in the graph
func (n *Net) HasItem(key string) bool {
	_, exists := n.items[key]
	return exists
}

// SetValue Sets a value of a key
func (n *Net) SetValue(key string, values []string) {
	n.items[key] = values
}
