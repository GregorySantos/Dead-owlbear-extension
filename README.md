# Dead

A simple [Owlbear Rodeo](https://www.owlbear.rodeo/) extension that lets you quickly mark tokens with a red X on the Characters layer.

## Install
In the Extensions menu, click the ⊕ "Add Custom Extension" button (top right) and paste:

```text
https://dead-owlbear-extension.gregcanela.workers.dev/manifest.json
```


![description](/usage-example.gif)

## Features

- Sidebar tool: **Dead**
- Keyboard shortcut: **C** activates the tool
- Clicking a character token toggles a red X
- The X follows the token when it is moved, rotated, or scaled
- The dead state is stored in token metadata and syncs with the scene
- Clicking the token again removes the X
- Hidden tokens cannot be marked, even if they're on the Characters layer, to prevent players from finding them accidentally (or otherwise).

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.



