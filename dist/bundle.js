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
            var children = [makeFontTag(param), makeInteriorTag(param), makeAlignmentTag(param)];
            return makeTag({ name: 'Style', props: props, children: children });
        });
        return makeTag({ name: 'Styles', children: styles });
    };
    var makeFontTag = function (params) {
        if (!params.font) {
            return '';
        }
        var props = translateFontParams(params.font);
        return makeTag({ name: 'Font', props: props });
    };
    var makeInteriorTag = function (params) {
        if (!params.background) {
            return '';
        }
        return makeTag({
            name: 'Interior',
            props: {
                'ss:Color': fix3Color(params.background),
                'ss:Pattern': 'Solid',
            },
        });
    };
    var makeAlignmentTag = function (params) {
        if (!params.align) {
            return '';
        }
        return makeTag({
            name: 'Alignment',
            props: {
                'ss:Horizontal': String(params.align),
            },
        });
    };
    var translateStyleParams = function (params) { return ({
        'ss:ID': params.id,
    }); };
    var translateFontParams = function (font) {
        if (font === void 0) { font = {}; }
        var newObj = {
            'ss:Bold': font.bold ? '1' : '0',
        };
        if (font.color) {
            newObj['ss:Color'] = fix3Color(font.color);
        }
        if (font.size) {
            newObj['ss:Size'] = String(font.size);
        }
        return newObj;
    };
    var fix3Color = function (color) {
        if (color[0] === '#' && color.length !== 7) {
            return "" + color[0] + color.slice(1).split('').map(function (c) { return "" + c + c; }).join('');
        }
        return color;
    };

    var __assign = (null && null.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
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
    var makeMergeForCell = function (cell) {
        if (typeof cell !== 'object' || cell == null || !cell.mergeAcross) {
            return {};
        }
        return {
            'ss:MergeAcross': String(cell.mergeAcross),
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
        props: __assign({}, makeStyleForCell(cell), makeMergeForCell(cell)),
    }); };
    var makeRow = function (values) { return makeTag({ name: 'Row', children: values.map(makeCell).join('') }); };
    var makeRows = function (values) { return values.map(makeRow).join(''); };
    var makeWidths = function (widths) {
        return widths
            .map(function (width) { return makeTag({ name: 'Column', props: { 'ss:Width': String(width) } }); })
            .join('');
    };
    var makeTable = function (values, widths) {
        return makeTag({ name: 'Table', children: [makeWidths(widths), makeRows(values)] });
    };
    var makeWorksheetOptions = function () { return makeTag({ name: 'x:WorksheetOptions' }); };
    var makeWorksheet = function (values, widths) { return makeTag({
        name: 'ss:Worksheet',
        children: [makeTable(values, widths), makeWorksheetOptions()],
        props: {
            'ss:Name': 'Worksheet1',
        },
    }); };

    var HEAD = '<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?>';
    var makeWorkBook = function (values, styles, widths) { return makeTag({
        name: 'Workbook',
        children: [makeStyles(styles), makeWorksheet(values, widths)],
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
            makeWorkBook(values, [], []),
        ].join('');
    };
    var makeStyledSpreadsheet = function (values, styles, widths) {
        if (values === void 0) { values = [[]]; }
        if (styles === void 0) { styles = []; }
        if (widths === void 0) { widths = []; }
        return [
            HEAD,
            makeWorkBook(values, styles, widths),
        ].join('');
    };

    var fromArray = function (values) { return makeSimpleSpreadsheet(values); };

    exports.fromArray = fromArray;
    exports.makeSimpleSpreadsheet = makeSimpleSpreadsheet;
    exports.makeStyledSpreadsheet = makeStyledSpreadsheet;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
