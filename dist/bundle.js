(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.nambiquara = {})));
}(this, (function (exports) { 'use strict';

    var makeTag = function (tag) {
        var name = tag.name, children = tag.children, _a = tag.props, props = _a === void 0 ? {} : _a;
        var params = makeParams(props);
        var head = "<" + name + (params.length > 0 ? ' ' + params : '');
        var childrenToRender = [];
        if (children == null) {
            return head + "/>";
        }
        if (Array.isArray(children)) {
            children.map(function (child) { return childrenToRender.push(child); });
        }
        else {
            childrenToRender.push(children);
        }
        return head + ">" + childrenToRender.join('') + "</" + name + ">";
    };
    var makeParams = function (props) {
        var params = [];
        for (var prop in props) {
            if (props[prop] === undefined) {
                continue;
            }
            if (typeof props[prop] === 'string') {
                params.push(prop + "=\"" + props[prop] + "\"");
                continue;
            }
            params.push(prop + "=\"" + JSON.stringify(props[prop]) + "\"");
        }
        return params.join(' ');
    };

    var makeStyles = function (params) {
        if (params === void 0) { params = []; }
        var styles = params.map(function (param) {
            var props = translateStyleParams(param);
            var children = [makeFontTag(param), makeInteriorTag(param)];
            return makeTag({ name: 'Style', props: props, children: children });
        });
        return makeTag({ name: 'Styles', children: styles });
    };
    var makeFontTag = function (params) {
        var props = translateFontParams(params.font || {});
        return makeTag({ name: 'Font', props: props });
    };
    var makeInteriorTag = function (params) { return makeTag({
        name: 'Interior', props: {
            'ss:Color': params.background || '',
            'ss:Pattern': 'Solid',
        },
    }); };
    var translateStyleParams = function (params) { return ({
        'ss:ID': params.id,
    }); };
    var translateFontParams = function (font) {
        if (font === void 0) { font = {}; }
        return ({
            'ss:Bold': font.bold ? 1 : 0,
            'ss:Color': font.color ? font.color : '',
            'ss:Size': font.size && font.size > 0 ? font.size : '',
        });
    };

    var makeTypeForValue = function (value) {
        if (typeof value === 'number') {
            return 'Number';
        }
        return 'String';
    };
    var makeValue = function (cell) {
        if (cell == null) {
            return '';
        }
        if (typeof cell === 'object') {
            return String(cell.value);
        }
        return String(cell);
    };
    var makeStyleForCell = function (cell) {
        if (typeof cell !== 'object' || cell == null) {
            return {};
        }
        return {
            'ss:StyleID': cell.styleId,
        };
    };
    var makeData = function (cell) { return makeTag({
        name: 'Data',
        children: makeValue(cell),
        props: {
            'ss:Type': makeTypeForValue(cell),
        },
    }); };
    var makeCell = function (cell) { return makeTag({
        name: 'Cell',
        children: makeData(cell),
        props: makeStyleForCell(cell),
    }); };
    var makeRow = function (values) { return makeTag({ name: 'Row', children: values.map(makeCell).join('') }); };
    var makeRows = function (values) { return values.map(makeRow).join(''); };
    var makeTable = function (values) { return makeTag({ name: 'Table', children: makeRows(values) }); };
    var makeWorksheetOptions = function () { return makeTag({ name: 'x:WorksheetOptions' }); };
    var makeWorksheet = function (values) { return makeTag({
        name: 'ss:Worksheet',
        children: [makeTable(values), makeWorksheetOptions()],
        props: {
            'ss:Name': 'Worksheet1',
        },
    }); };

    var HEAD = '<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?>';
    var makeWorkBook = function (values, styles) { return makeTag({
        name: 'Workbook',
        children: [makeStyles(styles), makeWorksheet(values)],
        props: {
            'xmlns': 'urn:schemas-microsoft-com:office:spreadsheet',
            'xmlns:c': 'urn:schemas-microsoft-com:office:component:spreadsheet',
            'xmlns:html': 'http://www.w3.org/TR/REC-html40',
            'xmlns:o': 'urn:schemas-microsoft-com:office:office',
            'xmlns:ss': 'urn:schemas-microsoft-com:office:spreadsheet',
            'xmlns:x2': 'http://schemas.microsoft.com/office/excel/2003/xml',
            'xmlns:x': 'urn:schemas-microsoft-com:office:excel',
            'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        },
    }); };
    var makeSimpleSpreadsheet = function (values) {
        if (values === void 0) { values = [[]]; }
        return [
            HEAD,
            makeWorkBook(values, []),
        ].join('');
    };
    var makeStyledSpreadsheet = function (values, styles) {
        if (values === void 0) { values = [[]]; }
        if (styles === void 0) { styles = []; }
        return [
            HEAD,
            makeWorkBook(values, styles),
        ].join('');
    };

    var fromArray = function (values) { return makeSimpleSpreadsheet(values); };

    exports.fromArray = fromArray;
    exports.makeSimpleSpreadsheet = makeSimpleSpreadsheet;
    exports.makeStyledSpreadsheet = makeStyledSpreadsheet;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
