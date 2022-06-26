const propertyValidator = (attribute: string, entity: Object): boolean => {
  const key = attribute as keyof typeof entity;
  return !!(entity.hasOwnProperty(key) && entity[key]);
};

export default propertyValidator;
