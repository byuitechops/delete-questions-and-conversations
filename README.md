# Delete Questions and Conversations
### *Package Name*: delete-questions-and-conversations
### *Child Type*: Post-Import
### *Platform*: Online
### *Required*: Required

This child module is built to be used by the Brigham Young University - Idaho D2L to Canvas Conversion Tool. It utilizes the standard `module.exports => (course, stepCallback)` signature and uses the Conversion Tool's standard logging functions. You can view extended documentation [here](https://github.com/byuitechops/d2l-to-canvas-conversion-tool/tree/master/documentation).

## Purpose

The main purpose of this child module is to go through the course and delete every Questions and Conversations Discussion Board from the course. This child
module catches almost every possible variations of Questions and Converstaions Discussion Board.

## How to Install

```
npm install delete-questions-and-conversations
```

## Run Requirements

None

## Options

None

## Outputs

None

## Process

Describe in steps how the module accomplishes its goals.

1. Retrieve all of the Discussion Boards in the course that has a similar title to "Questions and Conversations"
2. Go through the entire list and make a API call to Canvas to delete the discussion board.

## Log Categories

List the categories used in logging data in your module.

- Title/Canvas ID - Title: Deleted Discussion Boards

## Requirements

1. Ensure that the Questions and Conversations Discussion Boards are deleted from the course.