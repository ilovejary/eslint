/**
 * @fileoverview Rule to check for max length on a line.
 * @author Matt DuVall <http://www.mattduvall.com>
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    /**
     * Creates a string that is made up of repeating a given string a certain
     * number of times. This uses exponentiation of squares to achieve significant
     * performance gains over the more traditional implementation of such
     * functionality.
     * @param {string} str The string to repeat.
     * @param {int} num The number of times to repeat the string.
     * @returns {string} The created string.
     * @private
     */
    function stringRepeat(str, num) {
        var result = "";
        for (num |= 0; num > 0; num >>>= 1, str += str) {
            if (num & 1) {
                result += str;
            }
        }
        return result;
    }

    var tabWidth = context.options[1];

    var maxLength = context.options[0],
        tabString = stringRepeat(" ", tabWidth);

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------
    function checkProgramForMaxLength(node) {
        var src = context.getSource().replace(/\t/g, tabString),
            regexStr = "^.{" + (maxLength + 1) + ",}$",
            regex = new RegExp(regexStr, "mg"),
            lines,
            location;

        while ((regex.exec(src)) !== null) {
            lines = src.slice(0, regex.lastIndex).split(/\r?\n/g);

            location = {
                line:   lines.length
            };

            context.report(node, location, "Line " + lines.length + " exceeds the maximum line length of " + maxLength + ".");
        }

        // Esprima does not include leading whitespace on the first line, this
        // sets the initial range to 80 for getSource
        //node.range[0] = 0;
        //var lines = context.getSource(node) || "";  // necessary for backwards compat

        // Replace the tabs
        // Split (honors line-ending)
        // Iterate
        //lines
        //    .replace(/\t/g, tabString)
        //    .split(/\r?\n/)
        //   .forEach(function(line, i){
        //        if (line.length > maxLength) {
        //            context.report(node, { line: i + 1, col: 1 }, "Line " + (i + 1) + " exceeds the maximum line length of " + maxLength + ".");
        //        }
        //    });
    }


    //--------------------------------------------------------------------------
    // Public API
    //--------------------------------------------------------------------------

    return {
        "Program": checkProgramForMaxLength
    };

};
