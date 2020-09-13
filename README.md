# Hello, Deno! 🦕

Hi there, this repo is my tentative of studying Deno. It's a simple REST API without any database connected yet, all the data is read and written to a csv file. I'm building this API for an app that I'm developing and I decided to build it with Deno so I can learn something new at the same time.
It's been a very good experience so far. I'm impressed by how pleasant the developer experience has been, especially when it comes to dependency management.

The next steps are:

- Connect a MySQL database
- See what options form ORM are out there
- Build the CI/CD pipeline with Docker and AWS

## Usage

Make sure you have `deno` installed with version at least `1.4.0` which introduced the `--watch` flag and run:

```bash
deno run -c tsconfig.json --unstable --watch  --allow-net --allow-read --allow-write mod.ts
```
