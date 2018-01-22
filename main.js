/*eslint-env node, es6*/

/* Module Description:
 * This child module goes through the course and creates an array full of
 * Questions and Conversations Discussion Board topics. After creating the
 * array, it then goes through and deletes them from the course.
 */

/* Include this line only if you are going to use Canvas API */
const canvas = require('canvas-wrapper');
const asyncLib = require('async');

module.exports = (course, stepCallback) => {
  //retrieve Questions and Conversations discussion boards
  function getQCBoards(functionCallback) {

        //make api call to get all Q&C DBs. Returns with an array of the Q&C DB topics
        canvas.get(`/api/v1/courses/${course.info.canvasOU}/discussion_topics?search_term=Questions%20and%20Conversations`, (getErr, discussion_topics) => {
            if (getErr) {
                course.error(getErr);
                return;
            }

            course.message(`Successfully retrieved ${discussion_topics.length} Questions and Conversations topics`);
            functionCallback(null, discussion_topics);
        });
    }

    //delete Q&C DBs
    function deleteQCBoards(discussion_topics, functionCallback) {
        //go through each D&B and delete them
        asyncLib.each(discussion_topics, (topic, eachCallback) => {
            //delete the discussion board topic and display success message if it works
            canvas.delete(`/api/v1/courses/${course.info.canvasOU}/discussion_topics/${topic.id}`, (deleteErr, results) => {
                if (deleteErr) return eachCallback(deleteErr);

                //create an object with title and id of the Q&C DB topic
                course.info.deletedDiscussionTopics.push({title: topic.title, id: topic.id});
                course.log('Deleted Discussion Boards', {
                    'Title': topic.title,
                    'Canvas ID': topic.id
                });
                eachCallback(null);
            })
        }, (eachErr) => {
            if (eachErr) {
                course.error(eachErr);
                return;
            }

            course.message(`Successfully deleted all Questions and Conversations topics`);
            functionCallback(null);
        });
    }

    var functions = [
        getQCBoards,     //retrieve Questions and Conversations discussion boards
        deleteQCBoards   //delete Q&C DBs
    ];

    course.newInfo('deletedDiscussionTopics', []);

    setTimeout(() => {
        asyncLib.waterfall(functions, (waterfallErr, results) => {
            if (waterfallErr) {
                course.error(waterfallErr);
                return;
            }

            stepCallback(null, course);
        });
    }, 10000); //Set to 10 seconds to allow all data to transfer properly before execution
};
