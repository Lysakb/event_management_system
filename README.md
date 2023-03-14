# Event_management_system

### User Story
An event organizer should be able to create and manage events. This include:

Register and log in to the platform and getting a welcome mail on registeration.
Create new events with details such as name, date, location, description.
Manage attendees by adding, editing and removing attendees from the event.
Attendees should get a mail when they are added to or removed from an event.
Generate reports for each event with information about attendee count.


### Entities:

-   User: A user has a unique identifier, name, email, and password.
-   Events: It consist of name, date, location and description.
-   Attendees: An attendee has a unique identifier, name, email, and password.

### Relationships:

-   The user can view the events and attendees added to the event.

## NoSQL Schema Design

Based on the requirements analysis, the following schema can be designed:

### User Collection:

```
{
   _id: ObjectId,
   name: string,
   email: string,
   password: string,
   
}

```

### Events Collection:

```
{
   _id: ObjectId,
   name: string,
   date: string,
   location: string,
   description: string
}

```

### Attendee Collection:

```
{
   _id: ObjectId,
   name: string,
   email: string,
   password: string,
}

```

```
## API Endpoints

``` 

-   POST /event/add - Add events.
-   POST /event/add-to-event/:{attendeeId} - Add attendees to events.
-   POST/event/get-stats/:{eventId} - Get stats of event.
-   POST/attendee/add - create attendees.
-   DELETE/attendee/:{attendeeId} - Delete attendees.

## Database
Mongodb
