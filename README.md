# Back Read

Challenge your brain in this reverse-reading game!
This is a WebXDC port of https://github.com/felladrin/js13k-2019

## Developing

### Installing Dependencies

After cloning this repo, install dependecies:

```
pnpm i
```

### Checking the code format

```
pnpm check
```

### Testing the app in the browser

To test your work in your browser (with hot reloading!) while developing:

```
pnpm dev-mini
# Alternatively to test in a more advanced WebXDC emulator:
pnpm dev
```

### Building

To package the WebXDC file:

```
pnpm build
```

The resulting optimized `.xdc` file is saved in `dist-xdc/` folder.

### Releasing

To automatically build and create a new GitHub release with the `.xdc` file:

```
git tag -a v1.0.1
git push origin v1.0.1
```
