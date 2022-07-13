exports.id = "component---src-pages-nav-component-js";
exports.ids = ["component---src-pages-nav-component-js"];
exports.modules = {

/***/ "./src/pages/NavComponent.js":
/*!***********************************!*\
  !*** ./src/pages/NavComponent.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ navComponent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style.css */ "./src/style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_1__);


function navComponent(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", null, props.offlineData ? // offlineData.sort((a, b) => b.lastEdited + a.lastEdited).map((document) => {
  props.offlineData.map(document => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      // user settings get mapped over but the classname ternary hides them
      // maybe consider handling the data differently, but I don't see an issue with this
      // the scope of this project is very likely to increase, so on the off chance it does this can be reworked
      className: document.id === 'userSettings' ? "hidden" : "navItem" // className={"hidden"}
      ,
      key: document.id,
      onClick: () => props.selectDocumentAndSetCurrentEditorText(document.id, document.entry)
    }, document.entry ? document.entry : "okayyy", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, document.lastEdited ? document.lastEdited : "no edit"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      onClick: () => props.deleteDocument(document.id)
    }, "X"));
  }) : "unauthorizedData");
}

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ (() => {



/***/ })

};
;
//# sourceMappingURL=component---src-pages-nav-component-js.js.map