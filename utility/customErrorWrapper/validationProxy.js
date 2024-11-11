const Joi = require('joi');

function extractValidationRules(schema) {
  const rules = {};

  for (const path in schema.paths) {
    const pathOptions = schema.paths[path].options;
    let rule = Joi.any(); 

    if (pathOptions.required) {
      rule = rule.required();
    }

    if (pathOptions.type === String) {
      rule = Joi.string();
      if (pathOptions.minlength) rule = rule.min(pathOptions.minlength); 
      if (pathOptions.maxlength) rule = rule.max(pathOptions.maxlength); 
      if (pathOptions.match) rule = rule.pattern(pathOptions.match);
    }

    if (pathOptions.type === Number) {
      rule = Joi.number(); 
      if (pathOptions.min) rule = rule.min(pathOptions.min); 
      if (pathOptions.max) rule = rule.max(pathOptions.max); 
    }

    if (pathOptions.type === Boolean) {
      rule = Joi.boolean();
    }

    if (pathOptions.type === Date) {
      rule = Joi.date();
    }

    if (pathOptions.type === Array) {
      rule = Joi.array();
      if (pathOptions.minlength) rule = rule.min(pathOptions.minlength); 
      if (pathOptions.maxlength) rule = rule.max(pathOptions.maxlength); 
    }

    if (pathOptions.type === Object) {
      rule = Joi.object();
    }

    if (pathOptions.enum) {
      rule = rule.valid(...pathOptions.enum); 
    }

    rules[path] = rule; 
  }


  return Joi.object(rules); 
}

module.exports = { extractValidationRules };

