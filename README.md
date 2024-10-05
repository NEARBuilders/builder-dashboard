<!-- markdownlint-disable MD014 -->
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->
<!-- markdownlint-disable MD029 -->

<div align="center">

<h1 style="font-size: 2.5rem; font-weight: bold;">Builder Dashboard</h1>

  <p>
    <strong>Homebase for Build DAO management</strong>
  </p>

</div>

<details>
  <summary>Table of Contents</summary>

- [Getting Started](#getting-started)
  - [Installing dependencies](#installing-dependencies)
  - [Running the app](#running-the-app)
  - [Building for production](#building-for-production)
  - [Running tests](#running-tests)
- [Contributing](#contributing)

</details>

## Getting Started

### Installing dependencies

```bash
pnpm install
```

### Running the app

First, run the development server:

```bash
pnpm run dev
```

### Building for production

```bash
pnpm run build
```

### Running tests

```bash
pnpm run test
```

See the full [testing guide](./playwright-tests/README.md).

## Project Structure

This project uses [@Kiranism](https://github.com/Kiranism)'s beauitful [react-shadcn-starter-dashboard](https://github.com/Kiranism/react-shadcn-dashboard-starter), which is built on the following stack:

- Js Library - [React 18](https://react.dev/)
- Language - [TypeScript](https://www.typescriptlang.org)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Shadcn-ui](https://ui.shadcn.com)
- Schema Validations - [Zod](https://zod.dev)
- Async state management - [Tanstack Query aka React Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- Tables - [Tanstack Tables](https://ui.shadcn.com/docs/components/data-table)
- Forms - [React Hook Form](https://ui.shadcn.com/docs/components/form)
- Linting - [ESLint](https://eslint.org)
- Formatting - [Prettier](https://prettier.io)
- Pre-commit hook - [Husky](https://typicode.github.io/husky/)

It also includes further integrations to connect to the [NEAR Protocol](https://near.org/):

- NEAR Client - [Naxios](https://github.com/wpdas/naxios)
- Wallet - [NEAR Wallet Selector](https://github.com/near/wallet-selector)

## Customizing

Common configurations have been abstracted to make customizing this dashboard for your own DAO as easy as possible.

### Colors

Modify :root (light) and :dark values in [index.css](./src/index.css) -- convert hex values into RGB and set the existing primary, secondary, accent, etc.

### Logos

Set the assets for logo-icon and logo-text in [assets](./src/assets/). Further configure by changing elements for specific variants (main-hero, mobile-sidebar, dashboard-sidebar, etc) in [components/dao](./src/components/dao).

### Fonts

Import the font at the top of [index.css](./src/index.css), then set the font-family to the font name.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you're interested in contributing to this project, please read the [contribution guide](./CONTRIBUTING).

<div align="right">
<a href="https://nearbuilders.org" target="_blank">
<img
  src="https://builders.mypinata.cloud/ipfs/QmWt1Nm47rypXFEamgeuadkvZendaUvAkcgJ3vtYf1rBFj"
  alt="Near Builders"
  height="40"
/>
</a>
</div>
