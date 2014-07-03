/**
 * @fileoverview Disallow mixed spaces and tabs for indentation
 * @author Jary Niebur
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    var smartTabs = context.options[0];

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        "Program": function(node) {
            /* 
             * At least one space followed by a tab
             * or the reverse before non-tab/-space 
             * characters begin.
             */
            var regex = /^(?=[\t ]*(\t | \t)).+$/mg;

            if (smartTabs) {
                /*
                 * At least one space followed by a tab 
                 * before non-tab/-space characters begin.
                 */
                regex = /^(?=[\t ]*( \t)).+$/mg;
            }

            var src = context.getSource(),
                lines,
                location,
                match;
            
            while ((match = regex.exec(src)) !== null) {
                lines = src.slice(0, regex.lastIndex).split(/\r?\n/g);

                location = {
                    line:   lines.length,
                    column: lines[lines.length - 1].length - match[0].length + 1
                };

                context.report(node, location, "Line " + (location.line) + " has mixed spaces and tabs.");
            }

        }

    };

};
