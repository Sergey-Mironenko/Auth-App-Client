# Authentication App
A single-page application that alows user to register, login or change the password. Loged user can see the list of all activated users, change his name password or email. Implements the look and behaviour of old computers.

# Table of contents
- [Technologies used](#technologies-used)
- [Structure](#structure)
- [Features & Functionality](#features--functionality)
- [Reflections](#reflections)

# Technologies used
- React.js
- Redux
- React Router(v6)
- JSX
- TypeScript
- Axios, API
- Sass (SCSS)
- BEM methodology

# Structure
Frontend is built using functional components and React Hooks. Each component is abstract and fully reusable. Components are styled using Sass (SCSS). BEM methodology is used for naming and styling.
If user is loged in, access token stores in locale storage and app adds it to every request headers. If access token is "rotten" there will be an authorization error whitch will be caught by response interceptor and refresh request will be done immediately. Page refresh will cause refresh request too if user is loged in.
All data comparition and checking is implemented on a server side to prevent data licking.

# Features & Functionality

## App 
- App replicates the behaviour and appearance of old computers.
- Navigation is implemented using React Router.
- `Wait` function was used in all requests to server in order to simulate the loading proccess and demonstrate the loader.
- If user is loged for too long and refresh token is expired, after page reload or any request to server user will be immediately loged out.
- App is responsive and works on all screen sizes.

https://github.com/Sergey-Mironenko/Authentication-app/assets/106872008/6db9e12b-cce5-40cc-b68c-9927aaaa463c

## Registration page
- Asks to enter name, email and password.
- Makes a request to server to check entered data for validity.
- In case of network server or validation error shows appropriate message.
- Makes a request to send an activation email.

https://github.com/Sergey-Mironenko/Authentication-app/assets/106872008/05eb41e3-d908-4acd-bec0-530427fc3f7f

## Activation page
- Makes request to check if this user needs activation.
- If user is already activated or doesn't exist shows appropriate message.
- Makes activation request and logging this user in.

https://github.com/Sergey-Mironenko/Authentication-app/assets/106872008/18c7d190-815b-4fb3-875a-5478fe41cf4e

## Login page
- Asks to enter email and password.
- Makes a request to checks if such user exists and activated.
- Makes a request to log user in and to send him access and refresh tokens. Access token is stored in locale storage while refresh token is stored in cookies.
- In case of error shows appropriate message.
- Alows to remember email and password.

https://github.com/Sergey-Mironenko/Authentication-app/assets/106872008/b8cd1243-8d71-497a-b38c-4b116e896353

## Verify and reset pages for non authenticated user
- Asks to enter an email, end verifies it.
- Makes a request to receive one time password to the cookies.
- After entering password from email makes a request to compare it with password from cookies.
- After confirmition redirects user to reset page and asks to enter new password and repeat it.
- Makes a request to compare passwords.
- If passwords don't match or new password is the same as old password shows appropriate message.
- After reset alows to return to login page.
- In case of error in any step shows appropriate message.
- Alows to reset password for many users in different sessions without any conflict.

https://github.com/Sergey-Mironenko/Authentication-app/assets/106872008/3c8fbfeb-e3b5-4881-b600-d9edf79fa0d0

## Profile main page
- Shows loged user name.
- Alows to log out and navigate between profile pages.

https://github.com/Sergey-Mironenko/Authentication-app/assets/106872008/cfa783fe-3ecc-4300-8b79-d2ceab3fbd91

## Users list profile page
- Shows all activated users.
- Pagination is implemented.
- In case of error or no users shows appropriate message.

https://github.com/Sergey-Mironenko/Authentication-app/assets/106872008/1b349a46-2e64-4033-b3f8-19d157723a4c

## Rename profile page
- Asks to enter new name and makes a request to change it.
- In case of error shows appropriate message.
- Smoothly changes name in profile already after successfully change.

https://github.com/Sergey-Mironenko/Authentication-app/assets/106872008/f8eb4fba-9f7d-48d6-9882-3f69d9854f21

## Change email profile page
- Asks to enter users password and makes a verify request.
- Asks to enter new email and makes a request to check if it isn't used.
- Server sends one time password to new email and saves it to users cookies.
- After entering password from email makes a request to compare it with password from cookies.
- After confirmition server changes users email and notifies old email about changes.
- In case of error in any step shows appropriate message.

https://github.com/Sergey-Mironenko/Authentication-app/assets/106872008/e77b94aa-47b6-49e6-87bd-d2b0345ff762

## Change password profile page
- Asks to enter users password and makes a verify request.
- Asks to enter new password and repeat it, makes a request to check if it isn't the same as user using.
- Server changes users password.
- In case of error in any step shows appropriate message.

https://github.com/Sergey-Mironenko/Authentication-app/assets/106872008/bb888ac2-cfe1-4a88-bc9e-37d08414f3a1

## Delete account profile page
- Asks to enter `DELETE`.
- Makes request to server.
- Shows successfull message and logs user out in fiew seconds if everything is ok, or shows error message in case of error in response.

https://github.com/Sergey-Mironenko/Authentication-app/assets/106872008/bb888ac2-cfe1-4a88-bc9e-37d08414f3a1

# Reflections
Project goals included using technologies learned up until this point, familiarizing myself with documentation for new features and creating an application that replicates the design and functionality of programs from the 60s.

I ran into necessity to use new features, such as:
 - loaders
 - error boundaries
 - data fetching
 - creating custom middlewares
 - mailing
 - Another challenge was to implement troubleproof refresh funtionality.

 At the end of the day, I've figured out how to combine frontend and backend together in bigger project and what problems can be encountered in the process.
