/*eslint-env node, es6*/

/* Module Description */

/* Put dependencies here */

/* Include this line only if you are going to use Canvas API */
const canvas = require('canvas-wrapper');
const asyncLib = require('async');

/* View available course object functions */
// https://github.com/byuitechops/d2l-to-canvas-conversion-tool/blob/master/documentation/classFunctions.md

module.exports = (course, stepCallback) => {
    // setTimeout(() => {
    //     course.addModuleReport(`delete-questions-and-conversations`);
    //
    //     // Get the discussion boards
    //     canvas.get(`/api/v1/courses/${course.info.canvasOU}/discussion_topics?search_term=Questions%20and%20Conversations`, (getErr, discussion_topics) => {
    //         if (getErr) {
    //             course.throwErr(`delete-questions-and-conversations`, getErr);
    //             return;
    //         }
    //         course.success(`delete-questions-and-conversations`, `Retrieved ${discussion_topics.length} discussion topics`);
    //         asyncLib.each(discussion_topics, (topic, callback) => {
    //             canvas.delete(`/api/v1/courses/${course.info.canvasOU}/discussion_topics/${topic.id}`, (deleteErr, result) => {
    //                 if (deleteErr) {
    //                     callback(deleteErr);
    //                     return;
    //                 }
    //                 course.success(`delete-questions-and-conversations`, `Deleted discussion topic: ${topic.title}`);
    //                 callback(null);
    //             });
    //         }, (eachErr) => {
    //             if (eachErr) {
    //                 course.throwErr(`delete-questions-and-conversations`, eachErr);
    //                 return;
    //             }
    //             course.success(`delete-questions-and-conversations`, `Finished deleting all discussion topics`);
    //             stepCallback(null, course);
    //         });
    //     });
    //
    // }, 10000);


    // Start of waterfall phase


    function getQCBoards(functionCallback) {
        course.addModuleReport(`delete-questions-and-conversations`);

        canvas.get(`/api/v1/courses/${course.info.canvasOU}/discussion_topics?search_term=Questions%20and%20Conversations`, (getErr, discussion_topics) => {
            if (getErr) {
                course.throwErr(getErr);
                return;
            }

            course.success(`delete-questions-and-conversations`, `Successfully retrieved ${discussion_topics.length} Questions and Conversations topics`);
            functionCallback(null, discussion_topics);
        });
    }

    function deleteQCBoards(discussion_topics, functionCallback) {
        asyncLib.each(discussion_topics, (topic, eachCallback) => {
            canvas.delete(`/api/v1/courses/${course.info.canvasOU}/discussion_topics/${topic.id}`, (deleteErr, results) => {
                if (deleteErr) return eachCallback(deleteErr);

                course.success(`delete-questions-and-conversations`, `Deleted Discussion Board: ${topic.id}`);
                eachCallback(null);
            })
        }, (eachErr) => {
            if (eachErr) return course.throwErr(`delete-questions-and-conversations`, eachErr);

            course.success(`delete-questions-and-conversations`, `Successfully deleted all Questions and Conversations topics`);
            functionCallback(null);
        });
    }

    var functions = [
        getQCBoards,
        deleteQCBoards
    ];

    setTimeout(() => {
        asyncLib.waterfall(functions, (waterfallErr, results) => {
            if (waterfallErr) return course.throwErr(`delete-questions-and-conversations`, waterfallErr);

            stepCallback(null, course);
        });
    }, 10000);
};
