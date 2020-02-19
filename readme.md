# Homm3 Messages API

Currently working at [homm3.loskir.ru](https://homm3.loskir.ru)

## Usage
- `GET`/`POST` request are accepted
- JSON body / query params:
    - `text` [string] — message text
    - `color` [string] — frame color ("red", "blue" etc.)
    - `show_ok` [bool] — whether to show ok button (defaults to true)
    - `show_cancel` [bool] — whether to show cancel button (defaults to false)
- Response — PNG image