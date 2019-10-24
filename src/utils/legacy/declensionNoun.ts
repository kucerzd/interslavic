/*
* Source http://steen.free.fr/interslavic/declinator.html
*/

/* tslint:disable */
function prepareGender(gender, animated) {
    if (gender === 'feminine') {
        return 'f';
    }
    if (gender === 'neuter') {
        return 'n';
    }
    if (gender === 'masculine') {
        return animated ? 'm1' : 'm2';
    }
}

export function declensionNoun(noun, originGender, animated) {
    const rawGender = prepareGender(originGender, animated);
    noun = noun.replace('è', '(e)');
    noun = noun.replace('ò', '(o)');
    noun = noun + '%';
    noun = noun.replace(/[ńň]%/, 'nj');
    noun = noun.replace(/[ľĺ]%/, 'lj');
    noun = noun.replace(/%/, '');

    const n1 = noun.substring(0, noun.length - 2);
    let n2 = noun.substring(noun.length - 2, noun.length);
    n2 = n2.replace(/([cšžčćńľŕťďśźj])/g, '$1ь');
    noun = n1 + n2;

    noun = noun.replace((String.fromCharCode(40)) + 'e' + (String.fromCharCode(41)), 'è');
    noun = noun.replace((String.fromCharCode(40)) + 'o' + (String.fromCharCode(41)), 'ò');

    const gender = establish_gender(noun, rawGender);
    const root = establish_root(noun, gender);
    const plroot = establish_plural_root(root);
    const plgen = establish_plural_gender(root, plroot, gender, rawGender);
    const nom_sg = nominative_sg(noun, root, gender);
    const gen_sg = genitive_sg(root, gender);
    const dat_sg = dative_sg(root, gender);
    const acc_sg = accusative_sg(nom_sg, root, gender);
    const ins_sg = instrumental_sg(root, gender);
    const loc_sg = locative_sg(root, gender);
    const voc_sg = vocative_sg(nom_sg, root, gender);
    const nom_pl = nominative_pl(plroot, plgen);
    const gen_pl = genitive_pl(plroot, plgen);
    const dat_pl = dative_pl(plroot, gender);
    const acc_pl = accusative_pl(nom_pl, gen_pl, plgen);
    const ins_pl = instrumental_pl(plroot, gender);
    const loc_pl = locative_pl(plroot, gender);

    return {
        nom: [nom_sg, nom_pl],
        acc: [acc_sg, acc_pl],
        gen: [gen_sg, gen_pl],
        loc: [loc_sg, loc_pl],
        dat: [dat_sg, dat_pl],
        ins: [ins_sg, ins_pl],
        voc: [voc_sg, null],
    };
}

function establish_gender(noun, gender) {
    let result = '';
    if (noun.length == 0) {
        result = 'ERROR-1';
    }

    else if ((noun == 'den') || (noun == 'dèn') || (noun == 'denjь') || (noun == 'dènjь')) {
        result = 'm3';
    }
    else if ((gender.charAt(0) == 'm') && ((noun.lastIndexOf('en') == noun.length - 2) || (noun.lastIndexOf('enjь') == noun.length - 4))
        && ((noun.substring(0, 5) == 'kamen') || (noun.substring(0, 5) == 'jelen') || (noun.substring(0, 6) == 'jęčmen') || (noun.substring(0, 6) == 'ječmen')
            || (noun.substring(0, 5) == 'koren') || (noun.substring(0, 6) == 'kremen') || (noun.substring(0, 6) == 'plåmen') || (noun.substring(0, 6) == 'plamen')
            || (noun.substring(0, 6) == 'pŕsten') || (noun.substring(0, 6) == 'prsten') || (noun.substring(0, 7) == 'strumen') || (noun.substring(0, 6) == 'greben')
            || (noun.substring(0, 6) == 'stępen') || (noun.substring(0, 6) == 'stepen') || (noun.substring(0, 6) == 'stųpen') || (noun.substring(0, 6) == 'stupen')
            || (noun.substring(0, 5) == 'šršen') || (noun.substring(0, 5) == 'šŕšen') || (noun.substring(0, 5) == 'sršen') || (noun.substring(0, 5) == 'sŕšen'))) {
        result = 'm3';
    }

    else if ((gender == 'f') && (noun.lastIndexOf('v') == noun.length - 1)) {
        result = 'f3';
    }
    else if ((noun == 'mati') || (noun == 'dočьi') || (noun == 'doćьi')) {
        result = 'f3';
    }
    else if ((noun.lastIndexOf('a') == (noun.length - 1)) || (noun.lastIndexOf('i') == (noun.length - 1))) {
        result = 'f1';
    }
    else if (noun.lastIndexOf('ę') == (noun.length - 1)) {
        result = 'n2';
    }
    else if ((noun.lastIndexOf('ь') != (noun.length - 2)) && (noun.lastIndexOf('e') == (noun.length - 1))) {
        result = 'n2';
    }
    else if ((noun.lastIndexOf('o') == (noun.length - 1)) || (noun.lastIndexOf('e') == (noun.length - 1))) {
        result = 'n1';
    }
    else if ((noun.lastIndexOf('u') == (noun.length - 2)) && (noun.lastIndexOf('m') == (noun.length - 1))) {
        result = 'n1';
    }
    else if (gender == 'm1') {
        result = 'm1';
    }
    else if (gender == 'f') {
        result = 'f2'
    }
    else {
        result = 'm2';
    }
    return result;
}

