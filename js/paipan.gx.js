"use strict";
var GX = Array( //刑冲合害关系: [0针对天干1针对地支, 关系类型, [发起者...], 形成者, 文字描述]
    [0, 0, [0, 5], 4, '甲己合化土'],
    [0, 0, [1, 6], 0, '乙庚合化金'],
    [0, 0, [2, 7], 1, '丙辛合化水'],
    [0, 0, [3, 8], 2, '丁壬合化木'],
    [0, 0, [4, 9], 3, '戊癸合化火'],
    [0, 1, [0, 6], -1, '甲庚冲'],
    [0, 1, [1, 7], -1, '乙辛冲'],
    [0, 1, [2, 8], -1, '丙壬冲'],
    [0, 1, [3, 9], -1, '丁癸冲'],
    [1, 2, [0, 1], 4, '子丑合化土'],
    [1, 2, [2, 11], 2, '寅亥合化木'],
    [1, 2, [3, 10], 3, '卯戌合化火'],
    [1, 2, [4, 9], 0, '辰酉合化金'],
    [1, 2, [5, 8], 1, '巳申合化水'],
    [1, 2, [6, 7], 3, '午未合化火'],
    [1, 3, [2, 3, 4], 2, '寅卯辰会木'],
    [1, 3, [5, 6, 7], 3, '巳午未会火'],
    [1, 3, [8, 9, 10], 0, '申酉戌会金'],
    [1, 3, [11, 0, 1], 1, '亥子丑会水'],
    [1, 4, [2, 6, 10], 3, '寅午戌三合火'],
    [1, 4, [8, 0, 4], 1, '申子辰三合水'],
    [1, 4, [5, 9, 1], 0, '巳酉丑三合金'],
    [1, 4, [11, 3, 7], 2, '亥卯未三合木'],
    [1, 5, [0, 6], -1, '子午冲'],
    [1, 5, [1, 7], -1, '丑未冲'],
    [1, 5, [2, 8], -1, '寅申冲'],
    [1, 5, [3, 9], -1, '卯酉冲'],
    [1, 5, [4, 10], -1, '辰戌冲'],
    [1, 5, [5, 11], -1, '巳亥冲'],
    [1, 6, [0, 7], -1, '子未害'],
    [1, 6, [1, 6], -1, '丑午害'],
    [1, 6, [2, 5], -1, '寅巳害'],
    [1, 6, [3, 4], -1, '卯辰害'],
    [1, 6, [8, 11], -1, '申亥害'],
    [1, 6, [9, 10], -1, '酉戌害'],
    [1, 7, [2, 5], -1, '寅巳相刑'],
    [1, 7, [5, 8], -1, '巳申相刑'],
    [1, 7, [8, 2], -1, '申寅相刑'],
    [1, 7, [1, 10], -1, '丑戌相刑'],
    [1, 7, [10, 7], -1, '戌未相刑'],
    [1, 7, [7, 1], -1, '未丑相刑'],
    [1, 7, [0, 3], -1, '子卯相刑'],
    [1, 7, [9, 9], -1, '酉酉相刑'],
    [1, 7, [11, 11], -1, '亥亥相刑'],
    [1, 7, [6, 6], -1, '午午相刑'],
    [1, 7, [4, 4], -1, '辰辰相刑'],
    [1, 8, [2, 5, 8], -1, '寅巳申三刑'],
    [1, 8, [1, 10, 7], -1, '丑戌未三刑'],
    [1, 9, [3, 8], -1, '卯申暗合'],
    [1, 9, [6, 11], -1, '午亥暗合'],
    [1, 9, [1, 2], -1, '丑寅暗合'],
    [1, 9, [2, 7], -1, '寅未暗合'],
    [1, 9, [0, 10], -1, '子戌暗合'],
    [1, 9, [0, 4], -1, '子辰暗合'],
    [1, 9, [5, 9], -1, '巳酉暗合']
);

function pc_array_power_set(arr) {
    var results = [
        []
    ];
    for (var i in arr) {
        for (var j in results) {
            array_push(results, array_merge([arr[i]], results[j]));
        }
    }
    return results;
}

function array_merge() {
    var args = Array.prototype.slice.call(arguments);
    var argl = args.length;
    var arg;
    var retObj = {};
    var k = '';
    var argil = 0;
    var j = 0;
    var i = 0;
    var ct = 0;
    var toStr = Object.prototype.toString;
    var retArr = true;
    for (i = 0; i < argl; i++) {
        if (toStr.call(args[i]) !== '[object Array]') {
            retArr = false;
            break;
        }
    }
    if (retArr) {
        retArr = [];
        for (i = 0; i < argl; i++) {
            retArr = retArr.concat(args[i]);
        }
        return retArr;
    }
    for (i = 0, ct = 0; i < argl; i++) {
        arg = args[i];
        if (toStr.call(arg) === '[object Array]') {
            for (j = 0, argil = arg.length; j < argil; j++) {
                retObj[ct++] = arg[j];
            }
        } else {
            for (k in arg) {
                if (arg.hasOwnProperty(k)) {
                    if (parseInt(k, 10) + '' === k) {
                        retObj[ct++] = arg[k];
                    } else {
                        retObj[k] = arg[k];
                    }
                }
            }
        }
    }
    return retObj;
}

