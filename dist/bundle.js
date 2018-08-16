(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.nambiquara = {})));
}(this, (function (exports) { 'use strict';

    const makeHeader = () => `<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?>`;
    // tslint:disable
    const makeWorkbookOpenTag = () => `<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:c="urn:schemas-microsoft-com:office:component:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x2="http://schemas.microsoft.com/office/excel/2003/xml" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">`;
    // tslint:enable
    const makeWorkbookCloseTag = () => `</Workbook>`;
    const makeWorksheetOpenTag = () => `<ss:Worksheet ss:Name="Worksheet1">`;
    const makeWorksheetCloseTag = () => `</ss:Worksheet>`;
    const makeWorksheetOptionsTag = () => `<x:WorksheetOptions/>`;
    const makeTableOpenTag = () => `<Table>`;
    const makeTableCloseTag = () => `</Table>`;
    const makeRowOpenTag = () => `<Row>`;
    const makeRowCloseTag = () => `</Row>`;
    const makeCellOpenTag = () => `<Cell>`;
    const makeCellCloseTag = () => `</Cell>`;
    const makeTypeForValue = (value) => {
        switch (typeof value) {
            case 'string': return 'String';
            case 'number': return 'Number';
            default: return 'String';
        }
    };
    const makeDataOpenTag = (value) => `<Data ss:Type="${makeTypeForValue(value)}">`;
    const makeDataCloseTag = () => `</Data>`;
    const makeValue = (value) => value == null ? '' : value;
    const makeDataTag = (value) => `${makeDataOpenTag(value)}${makeValue(value)}${makeDataCloseTag()}`;
    const makeCellTag = (value) => `${makeCellOpenTag()}${makeDataTag(value)}${makeCellCloseTag()}`;
    const makeRow = (values) => `${makeRowOpenTag()}${values.map(makeCellTag).join('')}${makeRowCloseTag()}`;
    const makeRows = (values) => values.map(makeRow).join('');
    const makeTableTag = (values) => `${makeTableOpenTag()}${makeRows(values)}${makeTableCloseTag()}`;
    const makeWorksheet = (values) => [
        makeWorksheetOpenTag(),
        makeTableTag(values),
        makeWorksheetOptionsTag(),
        makeWorksheetCloseTag(),
    ].join('');
    const makeWorkBook = (values) => [
        makeWorkbookOpenTag(),
        makeWorksheet(values),
        makeWorkbookCloseTag(),
    ].join('');
    const makeSheet = (values) => [
        makeHeader(),
        makeWorkBook(values),
    ].join('');
    const fromArray = (values) => makeSheet(values);

    exports.fromArray = fromArray;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
