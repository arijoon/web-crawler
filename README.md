# Web crawler

## Run :

First run the server code, either run the package or build and run as follows (you must install the dependencies first):

```sh
cd server
go build
server.exe
```

Now you can run the client in dev mode to take advantage of the automatic proxy:

```sh
cd client
npm start
```


## Sever design:

Server uses a Net structure which is a graph data structure to hold information about the pages, this structure is as follows:

```go
type Net struct {
	items map[string]Page
}

type Page struct {
	Title string   
	Urls  []string 
}
```

this structure gets populated by the crawler which spins up new go routines per each **new** url it finds. The page is parsed via the `Fetcher` and tokenized in the same class.

The final result is returned to the UI which is displayed in two panels of either list view or graph view. Be careful with high depths on the graph view as it can be very slow.

Each file has tests associated that verify the functionality of each class. 


## Improvements

- reduce timeout: sometimes web calls can take a while and we can ignore those requests.
- separate `Fetcher` and html parsing for easier testing validity
- Download the result as JSON (simple to add via data attribute)
- Use D3 for more performant and static representation of higher depths
- Record and ignore the urls that have already failed to be fetched
- Cache the result and return the same result for same request