function establish_root(noun, gender) {
    let result = '';
    if ((noun == 'den') || (noun == 'dèn') || (noun == 'denjь') || (noun == 'dènjь')) {
        result = 'dn';
    }
    else if (noun == 'lèv') {
        result = 'ľv';
    }
    else if ((gender.substring(0, 1) == 'm') && ((noun.lastIndexOf('e') == noun.length - 3) || (noun.lastIndexOf('è') == noun.length - 3)) && (noun.lastIndexOf('c') == noun.length - 2)) {
        result = noun.substring(0, noun.length - 3) + 'cь';
    }
    else if (gender == 'm3') {
        result = noun + '%';
        result = result.replace('jь%', '%');
        result = result.replace('%', '');
    }
    else if ((noun == 'mati') || (noun == 'dočьi') || (noun == 'doćьi')) {
        result = noun.substring(0, noun.length - 1) + 'er';
    }
    else if ((gender == 'f3') && ((noun.lastIndexOf('o') == noun.length - 2) || (noun.lastIndexOf('ò') == noun.length - 2)) && (noun.lastIndexOf('v') == noun.length - 1)) {
        result = noun.substring(0, noun.length - 2) + 'v';
    }
    else if (gender == 'f3') {
        result = noun;
    }
    else if ((gender == 'n2') && (noun.lastIndexOf('m') == noun.length - 2)) {
        result = noun.substring(0, noun.length - 1) + 'en';
    }
    else if (gender == 'n2') {
        result = noun.substring(0, noun.length - 1) + 'ęt';
    }
    else if (noun.lastIndexOf('i') == noun.length - 1) {
        result = (noun.substring(0, noun.length - 1) + 'ь');
    }
    else if ((noun.lastIndexOf('a') == (noun.length - 1)) || (noun.lastIndexOf('e') == (noun.length - 1)) ||
        (noun.lastIndexOf('o') == (noun.length - 1))) {
        result = (noun.substring(0, noun.length - 1));
    }
    else if ((noun.lastIndexOf('u') == (noun.length - 2)) && (noun.lastIndexOf('m') == (noun.length - 1))) {
        result = (noun.substring(0, noun.length - 2));
    }
    /*	else if ((gender == 'f2') && (noun.lastIndexOf('ь') == noun.length - 1))
            { result = (noun.substring (0, noun.length - 1)); } */
    else if ((gender == 'f2') && (noun.lastIndexOf('ь') != noun.length - 1)) {
        result = noun + 'ь';
    }
    else {
        result = noun;
    }

    const filler_e = result.lastIndexOf('è');
    const filler_o = result.lastIndexOf('ò');
    let filler;
    if ((filler_e != -1) || (filler_o != -1)) {
        if (filler_o > filler_e) {
            filler = filler_o;
        }
        else {
            filler = filler_e;
        }
        if (filler > result.length - 3) {
            result = (result.substring(0, filler)) + (result.substring(filler + 1, result.length));
        }
    }
    return result;
}

function establish_plural_root(root) {
    let result = '';
    if ((root == 'dětęt') || (root == 'detet') || (root == 'dětet') || (root == 'detęt')) {
        result = 'dětь';
    }
    else if ((root == 'človek') || (root == 'člověk')) {
        result = 'ljudь';
    }
    else if (root == 'ok') {
        result = 'očь';
    }
    else if (root == 'uh') {
        result = 'ušь';
    }
    else if (root.substring(root.length - 4, root.length) == 'anin') {
        result = root.substring(0, root.length - 2);
    }
    else {
        result = root;
    }
    return result;
}

