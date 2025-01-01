# Tidyup

**tidyup** is a powerful command-line tool that organizes files in a specified directory into categorized subfolders. It offers multiple options to customize the organization process, ensuring your directories remain clean and structured.

---

## Features

- Organizes files into subfolders by:
  - **File Extensions** (e.g., `mp4`, `pdf`).
  - **Starting Names** (e.g., `project-a`, `report`).
  - **Creation Dates** (e.g., `2024-12-24`).
- Handles file naming conflicts automatically.
- Provides a detailed summary of the organization process.
- Compatible with Windows, macOS, and Linux.

---

## Installation

First, ensure you have Node.js installed on your system.

1. Install `tidyup` globally via npm:

   ```bash
   npm install -g tidyup
   ```

2. Verify the installation:

   ```bash
   tidyup --version
   ```

---

## Usage

Run the `tidyup` command, specifying the directory to organize and the desired options.

```bash
tidyup [directory] [options]
```

If no directory is specified, the current directory (`.`) is used by default.

### Options

- `--ext`: Organize files into folders based on their **file extensions**.
- `--name`: Group files by their **starting names**.
- `--date`: Group files by their **creation dates**.
- `--ignore-dotfiles`: Ignore dotfiles when organizing.

> **Note**: Some of these options cannot be used together. For example, you cannot use `--ext` and `--name` simultaneously, but you can use `--ignore-dotfiles` with any one other option.

---

## Examples

### Organize by File Extensions

```bash
tidyup /path/to/directory --ext
```

Example output:

```
Organization Summary for '/path/to/directory':
- Folder: mp4
  - Created
  - Files added: 3
- Folder: pdf
  - Already existed
  - Files added: 1
```

### Group Files by Starting Names

```bash
tidyup /path/to/directory --name
```

Example output:

```
Organization Summary for '/path/to/directory':
- Folder: project-a
  - Created
  - Files added: 4
- Folder: report
  - Already existed
  - Files added: 2
```

### Organize by Creation Dates

```bash
tidyup /path/to/directory --date
```

Example output:

```
Organization Summary for '/path/to/directory':
- Folder: 2024-12-23
  - Created
  - Files added: 2
- Folder: 2024-12-24
  - Already existed
  - Files added: 3
```

### Organize by Name and Ignore Dotfiles
```bash
tidyup /path/to/directory --name --ignore-dotfiles
```

Example output:

```
Organization Summary for '/path/to/directory':
- Folder: project-a
  - Created
  - Files added: 4
- Folder: report
  - Already existed
  - Files added: 2
```

### Invalid Option Combination

```bash
tidyup /path/to/directory --ext --name
```

Error output:

```
The --ext, --name, and --date options cannot be used together.
```

---

## Development

1. Clone the repository:

   ```bash
   git clone https://github.com/code-env/tidyup.git
   ```

2. Navigate to the project directory:

   ```bash
   cd tidyup
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Build the project:

   ```bash
   npm run build
   ```

5. Test locally:

   ```bash
   node ./dist/index.js <directory> [options]
   ```

---

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with your changes.

---

## License

This project is licensed under the **ISC License**. See the LICENSE file for more details.

---

## Author

**tidyup** is developed and maintained by [Bossadi Zenith](https://github.com/code-env).

---

Happy organizing! 🎉

Let me know if this aligns with your requirements or needs further customization.
