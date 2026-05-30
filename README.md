I will be solving a few problems every day and uploading the solutions to this repository.

YouTube channel: [https://www.youtube.com/@takeAjoyOfficial](https://www.youtube.com/@takeAjoyOfficial)

```
1 kyu: 0 Solutions published.
2 kyu: 0 Solutions published.
3 kyu: 0 Solutions published.
4 kyu: 0 Solutions published.
5 kyu: 0 Solutions published.
6 kyu: 16 Solutions published.
7 kyu: 0 Solutions published.
8 kyu: 0 Solutions published.
```

---

# How Can You Contribute?

## Repository Structure

The repository is organized like this:

```text
6 kyu/
└── Kata Name/
    ├── solution.js
    ├── solution_description.pdf
    └── test/
        └── solution.test.js
```

* `6 kyu` → difficulty folder
* `Kata Name` → kata-specific folder
* Inside the kata folder:

  * JavaScript solution file
  * PDF containing the kata description
  * `test` folder containing test cases

---

## Contribution Steps

### 1. Solve a JavaScript Kata

Choose any JavaScript kata and place it inside the appropriate difficulty folder.

Example:

```text
6 kyu/
7 kyu/
5 kyu/
```

If the difficulty folder does not exist yet, create it.

---

### 2. Create a Folder for the Kata

Inside the difficulty folder, create a new folder using the kata name.

Example:

```text
6 kyu/Array Diff/
```

---

### 3. Add Your JavaScript Solution

Create a JavaScript file named after the main solution function.

Example:

```text
arrayDiff.js
```

Make sure your solution is exported using:

```javascript
module.exports = arrayDiff;
```

---

### 4. Add Test Cases

Inside the kata folder, create a `test` folder.

Example:

```text
6 kyu/
└── Array Diff/
    ├── arrayDiff.js
    └── test/
        └── arrayDiff.test.js
```

After solving the problem, copy the test cases from the kata and add them inside the test file.

Make sure to import the solution correctly using `require`.

Example:

```javascript
const arrayDiff = require('../arrayDiff');
```

---

### 5. Save the Kata Description as PDF

Open the kata page and run the following code in the browser console:

```javascript
function printDiv(content) {
  const printWindow = window.open('', '', 'width=800,height=600');

  printWindow.document.write(`
    <html>
      <head>
        <title>Print</title>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}

const content = document.querySelector(
  '#shell_content > div.w-full.mt-2 > div.flex.flex-col.md\\:flex-row.md\\:space-x-4.md\\:space-y-0.md\\:space-x-4 > div.w-full.md\\:w-10\\/12.rounded-lg > div:nth-child(1)'
).innerHTML;

printDiv(content);
```

Save the generated PDF using the following naming format:

```text
<solution_file_name>_description.pdf
```

Example:

```text
arrayDiff_description.pdf
```

---

### 6. Create a Pull Request

Create a PR and wait for review.

---

## Notes

* Please keep the folder structure consistent.
* You can find test cases below the Description acccordion once you solve the problem.
* AI-assisted solutions are allowed, but original problem-solving effort is appreciated.

Thanks for contributing!
