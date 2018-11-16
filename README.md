# Xgrid URL Shortener

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing


## Running the tests

## Development

This project is developed using AngularJS. Atom was used as the editor and development and tests were done on mac. 
The project uses google's reCaptcha v2.0 api and [Bitly api](https://dev.bitly.com/links.html#v3_user_link_edit) for 
url shortening. Http get method was used for communicating with the api.

Persistent storage using local storage was added. This is essential for developing a dashboard as the api has no method for 
listing all generated short links. Also this helps with communicating between different controllers.

A dashboard is not essential and depends on type of user. A user who is not concerned with the number of clicks or their origin
would not find the dashboard helpful. However a user who is interesed in the stats will find the dashboard useful. The dashboard was
made in a separate view to prevent cluttering.

Bitly api does not allow for deleting generated links. An enterprise payment plan would allow for links to be deleted. Therefore 
option to add expiry of the link could not be added. It would be best to use a api which allows for setting an expiry. Alternatively 
a backend solution can be implemented to delete the link when it reaches expiration time.

Preventing spam bots is essential. Without such checks in this application or any other application can be overloaded with traffic
and meaningless data leading to a breakdown. I choose reCaptch v2 here to clearly demo the working of reCaptch however v3 is more suited
as it does not require the user to complete the check every single time.

I am not familiar with dockerized implimentation and was not able to implement that in this time.

### Limitations

* Cannot delete the generated links. Need to use a better api provider or implement a server based setup independent on 
  external api.
* Cannot read all existing links from the api.
* The implementation for acquiring data from api for dashboard is not robust and due to this implementation when teh table
  refreshes there is an interval during which data from the table is all cleared up.
* Currently this project is not designed to work with multiple users were each user can access their independent data.

### Known Bugs
* On reloading the Shortener view reCaptcha is not reloaded and requires a refresh before a new url can be submitted.