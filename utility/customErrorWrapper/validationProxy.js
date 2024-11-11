/**
 * Extracts validation rules from a Mongoose schema object.
 *
 * @param {Object} schema - The Mongoose schema object containing path definitions.
 * @throws {Error} Throws an error if the schema object is invalid.
 * @returns {Object} An object containing validation rules for each path in the schema.
 *                   Each path includes properties like required, unique, match, min,
 *                   max, minlength, maxlength, and default.
 */
function extractValidationRules(schema) {
    if (!schema || !schema.paths) {
        throw new Error("Invalid schema object passed to extractValidationRules. Ensure that modelInstance.schema is valid.");
    }

    const rules = {};
    for (const path in schema.paths) {
        const pathOptions = schema.paths[path].options;

        rules[path] = {
            required: pathOptions.required,
            unique: pathOptions.unique,
            match: pathOptions.match,
            min: pathOptions.min,
            max: pathOptions.max,
            minlength: pathOptions.minlength,
            maxlength: pathOptions.maxlength,
            default: pathOptions.default,
        };
    }
    return rules;
}

module.exports = { extractValidationRules };
