# Repository Conventions

## Filenames

In general all filenames should be in lowercase and have the "`-`" character as a substitute for whitespace. For example:

Correct filename:

    myfilename-example.txt

Incorrect filename:

    MyFileName Example.txt

## Commits

Every commit to this repository **_should_** have the below format to maintain consistency and readability. (Though this can be excused in exceptional circumstances)

### General format

`[feature]: [operation] [brief description in present tense]`

### Operations

| Operation Name | Description                                     | Shorthand |
| -------------- | ----------------------------------------------- | --------- |
| `add`          | Added a file / feature                          | `add`     |
| `remove`       | Removed a file / feature                        | `rem`     |
| `fix`          | Corrected an error in the code                  | `fix`     |
| `document`     | Added documentation to code                     | `doc`     |
| `refactor`     | Improved code structure                         | `ref`     |
| `testing`      | Added tests to the code                         | `tst`     |
| `tweak`        | Modifed a value to closer meet the requirements | `twk`     |
| `style`        | Code Formatting                                 | `sty`     |
| `chore`        | No production code change                       | `chr`     |

## Branches & Merging

- `deploy` (Where the production version is stored)
- `dev` (Where working version is stored)
- `feature/[feature-name]` (Where new features are stored, Squash merge is used when merging into `dev`)
