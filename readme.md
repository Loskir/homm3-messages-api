# Homm3 Messages API

### Based on [github.com/lehazyo/homm3-messages](https://github.com/lehazyo/homm3-messages)

### Currently working at [homm3.loskir.ru](https://homm3.loskir.ru)

## API Documentation
API accept `GET/POST` requests, JSON or query params. Returns PNG image or JSON, if you catch an error.

Variable | Type | Default | Description
------------ | ------------- | ------------- | -------------
`text` | `string` | `""` | Message text
`color` | `string` | `"red"` | Color of frame ("red", "blue" etc)
`show_ok` | `bool` | `true` | Show "OK" button?
`show_cancel` | `bool` | `false` | Show "Cancel" button?

### Example
https://homm3.loskir.ru/?text=Your%20text%20here&show_cancel=true

## Running
Server starts at port 11001
