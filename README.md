<!-- Improved compatibility of back to top link -->

<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="center"> 
  <img src="public/logo.svg" alt="Logo" width="80" height="80"> 
  <h3 align="center">Digital Event Manager</h3>

  <p align="center">
    Add events and stay up to date with the shipping forecast   
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#overview">Overview</a> </li>      
    <li><a href="#technologies-used">Technologies Used</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#run-the-application">Run the Application</a></li>
    <li><a href="#api-information">API Information</a></li>
    <li><a href="#testing">Testing </a></li>
    <li><a href="#contribution">Contribution</a></li>
    <li><a href="#license">License</a></li>  
     <li><a href="#change-log">Change Log</a></li> 
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## Overview

<div align="center">

[![Product Name Screen Shot][product-screenshot]](https://dem.pg.com/)

</div>

Digital Event Manager - web front interface to integrate with multiple sources and update CPF data

Here's why:

- Secure access based on user level authorizations :smile:
- Drive actionable insights from One stop shop for data from multiple systems :smile:
- Frontend capability to input data manually or upload via templates :smile:
- Approve / Reject / Edit CPF data, and upload back to CPF :smile:
- Compare past vs present data extracts :smile:
- Visual charts and tables to drive action from users :smile:

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Technologies used -->

## Technologies Used

This section should list any major frameworks/libraries used to bootstrap your project.

| **Details**             | **Frameworks/Libraries:**                                                                                                                                               |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend Framework:** | [![React][React.js]][React-url]                                                                                                                                         |
| **Languages:**          | [![JavaScript][JavaScript]][JavaScript-url]                                                                                                                             |
| **State Management:**   | [![Redux Toolkit][Redux Toolkit]][Redux-Toolkit-url]                                                                                                                    |
| **Authentication:**     | [![Azure MSAL React][Azure MSAL React]][Azure-MSAL-React-url]                                                                                                           |
| **Styling:**            | [![Sass][Sass]][Sass-url] [![Material UI][Material UI]][Material-url] [![Tailwind CSS][Tailwind CSS]][Tailwind-url]                                                     |
| **Icons:**              | [![MUI Icons][MUI Icons]][MUI-Icons-url]                                                                                                                                |
| **Build Tool:**         | [![Webpack][Webpack]][Webpack-url]                                                                                                                                      |
| **Testing:**            | [![Jest][Jest]][Jest-url] [![React Testing Library][React Testing Library]][React-Testing-Library-url]                                                                  |
| **Version Control:**    | [![Git][Git]][Git-url]                                                                                                                                                  |
| **Libraries:**          | [![Material React Table][Material React Table]][Material-React-Table-url] [![React Hook Form][React Hook Form]][React-Hook-Form-url] [![Moment][Moment.js]][Moment-url] |
| **Others:**             | [![Axios][Axios]][Axios-url] [![Prettier][Prettier]][Prettier-url] [![ESLint][ESLint]][ESLint-url] [![SonarLint][SonarLint]][SonarLint-url]                             |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Instructions on setting up project locally.
To get a local copy up and running follow these simple steps.

### Prerequisites

Required softwares or tools should be listed here:

- **Node.js** (v20.x or higher)
- **React.js** (v18.x)
- **npm**
- **Visual Studio Code (VSCode)** as the preferred code editor

### Installation

_Steps to install dependencies and set up the project locally:_

1. Clone the repository
   ```sh
   git clone https://github.com/procter-gamble/DEM_UI.git
   ```
2. Navigate to the project directory
   ```sh
   cd DEM_UI
   ```
3. Install dependencies
   ```sh
   npm install
   ```
4. Create `.env` file for API/ENV details
   ```js
   REACT_APP_BASE_API_URL = 'Enter API Base URL';
   REACT_APP_CLIENT_ID = 'Enter App Client ID';
   REACT_APP_TENANT_ID = 'Enter APP Tenant ID';
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Run the Application

### Development Environment

_Commands for running the application in the development environment:_

1. Start the development server
   ```sh
   npm start
   ```

This will run the app in development mode and open it in your default browser at http://localhost:3000.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- API Information -->

## API Information

- [x] Add base URL in .env file
- [x] API endpoints require authentication. The API uses token-based authentication
- [x] Use `apiUtils.js` for the Api calls.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Testing Information -->

## Testing

_Instructions for running tests and test coverage reports:_

1. Run unit tests with coverage
   ```sh
   npm test
   ```
   <p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- contribution -->

## Contribution

_Guidelines for contributing to the project:_

1. Fork the repository
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
6. Include any coding standards or guidelines, such as ESLint rules or formatting conventions.

### Top Contributors

We want to thank all the amazing contributors to this project. Here’s a list of the top contributors:

You can view the full list of contributors [here](https://github.com/procter-gamble/DEM_UI/graphs/contributors).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- License -->

## License

See `LICENSE.txt` for more information.

<!-- CHANGE LOG -->

## Change Log

See `CHANGELOG.md` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[product-screenshot]: public/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Material UI]: https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=mui&logoColor=white
[Material-url]: https://mui.com/material-ui/
[Tailwind CSS]: https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Sass]: https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white
[Sass-url]: https://sass-lang.com/
[Material React Table]: https://img.shields.io/badge/Material--React--Table-0081CB?style=for-the-badge&logo=mui&logoColor=white
[Material-React-Table-url]: https://www.material-react-table.com/
[React Hook Form]: https://img.shields.io/badge/React--Hook--Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white
[React-Hook-Form-url]: https://www.react-hook-form.com/
[Moment.js]: https://img.shields.io/badge/Moment.js-FF8300?style=for-the-badge&logo=moment&logoColor=white
[Moment-url]: https://www.npmjs.com/package/moment
[Redux Toolkit]: https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white
[Redux-Toolkit-url]: https://redux-toolkit.js.org/
[JavaScript]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[Axios]: https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white
[Axios-url]: https://www.npmjs.com/package/axios/
[Webpack]: https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black
[Webpack-url]: https://www.npmjs.com/package/webpack/
[Jest]: https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white
[Jest-url]: https://jestjs.io/
[React Testing Library]: https://img.shields.io/badge/React--Testing--Library-E33332?style=for-the-badge&logo=testing-library&logoColor=white
[React-Testing-Library-url]: https://testing-library.com/docs/react-testing-library/intro/
[ESLint]: https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white
[ESLint-url]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[SonarLint]: https://img.shields.io/badge/SonarLint-CB2029?style=for-the-badge&logo=sonarlint&logoColor=white
[SonarLint-url]: https://marketplace.visualstudio.com/items?itemName=SonarSource.SonarLintforVisualStudio2022
[Prettier]: https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white
[Prettier-url]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
[Git]: https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white
[Git-url]: https://git-scm.com/
[MUI Icons]: https://img.shields.io/badge/MUI_Icons-0081CB?style=for-the-badge&logo=mui&logoColor=white
[MUI-Icons-url]: https://mui.com/material-ui/material-icons/
[Azure MSAL React]: https://img.shields.io/badge/Azure_MSAL_React-0078D4?style=for-the-badge&logo=microsoft&logoColor=white
[Azure-MSAL-React-url]: https://www.npmjs.com/package/@azure/msal-react
