<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/tusharnagar17/chatify">
    
  </a>

  <h1 align="center"><a href="https://chatify-web.onrender.com">Chatify</a></h1>

  <p align="center">
    Chatify is a real-time web application for instant messaging, built with Socket.IO and Node.js. This application demonstrates the capabilities of WebSockets to facilitate live, bidirectional communication between users.
    <br />
    <a href="https://github.com/tusharnagar17/chatify"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/tusharnagar17/chatify">View Demo</a>
    ·
    <a href="https://github.com/tusharnagar17/chatify/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/tusharnagar17/chatify/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project :: [Check it out 🚀](https://chatify-web.onrender.com)

[![Product Name Screen Shot][fullscreen]](https://chatify-web.onrender.com)
[![Product Mobile][mobile]](https://chatify-web.onrender.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Features

- **Real-time Messaging with Socket.io :** Our application leverages Socket.io to enable real-time, bidirectional communication between clients and the server.

- **Built with TypeScript for Type Safety :** TypeScript enhances development efficiency and code quality by providing type safety, early error detection, and better tooling support. By catching type-related errors at compile time, we can reduce runtime errors and improve overall maintainability.

- **Styled with TailwindCSS :** TailwindCSS allows for rapid UI development with a highly customizable design system. Instead of writing custom CSS for each component, you can apply utility classes directly in your HTML, resulting in more readable and maintainable code.

- **RESTful API with Express :** The backend of our application is powered by Express, a minimalist and flexible Node.js web application framework.

- **Unit and Integration Testing with Jest :** We ensure code quality and reliability by implementing unit and integration tests using Jest. By implementing tests, we can catch bugs early, validate that our code behaves as expected, and maintain confidence in our codebase as it evolves.

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
- ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=skyblue)
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
- ![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)
- ![React.js]
- ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
- ![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- Nodejs
- MongoDB

## Installation

### First Method

1. Clone the repo
   ```sh
   git clone https://github.com/tusharnagar17/chatify.git
   ```
2. Rename env files from .env.example to .env

   ```sh
   mv client/.env.example public/.env

   mv server/.env.example server/.env
   ```

3. Install the dependencies

   ```js
   yarn run install:client

   yarn run install:server
   ```

4. Now just start the development server

- For Frontend

  ```
    yarn run dev:client
  ```

- For backend
  -- Open another terminal in folder. Also make sure mongodb is running in background.

  ```
    yarn run dev:server
  ```

5. Open http://localhost:3000 in your browser.

### Second Method

- This method required docker and docker-compose to be installed in your system.
- Make sure you are in the root of your project and run the following command

  ```
    docker compose build -f ./docker-compose-dev.yml --no-cache
  ```

- After the build is complete run the containers using the following command

  ```
    docker compose up -f ./docker-compose-dev.yml
  ```

- Open http://localhost:3000 in your browser.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

<!-- ROADMAP -->

## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
  - [ ] Chinese
  - [ ] Spanish

See the [open issues](https://github.com/tusharnagar17/chatify/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Tushar Nagar - [@tusharnagar17](https://x.com/tusharnagar_17)

Live Project Link: [https://chatify-web.onrender.com](https://chatify-web.onrender.com)

Project Link: [https://github.com/tusharnagar17/chatify](https://github.com/tusharnagar17/chatify)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

- [Choose an Open Source License](https://choosealicense.com)
- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
- [Malven's Grid Cheatsheet](https://grid.malven.co/)
- [Img Shields](https://shields.io)
- [GitHub Pages](https://pages.github.com)
- [Font Awesome](https://fontawesome.com)
- [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Node.js]: https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white
[Express.js]: https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white
[TailwindCSS]: https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white
[MongoDB]: https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white
[Socket.io]: https://img.shields.io/badge/Socket.io-010101?logo=socket.io&logoColor=white
[fullscreen]: /readme/fullscreen.JPG
[mobile]: /readme/mobile.jpg