function establish_plural_gender(root, plroot, gender, rawGender) {
    let result = '';
    if ((root != plroot) && (plroot.indexOf('n') == -1)) {
        result = 'f2';
    }
    else if ((gender == 'f1') && (rawGender == 'm1')) {
        result = 'm1';
    }
    else {
        result = gender;
    }
    return result;
}

function nominative_sg(noun, root, gender) {
    let result = '';
    if (gender == 'f2') {
        result = root;
    }
    if (gender == 'f3') {
        result = root.substring(0, root.length - 1) + 'òv';
    }
    else if ((gender == 'm3') && (root == 'dn')) {
        result = 'den / denj';
    }
    else if (gender == 'm3') {
        result = root + ' / ' + root + 'j';
    }
    else {
        result = noun;
    }
    result = rules(result);
    return result;
}

function accusative_sg(noun, root, gender) {
    let result = '';
    if (gender == 'm1') {
        result = root + 'a';
    }
    else if (gender == 'f1') {
        result = root + 'ų';
    }
    else {
        result = noun;
    }
    result = rules(result);
    return result;
}

function genitive_sg(root, gender) {
    let result = '';
    if ((gender == 'm1') || (gender == 'm2') || (gender == 'n1')) {
        result = root + 'a';
    }
    else if (gender == 'f1') {
        result = root + 'y';
    }
    else if (gender == 'f2') {
        result = root + 'i';
    }
    else if (gender == 'f3') {
        result = root + 'e / ' + root + 'i';
    }
    else if (gender == 'm3') {
        result = root + 'e / ' + root + 'ja';
    }
    else if (gender == 'n2') {
        result = root + 'e / ' + root + 'a';
    }
    result = rules(result);
    return result;
}

function dative_sg(root, gender) {
    let result = '';
    if ((gender == 'm1') || (gender == 'm2') || (gender == 'n1')) {
        result = root + 'u';
    }
    else if (gender == 'f1') {
        result = root + 'ě';
    }
    else if (gender == 'f2') {
        result = root + 'i';
    }
    else if (gender == 'f3') {
        result = root + 'i';
    }
    else if (gender == 'm3') {
        result = root + 'i / ' + root + 'ju';
    }
    else if (gender == 'n2') {
        result = root + 'i / ' + root + 'u';
    }
    result = rules(result);
    return result;
}

function instrumental_sg(root, gender) {
    let result = '';
    if ((gender == 'm1') || (gender == 'm2') || (gender == 'n1')) {
        result = root + 'om';
    }
    else if (gender == 'f1') {
        result = root + 'ojų';
    }
    else if (gender == 'f2') {
        result = root + 'jų';
    }
    else if ((gender == 'f3') && (root.lastIndexOf('v') == root.length - 1)) {
        result = root.substring(0, root.length - 1) + 'òvjų';
    }
    else if (gender == 'f3') {
        result = root + 'jų';
    }
    else if (gender == 'm3') {
        result = root + 'em / ' + root + 'jem';
    }
    else if (gender == 'n2') {
        result = root + 'em / ' + root + 'om';
    }
    result = rules(result);
    return result;
}

function locative_sg(root, gender) {
    let result = '';
    if ((gender == 'm1') || (gender == 'm2') || (gender == 'n1')) {
        result = root + 'u';
    }
    else if (gender == 'f1') {
        result = root + 'ě';
    }
    else if (gender == 'f2') {
        result = root + 'i';
    }
    else if (gender == 'f3') {
        result = root + 'i';
    }
    else if (gender == 'm3') {
        result = root + 'i / ' + root + 'ju';
    }
    else if (gender == 'n2') {
        result = root + 'i / ' + root + 'u';
    }
    result = rules(result);
    return result;
}

