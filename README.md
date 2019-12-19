## What is this application?

This application utilizes Google Maps -API and shows every single restaurant in the city of Helsinki, capital of Finland.
Application takes its restaurant-location data from MyHelsinki Open API, and implements this data to Google Maps -API.
Restaurants can be filtered by the origin of their meat. For example, if filter 'cow' -meat is enabled, a customized marker indicates the origin of that restaurant's meat and the location of the restaurant on the map.

### `The purpose of this application`

In Finland, restaurants must provide the information on the country of origin of the meat that they are selling.
However, currently many restaurants are not presenting this information clearly enough, thus this service was made.

### `Where does the origin-data come from?`

At the moment, the only way to receive the data for the origin of the restaurant's meat is to contact the restaurant itself.
This is an ongoing process and in time the data will be more complete. Application includes a section, where this meat -data can be modified at any time.

### `Challenges`

MyHelsinki Open API does not provide any information about restaurants’ food. Before sending this data from the API to the MongoDB -database, it needed to be completed with new properties about the origin of restaurant’s meat, which is essential part of this application. This was done looping through the data of every restaurant and adding new meat attributes and setting a default value of ‘unknown’. This value can easily be modified later inside the application, featuring token-based authentication to be possible only for the registered and logged in admin-user.