/*eslint-env node, es6*/

/* Module Description */

/* Put dependencies here */

/* Include this line only if you are going to use Canvas API */
const canvas = require('canvas-wrapper');
const asyncLib = require('async');

/* View available course object functions */
// https://github.com/byuitechops/d2l-to-canvas-conversion-tool/blob/master/documentation/classFunctions.md

module.exports = (course, stepCallback) => {
    setTimeout(() => {
        course.addModuleReport(`delete-questions-and-conversations`);

        // Get the discussion boards
        canvas.get(`/api/v1/courses/${course.info.canvasOU}/discussion_topics?search_term=Questions%20and%20Conversations`, (getErr, discussion_topics) => {
            if (getErr) {
                course.throwErr(`delete-questions-and-conversations`, getErr);
                return;
            }
            course.success(`delete-questions-and-conversations`, `Retrieved ${discussion_topics.length} discussion topics`);
            asyncLib.each(discussion_topics, (topic, callback) => {
                canvas.delete(`/api/v1/courses/${course.info.canvasOU}/discussion_topics/${topic.id}`, (deleteErr, result) => {
                    if (deleteErr) {
                        callback(deleteErr);
                        return;
                    }
                    course.success(`delete-questions-and-conversations`, `Deleted discussion topic: ${topic.title}`);
                    callback(null);
                });
            }, (eachErr) => {
                if (eachErr) {
                    course.throwErr(`delete-questions-and-conversations`, eachErr);
                    return;
                }
                course.success(`delete-questions-and-conversations`, `Finished deleting all discussion topics`);
                stepCallback(null, course);
            });
        });

    }, 10000);

};
