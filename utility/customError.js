const { extractValidationRules } = require("./customErrorWrapper/validationProxy");

/**
 * Creates a Proxy around a Mongoose model instance to intercept and validate
 * property assignments before they are written to the model. This allows for
 * more fine-grained control over what data is allowed to be written to the
 * model and provides a way to throw errors if invalid data is provided.
 *
 * The validation is based on the schema of the model and is automatically
 * extracted from the model instance. The following validation rules are
 * supported:
 *
 * - required: Ensures that the property is not null or undefined.
 * - unique: Checks if a value already exists in the database for the given
 *   property. This is done by performing a query on the model with the given
 *   property as the filter.
 * - match: Checks if the value matches the given regex.
 * - minlength and maxlength: Checks if the value is within the given length
 *   constraints.
 *
 * Note that this validation is only done when assigning values to the model
 * properties. If the model is saved with the invalid data, the error will be
 * thrown at that point.
 *
 * @param {Object} modelInstance - The Mongoose model instance to validate.
 * @throws {Error} Throws an error if the model instance does not have a schema
 *   property.
 * @returns {Proxy} A Proxy around the model instance that intercepts property
 *   assignments and performs validation.
 */
const mongooseValidate = (modelInstance) => {
    
    if (!modelInstance || !modelInstance.schema) {
        throw new Error("Invalid model instance provided. Ensure modelInstance has a schema property.");
    }

    const validationRules = extractValidationRules(modelInstance.schema);

    // Use a Proxy to intercept property assignments
    return new Proxy(modelInstance, {
        set: async (target, props, value) => {
            const rule = validationRules[props];

            if (!rule) {
                target[props] = value;
                return true;
            }

            // Handle required validation
            if (rule.required && (value === undefined || value === null)) {
                throw new CustomError(`property ${props} is required`);
            }

            // Unique validation
            if (rule.unique && value) {
                const modelName = target.constructor.modelName;
                const existing = await mongoose.model(modelName).findOne({ [props]: value });
                if (existing) {
                    throw new CustomError(`property ${props} already exists`);
                }
            }

            // Regex match validation
            if (rule.match && !rule.match.test(value)) {
                throw new CustomError(`property ${props} is not valid`);
            }

            // Length validations
            if (rule.minlength && value.length < rule.minlength) {
                throw new CustomError(`property ${props} should be at least ${rule.minlength} characters long`);
            }
            
            if (rule.maxlength && value.length > rule.maxlength) {
                throw new CustomError(`property ${props} should be at most ${rule.maxlength} characters long`);
            }

            // Assign the value if all validations pass
            target[props] = value;
            return true;
        }
    });
};

module.exports = mongooseValidate;
