package main

import "testing"

// Test Creation of a net
func TestNet(t *testing.T) {
	net := NewNet()

	if len(net.items) != 0 {
		t.Errorf("Net has more than 0 elements")
	}
}

// Test checking existence of items
func TestNet_HastItem(t *testing.T) {
	net := NewNet()
	net.items["key"] = Page{"title", []string{"val1", "val2"}}

	exists := net.HasItem("key")
	if !exists {
		t.Errorf("Net should contain key, %v", net)
	}
}

// Test setting values in a net
func TestNet_SetValue(t *testing.T) {
	net := NewNet()
	net.SetValue("key", Page{"title", []string{"val1", "val2"}})

	exists := net.HasItem("key")
	if !exists {
		t.Errorf("Net should contain key, %v", net)
	}

	value := net.items["key"].Urls

	if len(value) != 2 {
		t.Errorf("Invalid length of values, %d", len(value))
	}

	if value[0] != "val1" || value[1] != "val2" {
		t.Errorf("Incorrect results %v", value)
	}
}
