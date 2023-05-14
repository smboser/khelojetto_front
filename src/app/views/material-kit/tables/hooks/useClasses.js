Object.defineProperty(exports, '__esModule', { value: true });
exports.useClasses = void 0;
var react_1 = require('react');
var isObject = function (a) {
  return !!a && a.constructor === Object;
};
var getClassesFromObject = function (obj) {
  return Object.keys(obj)
    .filter(function (keyObj) {
      return typeof obj[keyObj] === 'boolean' ? obj[keyObj] : false;
    })
    .join(' ')
    .trim();
};
var useClasses = function (classesObj) {
  var _a = (0, react_1.useState)(''),
    classes = _a[0],
    setClasses = _a[1];
  (0, react_1.useEffect)(
    function () {
      if (Array.isArray(classesObj)) {
        setClasses(
          classesObj
            .map(function (item) {
              if (isObject(item)) {
                return getClassesFromObject(item);
              } else if (typeof item === 'string') {
                return item;
              } else {
                return '';
              }
            })
            .join(' ')
            .trim()
        );
      } else if (isObject(classesObj)) {
        setClasses(getClassesFromObject(classesObj));
      } else setClasses('');
    },
    [classesObj]
  );
  return classes;
};
exports.useClasses = useClasses;
