# info-pizza
## Description
This is a Node.js application that utilizes PostgreSQL as the database. It provides an API for finding the closest restaurants based on latitude and longitude coordinates.
## Installation
1. Clone the repository.
```bash
git clone <repository_url>
cd <repository_directory>
```
2. Install the required dependencies by running the following command:
```bash
npm install
```
3. Set up the PostgreSQL database. Make sure you have PostgreSQL installed and running.
4. Create a `.env` file in the root directory and add the following environment variables:
```bash
DB_USER=<your_database_username>
DB_HOST=<your_database_host>
DB_NAME=<your_database_name>
DB_PASSWORD=<your_database_password>
DB_PORT=<your_database_port> # optional, defaults to 5432
PORT=<api_server_port> # optional, defaults to 3000
```
## Usage
- To find the closest restaurants, send a POST request to the `/` endpoint with the latitude and longitude coordinates in the request body.
## Example request body:
```json
{
"latitude": 41.08354,
"longitude": 29.04907
}
```
- The API will return the closest restaurants within a 10,000-meter radius, sorted by distance.
## Response:
- 200 OK:
```json
[
{
"id": 1,
"name": "Restaurant A",
"latitude": 41.082,
"longitude": 29.049,
"distance": 1278
},
{
"id": 2,
"name": "Restaurant B",
"latitude": 41.086,
"longitude": 29.048,
"distance": 758
},
{
"id": 3,
"name": "Restaurant C",
"latitude": 41.085,
"longitude": 29.051,
"distance": 950
},
{
"id": 4,
"name": "Restaurant D",
"latitude": 41.084,
"longitude": 29.047,
"distance": 1370
},
{
"id": 5,
"name": "Restaurant E",
"latitude": 41.088,
"longitude": 29.049,
"distance": 1742
}
]
```
- 204 No Content:
```json
{
"message": "There are no restaurants close to you."
}
```
- 400 Bad Request:
```json
{
"error": ["Please provide a valid latitude in float type.", "Please provide a valid longitude in float type."],
"message": "Example request",
"body": {
"latitude": 41.08354,
"longitude": 29.04907
}
}
```
- 500 Internal Server Error:
```json
{
"error": "Database operation failed"
}
```
## Dependencies
- express
- cors
- body-parser
- pg
- express-validator