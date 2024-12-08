# node-red-contrib-better-webdav

A collection of nodes to manage WebDAV with Node-RED.

<br/>
<p align="center">
  <a href="https://www.npmjs.com/package/@keload/node-red-dxp" aria-label="Build with node-red-dxp">
    <img src="https://img.shields.io/badge/Build%20with-node--red--dxp-blue?style=for-the-badge" alt="Build with node-red-dxp">
  </a>
</p>
<p align="center">
    <a href="https://github.com/clement-berard/node-red-contrib-better-webdav/graphs/contributors">
        <img src="https://img.shields.io/github/contributors/clement-berard/node-red-contrib-better-webdav.svg?style=for-the-badge" alt="Contributors">
    </a>
    <a href="https://github.com/clement-berard/node-red-contrib-better-webdav/network/members">
        <img src="https://img.shields.io/github/forks/clement-berard/node-red-contrib-better-webdav.svg?style=for-the-badge" alt="Forks">
    </a>
    <a href="https://github.com/clement-berard/node-red-contrib-better-webdav/stargazers">
        <img src="https://img.shields.io/github/stars/clement-berard/node-red-contrib-better-webdav.svg?style=for-the-badge" alt="Stargazers">
    </a>
    <a href="https://github.com/clement-berard/node-red-contrib-better-webdav/issues">
        <img src="https://img.shields.io/github/issues/clement-berard/node-red-contrib-better-webdav.svg?style=for-the-badge" alt="Issues">
    </a>
</p>
<p align="center">
  <a aria-label="NPM Version" href="https://www.npmjs.com/package/@keload/node-red-contrib-better-webdav">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@keload/node-red-contrib-better-webdav.svg?label=NPM&logo=npm&style=for-the-badge&color=0470FF&logoColor=white">
  </a>
  <a aria-label="NPM Download Count" href="https://www.npmjs.com/package/@keload/node-red-contrib-better-webdav">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dt/@keload/node-red-contrib-better-webdav?label=Downloads&style=for-the-badge&color=67ACF3">
  </a>
</p>

## Disclaimer

This package is largely inspired by the excellent [node-red-node-webdav](https://flows.nodered.org/node/node-red-node-webdav) package 💪

However, I needed additional features not available in the existing package. As a result, I decided to create my own.

This isn't intended to replace the existing library. It was also a personal project to help me practice building Node-RED nodes, explore how to create them in TypeScript, and deepen my understanding of the process.

There's no pretense that this is better than the original package—just a different approach for specific needs and learning purposes.

## Features

All actions use the same node, you just need to change the action in the node configuration or use entry property.

Many feature are missing, but the package is growing. Here is the list of the current features:

### `createDirectory`
### `deleteFile`
### `exists`
### `getDirectoryContents`
### `getFileContents`

## Roadmap

- [ ] implement all https://www.npmjs.com/package/webdav

## Contributing

This package use [node-red-dxp](https://www.npmjs.com/package/@keload/node-red-dxp) to build the package.
A crazy fast and easy way to build Node-RED package.

Please feel free to contribute to this package by creating issues or pull requests.

## License

MIT
