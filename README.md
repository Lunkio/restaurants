## What is this application?

This application utilizes Google Maps -api and shows every single restaurant in the city of Helsinki, capital of Finland.
Restaurants can be filtered based on from what origin of their meat is. For example, if filter 'cow' -meat is enabled,
all the markers in the map will show the origin of that meat in the current restaurant.

### `The purpose of this application`

In Finland, restaurants must provide the information of the origin of the meat they are selling.
However, currently many restaurants are not presenting this information clearly enough, thus this service was made.

### `Where does the data come from?`

At the moment, the only way to receive the data for the origin of the restaurant's meat is to contact the restaurant itself.
This is an ongoing process and in time the data will be more complete.

### `How was this app made?`

Application takes its restaurant-location data from myHelsinki Open Api. Before implementing this data to Google Maps -api,
restaurant's data is completed with a new 'meat-origin' property, which can be easily modified later inside the app's admin -section.