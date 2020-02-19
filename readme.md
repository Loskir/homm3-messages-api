# Homm3 Messages API

### Based on [github.com/lehazyo/homm3-messages](https://github.com/lehazyo/homm3-messages)

### Currently working at [homm3.loskir.ru](https://homm3.loskir.ru)

## Usage
- `GET`/`POST` request are accepted
- JSON body / query params:
    - `text` [string] — message text
    - `color` [string] — frame color ("red", "blue" etc.) (defaults to "red")
    - `show_ok` [bool] — whether to show ok button (defaults to true)
    - `show_cancel` [bool] — whether to show cancel button (defaults to false)
- Response — PNG image or JSON (if error) 

## Running
Server starts at port 11001
