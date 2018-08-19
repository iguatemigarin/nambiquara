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

    var HEAD = '<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?>';
    var makeWorksheetOptions = function () { return makeTag({ name: 'x:WorksheetOptions' }); };
    var makeTypeForValue = function (value) {
        switch (typeof value) {
            case 'string': return 'String';
            case 'number': return 'Number';
            default: return 'String';
        }
    };
    var makeValue = function (value) { return value == null ? '' : String(value); };
    var makeData = function (value) { return makeTag({
        name: 'Data',
        children: makeValue(value),
        props: {
            'ss:Type': makeTypeForValue(value),
        },
    }); };
    var makeCell = function (value) { return makeTag({ name: 'Cell', children: makeData(value) }); };
    var makeRow = function (values) { return makeTag({ name: 'Row', children: values.map(makeCell).join('') }); };
    var makeRows = function (values) { return values.map(makeRow).join(''); };
    var makeTable = function (values) { return makeTag({ name: 'Table', children: makeRows(values) }); };
    var makeWorksheet = function (values) { return makeTag({
        name: 'ss:Worksheet',
        children: [makeTable(values), makeWorksheetOptions()],
        props: {
            'ss:Name': 'Worksheet1',
        },
    }); };
    var makeWorkBook = function (values) { return makeTag({
        name: 'Workbook',
        children: makeWorksheet(values),
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
    var makeSpreadsheet = function (values) {
        if (values === void 0) { values = [[]]; }
        return [
            HEAD,
            makeWorkBook(values),
        ].join('');
    };

    var fromArray = function (values) { return makeSpreadsheet(values); };

    exports.fromArray = fromArray;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
