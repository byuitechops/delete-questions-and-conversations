/*eslint-env node, es6*/

/* Dependencies */
const tap = require('tap');
const canvas = require('canvas-wrapper');

function g1Tests(course, callback) {
    // Tap tests for Gauntlet 1 go here
<<<<<<< HEAD
    tap.pass('Success! Wheee! 1');
    // tap.fail('YOLO');
=======
    var topics = course.info.deletedDiscussionTopics.map(topic => topic.title);
    console.log(topics);
    tap.equals(true, topics.includes('L14 Questions and Conversations Awesome'));
    tap.equals(true, topics.includes('lesson 0328942349u9374892u34 questions and conversations'));
    tap.equals(false, topics.includes('Lesson 04 Question and Conversation'));
    tap.equals(true, topics.includes('l03 - questions and Conversations'));
    tap.equals(true, topics.includes('L02 - questions and conversations'));
    tap.equals(true, topics.includes('L01 - Questions and Conversations'));
>>>>>>> 321d50ffb4363656b8b9e7c8e7e24c7a5ae22d6c
    callback(null, course);
}

module.exports = [
        {
            gauntlet: 1,
            tests: g1Tests
        }
];
