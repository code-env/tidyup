# dir-tidy

**dir-tidy** is a simple command-line tool that organizes files in a specified directory into categorized subfolders based on their file types. It ensures your directories stay clean and organized, saving you the hassle of manually sorting files.

## Features

- Automatically categorizes files into subfolders (e.g., images, videos, documents).
- Handles file naming conflicts by appending a counter to duplicate filenames.
- Supports a variety of file types with customizable mappings.
- Provides a detailed summary of the organization process.

---

## Installation

First, make sure you have Node.js installed on your machine.

1. Install `dir-tidy` globally from npm:

   ```bash
   npm install -g dir-tidy
   ```

2. Verify the installation:

   ```bash
   dir-tidy --version
   ```

---

## Usage

Run the `dir-tidy` command, providing the path to the directory you want to organize.

```bash
dir-tidy <directory-path>
```

### Example

```bash
dir-tidy /home/user/Downloads
```

### Output

The tool organizes files in the specified directory into subfolders such as `images-png`, `videos-mp4`, `documents-pdf`, etc., and provides a summary like this:

```
Organization Summary for '/home/user/Downloads':
- Folder: images-png
  - Created
  - Files added: 3
- Folder: videos-mp4
  - Already existed
  - Files added: 2
- Folder: others-zip
  - Created
  - Files added: 1
```

---

## Supported File Types

| File Extension | Folder Name     |
| -------------- | --------------- |
| `.png`         | `images-png`    |
| `.jpg`         | `images-jpg`    |
| `.jpeg`        | `images-jpeg`   |
| `.mp4`         | `videos-mp4`    |
| `.avi`         | `videos-avi`    |
| `.pdf`         | `documents-pdf` |

Other file types are moved to a folder named `others-<extension>`.

---

## Error Handling

If the directory path provided is invalid or not a directory, `dir-tidy` will show an error:

```bash
The provided path is not a directory: /invalid/path
```

Make sure the directory exists and is accessible.

---

## Development

1. Clone the repository:

   ```bash
   git clone https://github.com/code-env/tidyup.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:

   ```bash
   npm run build
   ```

4. Test locally:

   ```bash
   node ./dist/index.js <directory-path>
   ```

---

## Contributing

Contributions are welcome! If you'd like to add new features or improve the project:

- Fork the repository
- Create a new branch for your changes
- Submit a pull request

---

## License

This project is licensed under the **ISC License**. See the LICENSE file for more details.

---

## Author

**dir-tidy** is developed and maintained by [bossadizenith](https://github.com/code-env).

Happy organizing! 🚀