function vocative_sg(nom_sg, root, gender) {
    let result = '';
    if ((gender == 'm1') || (gender == 'm2')) {
        if (nom_sg.lastIndexOf('ec') == nom_sg.length - 2) {
            result = root.substring(0, root.length - 2) + 'če';
        }
        else if (root.lastIndexOf('ь') == root.length - 1) {
            result = root + 'u';
        }
        else if (root.lastIndexOf('k') == root.length - 1) {
            result = root.substring(0, root.length - 1) + 'če';
        }
        else if (root.lastIndexOf('g') == root.length - 1) {
            result = root.substring(0, root.length - 1) + 'že';
        }
        else if (root.lastIndexOf('h') == root.length - 1) {
            result = root.substring(0, root.length - 1) + 'še';
        }
        else {
            result = root + 'e';
        }
    }
    else if (gender == 'f1') {
        result = root + '#o';
    }
    else if (gender == 'f2') {
        result = root + '#i';
    }
    else if (root == 'dn') {
        result = 'den / dnju';
    }
    else if (gender == 'm3') {
        result = root + ' / ' + root + 'ju';
    }
    else {
        result = nom_sg;
        return result;
    }
    result = rules(result);
    return result;
}

function nominative_pl(root, gender) {
    let result = '';
    if (gender.charAt(0) == 'n') {
        result = root + 'a';
    }
    else if (gender == 'm1') {
        result = root + 'i';
    }
    else if ((gender == 'f1') || (gender == 'm2')) {
        result = root + 'y';
    }
    else if (gender == 'm3') {
        result = root + 'i / ' + root + 'je';
    }
    else {
        result = root + 'i';
    }
    result = rules(result);
    return result;
}

function accusative_pl(nom_pl, gen_pl, gender) {
    let result = '';
    if (gender == 'm1') {
        result = gen_pl;
    }
    else {
        result = nom_pl;
    }
    return result;
}

function genitive_pl(root, gender) {
    let result = '';
    if ((gender == 'f1') || (root == 'morjь') || (root == 'poljь')) {
        result = root.replace('ь', '%');
        result = result.replace(/([pbvfmlnr])j%/, '$1ej');
        result = result + '%';
    }
    else if (gender.charAt(0) == 'n') {
        result = root.replace('ь', '%');
        result = result.replace(/([pbvfmlnrszńľŕťďśźščž])j%/, '$1ij');
        result = result + '%';
    }
    else if (gender == 'm3') {
        result = root + 'ev / ' + root + 'jev';
    }
    else if (gender.charAt(0) == 'm') {
        result = root + 'ov';
    }
    else {
        result = root + 'ij';
    }
    result = result.replace('jsk%', 'jsk');
    result = result.replace('bomb%', 'bomb');
    result = result.replace('porn%', 'porn');
    result = result.replace('mš%', 'meš');
    result = result.replace('zl%', 'zòl');
    result = result.replace('tl%', 'tòl');
    result = result.replace('mgl%', 'mgòl');
    result = result.replace(/([pbfvmlnrtdszkgh])([kn])%/, '$1ò$2');
    result = result.replace(/([jńľŕťďścšžč])([kn])%/, '$1e$2');
    result = result.replace(/([pbfvmlnrtdszkghjńľŕťďścšžč])([bvmn])%/, '$1e$2');
    result = result.replace(/%/g, '');
    result = rules(result);
    return result;
}

function dative_pl(root, gender) {
    let result = '';
    if (gender == 'm3') {
        result = root + 'am / ' + root + 'jam';
    }
    else {
        result = root + 'am';
    }
    result = rules(result);
    return result;
}

function instrumental_pl(root, gender) {
    let result = '';
    if (gender == 'm3') {
        result = root + 'ami / ' + root + 'jami';
    }
    else {
        result = root + 'ami';
    }
    result = rules(result);
    return result;
}

function locative_pl(root, gender) {
    let result = '';
    if (gender == 'm3') {
        result = root + 'ah / ' + root + 'jah';
    }
    else {
        result = root + 'ah';
    }
    result = rules(result);
    return result;
}

function rules(word: string): string {
    return word.replace('ьo', 'ьe')
        .replace('ьy', 'ьe')
        .replace('ьě', 'i')
        .replace('#', '')
        .replace('tь', 'ť')
        .replace('dь', 'ď')
        .replace('sь', 'ś')
        .replace('zь', 'ź')
        .replace(/ь/g, '')
        .replace('ťi', 'ti')
        .replace('ďi', 'di')
        .replace('śi', 'si')
        .replace('źi', 'zi')
        .replace(/ľi/g, 'li')
        .replace('ńi', 'ni')
        .replace('ŕi', 'ri')
        .replace('jy', 'ji')
        .replace('cy', 'ci')
    ;
}