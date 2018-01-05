# All Password Generator

This is an off-line password generation application. This program features various password generation algorithms. The goal of this program is to provide a collection of different methods of generating passwords while providing feedback to the user as to the strength of the generated password. This program will be updated continuously as more algorthims are included.

Many algorithms will be the product of information / examples found on the internet. When possible, I will attempt to provide references as well as credit to the authors of these algorithms. If you suspect that I have included an algorithm without giving you credit, or feel my inclusion of an algorithm violates and rights, please notify me. It is not my intention to take credit for your work.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

[Node.js](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
```
Yarn (Optional)
npm install -g yarn
```

### Installing

A step by step series of examples that tell you have to get a development env running

Install npm modules

```
yarn install
```

Running

```
yarn start
or
yarn build
```

## Built With

* [Electron Forge](https://electronforge.io/) - The tool used for rapid Electron development
* [Electron](https://electronjs.org/) - A javascript application framework
* [Blueprint](http://blueprintjs.com/) - A React-based UI toolkit
* [React](https://reactjs.org/) - A JavaScript library for building user interfaces

## Authors

* **Robert Tenney** - *Initial work* - [TenneySoftware](http://www.tenneysoftware.com/)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

TBD

<!-- This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details -->

## Acknowledgments

* [Project Nayuki](https://www.nayuki.io/page/random-password-generator-javascript) - Random password algorithm example
* [Tom Van Vleck](http://multicians.org/thvv/gpw-js.html) - Pronounceable password algorithm example
* [Munged password - Wikipedia](https://en.wikipedia.org/wiki/Munged_password) - Symbol replacement (munged) algorithm description
* [Aha-Soft](https://www.iconfinder.com/aha-soft) - File icon <img style="width: 16px; height: 16px;" src="data:image/png;base64,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"> [Creative Commons (Attribution 3.0 Unported)](http://creativecommons.org/licenses/by/3.0/) found [here](https://www.iconfinder.com/icons/128427/antivirus_guard_locked_password_privacy_private_protect_protection_safe_secure_security_shield_icon#size=64).