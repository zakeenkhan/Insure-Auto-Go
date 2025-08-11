# Insure-Auto-Go

This is a full-stack application designed to streamline the process of obtaining and managing auto insurance. The platform connects users with insurance providers, allowing them to easily browse, compare, and purchase insurance plans.

## Live Demo

[Link to your live demo here]

## Screenshot

(Please add a screenshot of the application's main page here.)

![Application Screenshot](placeholder.png)

## How to Run the Project

To run this project locally, you will need to have Node.js and npm installed. Follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd Insure-Auto-Go
    ```

2.  **Start the Backend Server:**
    Open a terminal and navigate to the `Server` directory:
    ```bash
    cd Server
    npm install
    npm run start:dev
    ```
    The server will be running on `http://localhost:3000` (or as configured).

3.  **Start the Frontend Client:**
    Open a second terminal and navigate to the `Client` directory:
    ```bash
    cd Client
    npm install --legacy-peer-deps
    npm run dev -- -p 3001
    ```
    The client will be running on `http://localhost:3001`.

## Tools I Used for This Update

To update this `README.md` file, I used the following tools:

1.  `find_by_name`: To locate the `README.md` file and all the image files within the project.
2.  `list_dir`: To inspect the contents of the `Client` and `Server` directories.
3.  `view_file`: To attempt to read the contents of the `package.json` files and understand the project's dependencies and scripts.
4.  `run_command`: To install the dependencies for both the client and server, and to start the application.
5.  `command_status`: To check the status of the running application.
6.  `open_browser_url`: To open the application in a browser.
7.  `replace_file_content`: To update this `README.md` with the new information.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