function array_keys(input, searchValue, argStrict) {
    var search = typeof searchValue !== 'undefined';
    var tmpArr = [];
    var strict = !!argStrict;
    var include = true;
    var key = '';

    for (key in input) {
        if (input.hasOwnProperty(key)) {
            include = true;
            if (search) {
                if (strict && input[key] !== searchValue) {
                    include = false;
                } else if (input[key] !== searchValue) {
                    include = false;
                }
            }

            if (include) {
                tmpArr[tmpArr.length] = key;
            }
        }
    }
    return tmpArr;
}

function array_push(inputArr) {
    var i = 0;
    var pr = '';
    var argv = arguments;
    var argc = argv.length;
    var allDigits = /^\d$/;
    var size = 0;
    var highestIdx = 0;
    var len = 0;

    if (inputArr.hasOwnProperty('length')) {
        for (i = 1; i < argc; i++) {
            inputArr[inputArr.length] = argv[i];
        }
        return inputArr.length;
    }
    for (pr in inputArr) {
        if (inputArr.hasOwnProperty(pr)) {
            ++len;
            if (pr.search(allDigits) !== -1) {
                size = parseInt(pr, 10);
                highestIdx = size > highestIdx ? size : highestIdx;
            }
        }
    }
    for (i = 1; i < argc; i++) {
        inputArr[++highestIdx] = argv[i];
    }

    return len + i - 1;
}

function array_diff(arr1) {
    var retArr = {};
    var argl = arguments.length;
    var k1 = '';
    var i = 1;
    var k = '';
    var arr = {};

    arr1keys: for (k1 in arr1) {
        for (i = 1; i < argl; i++) {
            arr = arguments[i]
            for (k in arr) {
                if (arr[k] === arr1[k1]) {
                    continue arr1keys;
                }
            }
            retArr[k1] = arr1[k1];
        }
    }
    return retArr;
}

function array_intersect(arr1) {
    var retArr = {};
    var argl = arguments.length;
    var arglm1 = argl - 1;
    var k1 = '';
    var arr = {};
    var i = 0;
    var k = '';

    arr1keys: for (k1 in arr1) {
        arrs: for (i = 1; i < argl; i++) {
            arr = arguments[i];
            for (k in arr) {
                if (arr[k] === arr1[k1]) {
                    if (i === arglm1) {
                        retArr[k1] = arr1[k1];
                    }
                    continue arrs;
                }
            }
            continue arr1keys;
        }
    }
    return retArr;
}

function empty(mixedVar) {
    var undef;
    var key;
    var i;
    var len;
    var emptyValues = [undef, null, false, 0, '', '0'];
    for (i = 0, len = emptyValues.length; i < len; i++) {
        if (mixedVar === emptyValues[i]) {
            return true;
        }
    }
    if (typeof mixedVar === 'object') {
        for (key in mixedVar) {
            if (mixedVar.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
    return false;
}

function count(mixedVar, mode) {
    var key;
    var cnt = 0;

    if (mixedVar === null || typeof mixedVar === 'undefined') {
        return 0;
    } else if (mixedVar.constructor !== Array && mixedVar.constructor !== Object) {
        return 1;
    }
    if (mode === 'COUNT_RECURSIVE') {
        mode = 1;
    }
    if (mode !== 1) {
        mode = 0;
    }
    for (key in mixedVar) {
        if (mixedVar.hasOwnProperty(key)) {
            cnt++;
            if (mode === 1 && mixedVar[key] &&
                (mixedVar[key].constructor === Array || mixedVar[key].constructor === Object)) {
                cnt += count(mixedVar[key], 1);
            }
        }
    }
    return cnt;
}

function implode(glue, pieces) {
    var i = '';
    var retVal = '';
    var tGlue = '';

    if (arguments.length === 1) {
        pieces = glue;
        glue = '';
    }
    if (typeof pieces === 'object') {
        if (Object.prototype.toString.call(pieces) === '[object Array]') {
            return pieces.join(glue);
        }
        for (i in pieces) {
            retVal += tGlue + pieces[i];
            tGlue = glue;
        }
        return retVal;
    }

    return pieces;
}
/**
 * 从天干地支数组查出所有刑冲合害关系
 * @param array tg 天干数组
 * @param array dz 地支数组
 * @return array
 */
function GetGX(tg, dz) {
    var list = new Array();
    for (var i in GX) { //[0针对天干1针对地支, 关系类型, [发起者...], 形成者, 文字描述]
        var gx = GX[i];

        var to = (gx[0] == 0) ? tg : dz; //要匹配的类型

        var fd = array_intersect(to, gx[2]); //求交集,返回的键名与to是一致的
        if (empty(array_diff(gx[2], fd))) { //说明存在此关系

            var c1 = count(fd);
            var c2 = count(gx[2]);

            var fds = new Array(); //最终关联的
            if (c1 < c2) { //比如亥亥自刑,在只有一个亥的时候也会来这里

            }
            if (c1 == c2) { //有且只有一个此类关系
                array_push(fds, fd);
            }
            if (c1 > c2) { //存在多个此类关系,先算出所有可能的组合,再匹配判断以精确指定是哪一个位置
                var set = pc_array_power_set(array_keys(fd));
                for (var ii in set) {
                    var keys = set[ii];
                    if (count(keys) != c2) {
                        continue;
                    }
                    var fd = new Array();
                    for (var iii in keys) {
                        fd[keys[iii]] = to[keys[iii]];
                    }
                    if (empty(array_diff(gx[2], fd))) {
                        array_push(fds, fd);
                    }
                }
            }
            for (var j in fds) { //组合成期望的返回
                array_push(list, [fds[j], gx]);
            }
        }
    }
    return list;
}