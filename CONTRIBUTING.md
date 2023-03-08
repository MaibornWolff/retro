# Contributing

Cool, that you are interested in contributing. We like pull request and suggestions from everyone.

If you are planning in making a major contribution we appreciate you opening an issue or contacting us.

Things that increase the chance that a pull request will be accepted:

    Write clean code.
    Write tests for your new code and regression tests after fixing a bug.
    Write a good commit message and include the issue number in the footer #123.
    Update the CHANGELOG.md with any changes/additions made

This project is bound by a Code of Conduct.
Naming conventions
Branching

## Branch Naming

Branch names consist of a type and the describing branch name itself, which is always lowercase separated by underscores. It follows this structure <type>/<issue-id>/<name>. For more detailed information check out the source Branch Types by CKSource

| Types    | Changelog | Description                                        |
| -------- | :-------: | -------------------------------------------------- |
| feature  |    yes    | New feature I add or expand                        |
| fix      |    yes    | Bug fix                                            |
| docs     |    yes    | Updated documentation                              |
| revert   |    yes    | Revert of some commit                              |
| refactor |    no     | Our beloved code style improvements / refactorings |
| tech     |    no     | Other kinds of technical changes                   |

Examples:

    feature/123/add_settings_option_xyz
    fix/124/solve_unecpected_settings_errors

## Commit Messages

Commit message follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) standard.

Please include the issue number in the commit messages footer.

To unify the appearance of all commit messages we only accept commit messages using the following principles:

### Structure

```
<type>: <description>

[optional body]

[optional footer]
```

### Examples

```
feat: add new function to do X

#123
```

```
refactor: change library X to Y

<more explanation on why or how the change has been implemented>

#123
```

Changelog Guidelines
Why do we write a changelog?

    A changelog is vital for the developers to keep track of their work. But most importantly now that it appears on every version update to every user, we should make sure that it is also user-friendly. And for that, we need guidelines to help us.

When should you add to the changelog file?

    You should always make sure that a changelog entry has been added before merging your work.

How should you format a changelog entry?

    [Description of what you changed] [Link to the pull request] [One picture (specify the width and/or height)]
    Example:
    - Description ([#1315](pull-request-link)) <br>
    ![image-size](image-ling)
    Please do not forget the _<br> at the end before the img tag (with a space). This breaks the two lines and is compatible with our parsers.

How to write a good description?

    The description should be precise and short to provide the user with all necessary information. If it is needed, add some precise notes about the usage of the new feature.
    One changelog entry should describe one change.
    Avoid writing technical descriptions
    Start with a verb in the present tense
        Example: Add, Improve, Enable, Allow, Switch...
        Don’t: this feature added the ability to enable dark mode
        Do: Add dark mode
    Avoid writing ambiguous descriptions
        Don’t: Fix some UI problems
        Do: Fix the distribution bar not showing correctly
    Write in terms of features. Focus on the "what" not the "how".
        Don’t: Minify JS and CSS
        Do: Make page load faster by reducing size of JavaScript and CSS files

Notes

    Link to the image can be copied from an image uploaded to the Pull Request
    If there are no Pull Requests associated to your change, link an issue.
    The image should always have a width and/or a height attribute.
        Example: width=”350px”
