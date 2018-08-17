(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.nambiquara = {})));
}(this, (function (exports) { 'use strict';

    var makeHeader = function () { return "<?xml version=\"1.0\" encoding=\"UTF-8\"?><?mso-application progid=\"Excel.Sheet\"?>"; };
    // tslint:disable
    var makeWorkbookOpenTag = function () { return "<Workbook xmlns=\"urn:schemas-microsoft-com:office:spreadsheet\" xmlns:c=\"urn:schemas-microsoft-com:office:component:spreadsheet\" xmlns:html=\"http://www.w3.org/TR/REC-html40\" xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:ss=\"urn:schemas-microsoft-com:office:spreadsheet\" xmlns:x2=\"http://schemas.microsoft.com/office/excel/2003/xml\" xmlns:x=\"urn:schemas-microsoft-com:office:excel\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">"; };
    // tslint:enable
    var makeWorkbookCloseTag = function () { return "</Workbook>"; };
    var makeWorksheetOpenTag = function () { return "<ss:Worksheet ss:Name=\"Worksheet1\">"; };
    var makeWorksheetCloseTag = function () { return "</ss:Worksheet>"; };
    var makeWorksheetOptionsTag = function () { return "<x:WorksheetOptions/>"; };
    var makeTableOpenTag = function () { return "<Table>"; };
    var makeTableCloseTag = function () { return "</Table>"; };
    var makeRowOpenTag = function () { return "<Row>"; };
    var makeRowCloseTag = function () { return "</Row>"; };
    var makeCellOpenTag = function () { return "<Cell>"; };
    var makeCellCloseTag = function () { return "</Cell>"; };
    var makeTypeForValue = function (value) {
        switch (typeof value) {
            case 'string': return 'String';
            case 'number': return 'Number';
            default: return 'String';
        }
    };
    var makeDataOpenTag = function (value) { return "<Data ss:Type=\"" + makeTypeForValue(value) + "\">"; };
    var makeDataCloseTag = function () { return "</Data>"; };
    var makeValue = function (value) { return value == null ? '' : value; };
    var makeDataTag = function (value) { return "" + makeDataOpenTag(value) + makeValue(value) + makeDataCloseTag(); };
    var makeCellTag = function (value) { return "" + makeCellOpenTag() + makeDataTag(value) + makeCellCloseTag(); };
    var makeRow = function (values) { return "" + makeRowOpenTag() + values.map(makeCellTag).join('') + makeRowCloseTag(); };
    var makeRows = function (values) { return values.map(makeRow).join(''); };
    var makeTableTag = function (values) { return "" + makeTableOpenTag() + makeRows(values) + makeTableCloseTag(); };
    var makeWorksheet = function (values) { return [
        makeWorksheetOpenTag(),
        makeTableTag(values),
        makeWorksheetOptionsTag(),
        makeWorksheetCloseTag(),
    ].join(''); };
    var makeWorkBook = function (values) { return [
        makeWorkbookOpenTag(),
        makeWorksheet(values),
        makeWorkbookCloseTag(),
    ].join(''); };
    var makeSheet = function (values) { return [
        makeHeader(),
        makeWorkBook(values),
    ].join(''); };
    var fromArray = function (values) { return makeSheet(values); };

    exports.fromArray = fromArray;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
