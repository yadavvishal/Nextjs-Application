# My Next.js API Project

This project is a simple Next.js API that provides various endpoints for working with employee data. Below are the steps to run the service and examples of how to use the API endpoints.

## Prerequisites

- Node.js and npm (Node Package Manager) should be installed on your computer.

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/your-nextjs-api.git
   cd your-nextjs-api
   ```

## Install project dependencies:

    npm install

## Start the development server:

    npm run dev
    The API will be accessible at http://localhost:3000.

## API Endpoints

## Fetch Sum of Salaries for the Entire Dataset

- Endpoint: /api/v1/dataset
- Method: GET


    Example

- http://localhost:3000/api/v1/dataset

## Fetch Sum of Salaries for Records with "on_contract" Set to "true"

- Endpoint: /api/v1/dataset/on-contract
- Method: GET


    Example
    - http://localhost:3000/api/v1/dataset/on-contract

    ## Fetch Sum of Salaries for Each Department
    - Endpoint: /api/v1/dataset/department
    - Method: GET

    Example
    - http://localhost:3000/api/v1/dataset/department

    ## Fetch Sum of Salaries for Each Department and Sub-Department Combination
    - Endpoint: /api/v1/dataset/department-sub-department
    - Method: GET

    Example
    - http://localhost:3000/api/v1/dataset/department-sub-department
