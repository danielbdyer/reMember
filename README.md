# reMember

#### See our YouTube demo here!

https://www.youtube.com/watch?v=9nxg-RmIsf4

## Intro

Some groups just need a simple way to keep track of new and returning attendees at an event. This was the challenge that Authentic Relating Houston faced (where I am a lead facilitator), and so I developed reMember, a basic check-in app that synchronizes with Firebase to log both weekly and all-time attendee information. It will soon provide other needed features as well.

## What We Used

| Built with:
| ------------|
| ES6 Javascript |
| React |
| React Native |
| React-Native-Firebase (bridges iOS, Android, .js SDKs) |
| React-Native-Router-Flux |
| Firebase |
| Redux |
| Redux-Thunk |
| Moment.js |
| Lodash |


## Using the App

Group members responsible for check-in can begin by logging into their account if it already exists, or create a new one by following the link at the bottom of the log-in screen. 

Once logged in, the app will show all already-checked in members for the day, if there are any. If no users have yet checked in, the user of the app will need to search for existing members, or they will use the upper-right tab button to proceed to create a brand new member.

By clicking on the search bar, the user effectively searches a global list of community members (accumulated from all previous events.) If an existing member is found within the search, the user will be able to click on their name to add them (and a link to all of their info) within that day's attendance record. If not, they can proceed into the Create New screen to do exactly that.

From here, they will be able to add both username and e-mail, with planned functionality of Boolean checkboxes to indicate interest of receiving newsletters and/or a welcome e-mail.

## Our Design Process

At the outset of this project, I worked to gather together the requisite elements that would need to come into play in order to create a functioning app. It would need to have intake of information from new members, a way to search for existing members and add them to that meeting's attendance sheet, and a way for members to edit their information on the fly.

Within React-Native-Router-Flux, each component can be substantiated as its own scene within the app. The basic functionality of logging in, creating a new login, viewing all members, creating a member, and editing a member seemed clear enough, and was important for getting distinct about the singular purposes of reducers, actions, and methods.

I found that denormalizing the data would be the best approach when it came to keeping the weekly attendance lists and the all-time attendance lists separate, and so I developed a system of logic that would store the check-in admin alongside the list of atteendees for the evening, as well as registering the check-in admin as one of the all-time attendees, so there would be concurrency between UIDs. 

## Our Challenges

The challenges that I faced in particular were in designing the app to be the most stable as possible, given the relative immaturity of some of its components. The beta version of React-Native-Router-Flux ended up serving its purpose well, but not without some extra work in ensuring that all of the scenes were appropriately nested against one another.

## Future Goals

The intention for this app is meant not only for the local Authentic Relating community, but for all of them, should they choose to opt-in to it, as we have a global network of communities. There are some stretch goals that I plan to implement as time goes on, but for now, the ability to create new users and store them per event is much better than how we were doing it before: on pen and paper, which often would go home with a facilitator and then ultimately not be merged together with other lists to form a database of individuals. We are looking to build a community e-mail address list with which we can send out a MailChimp newsletter.

With that said, our goals include:

* Logging in against Firebase credentials (complete)
* Adding a new member and persisting it (complete)
* Showing that member and other members, accumulated, per event (complete)
* Autocompleting against a global list of accumulated members (complete)
* Storing that autocompleted member as a user for that week (pending)
* Produce CSV from Firebase Admin SDK, or app itself, to be e-mailed (TBD)
* Facebook RSVP integration (TBD)
* Viewing all checked in for previous weeks (pending)
* Additional information and resources about the evening (potential)
* Integration with the Stripe payment API for taking in payment (stretch)
* Higher attendance should result in a higher autocomplete listing (stretch)
* Auto first-time registration e-mail with user opt-in, but defaulted to true (stretch)
* User profile icons or avatars (stretch)

## Authors

* **Daniel Dyer** - [danielbdyer](https://github.com/danielbdyer)