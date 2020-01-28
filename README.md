# Project Title

One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

Make sure to have the latest version of [dotnet](https://docs.microsoft.com/en-us/dotnet/core/tools/?tabs=netcore2x) cli, [node](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm) installed

Install required client-side dependencies:

```
npm install uuid --unsafe-perm=true
npm install mobx mobx-react-lite react-toastify final-form react-final-form revalidate
```

Install server-side dependencies:

```
nuget install FluentValidation.AspNetCore
```

### Building

Setup a local database and edit appsettings.json and Startup.cs accordingly. [instructions](https://docs.microsoft.com/en-us/aspnet/core/tutorials/razor-pages/sql?view=aspnetcore-3.1&tabs=visual-studio)

Run client-side application:

```
cd client-app
npm start
```

Run API project:

```
cd API
dotnet watch run -p API/
```

End with an example of getting some data out of the system or using it for a little demo

## Built With

- [.NET Web API](https://docs.microsoft.com/en-us/dotnet/core/) - Backend web api
- [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) - The SPA library used
- [Semantic UI](https://react.semantic-ui.com/) - Styled React Components
- [TypeScript](https://www.typescriptlang.org/)

## Screenshots

![Product page](https://github.com/navedrizvi/MeetCode/tree/master/client-app/public/assets/screenshots/1.png?raw=true 'Product page')
![Show meetups](https://github.com/navedrizvi/MeetCode/tree/master/client-app/public/assets/screenshots/2.png?raw=true 'Show meetups')
![Create meetup](https://github.com/navedrizvi/MeetCode/tree/master/client-app/public/assets/screenshots/3.png?raw=true 'Create meetup')
![Meetup details](https://github.com/navedrizvi/MeetCode/tree/master/client-app/public/assets/screenshots/4.png?raw=true 'Meetup details')
