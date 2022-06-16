var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function parseInput(input) {
    var lines = input.split("\n");
    var strings = lines.map(function (line) { return line.split(" "); });
    var items = strings.map(function (line) { return line.map(function (string) { return parseInt(string); }); });
    return items;
}
function checkInput(items) {
    function check(condition, message) {
        if (condition) {
            alert(message);
            throw new Error("Bad input");
        }
    }
    var n = items[0][0];
    var m = items[0][1];
    var changes = items.slice(1);
    check(items[0].length !== 2, "Klaida - pirmoje eilut\u0117je privalo b\u016Bti lygiai du skai\u010Diai, dabar: '".concat(items[0].length, "'"));
    check(isNaN(n) || n < 3 || n > 200000, "Klaida - netinkamas rutuliuk\u0173 skai\u010Dius N: '".concat(n, "'"));
    check(isNaN(m) || m < 1 || m > 400000, "Klaida - netinkamas pagaliuk\u0173 skai\u010Dius M: '".concat(m, "'"));
    check(changes.length !== m, "Klaida - pakeitim\u0173 skai\u010Dius nesutampa su pagaliuk\u0173 skai\u010Diumi: '".concat(changes.length, "' nelygu '").concat(m, "'"));
    changes.forEach(function (change, i) {
        var a = change[0];
        var b = change[1];
        check(change.length !== 2, "Klaida - kiekvienoje eilut\u0117je privalo b\u016Bti lygiai 2 skai\u010Diai: '".concat(change.length, "' ('").concat(i + 1, "' eil.)"));
        check(isNaN(a) || a < 0 || a > n - 1, "Klaida - netinkamas rutuliuko skai\u010Dius a: '".concat(a, "' ('").concat(i + 1, "' eil.)"));
        check(isNaN(b) || b < 0 || b > n - 1, "Klaida - netinkamas rutuliuko skai\u010Dius b: '".concat(b, "' ('").concat(i + 1, "' eil.)"));
        check(a === b, "Klaida - rutuliukai a ir b negali b\u016Bti tas pats: '".concat(a, " ('").concat(i + 1, "' eil.)'"));
    });
}
function calculate(changes) {
    var object = {};
    var triangles = 0;
    var result = [];
    changes.forEach(function (change) {
        var _a;
        var a = change[0];
        var b = change[1];
        if (object[a] && object[a].indexOf(b) !== -1) {
            object[a].forEach(function (ai) {
                object[b].forEach(function (bi) {
                    if (ai === bi)
                        triangles--;
                });
            });
            object[a].splice(object[a].indexOf(b), 1);
            object[b].splice(object[b].indexOf(a), 1);
        }
        else {
            (_a = object[a]) === null || _a === void 0 ? void 0 : _a.forEach(function (ai) {
                var _a;
                (_a = object[b]) === null || _a === void 0 ? void 0 : _a.forEach(function (bi) {
                    if (ai === bi)
                        triangles++;
                });
            });
            object[a] = __spreadArray([b], (object[a] || []), true);
            object[b] = __spreadArray([a], (object[b] || []), true);
        }
        result.push(triangles);
    });
    return result;
}
function stringifyOutput(result) {
    var output = result.join("\n");
    return output;
}
function main(input) {
    var items = parseInput(input);
    checkInput(items);
    var result = calculate(items.slice(1));
    return stringifyOutput(result);
}
