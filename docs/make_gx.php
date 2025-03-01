<?php
/**
 * 根据文字生成关系表
 */
if(php_sapi_name() !== 'cli'){ //sh# /path/to/bin/php make_gx.php
    die('当前非 cli 接口类型 @see https://www.php.net/manual/zh/function.php-sapi-name.php ');
}
include(__DIR__ . '/../lib/class.paipan.php');
$p = new paipan();

$list = array();
$list[0] = array(
    '甲己合化土',
    '乙庚合化金',
    '丙辛合化水',
    '丁壬合化木',
    '戊癸合化火',
);
$list[1] = array(
    '甲庚冲',
    '乙辛冲',
    '丙壬冲',
    '丁癸冲',
);
$list[2] = array(
    '子丑合化土',
    '寅亥合化木',
    '卯戌合化火',
    '辰酉合化金',
    '巳申合化水',
    '午未合化火',
);
$list[3] = array(
    '寅卯辰会木',
    '巳午未会火',
    '申酉戌会金',
    '亥子丑会水',
);
$list[4] = array(
    '寅午戌三合火',
    '申子辰三合水',
    '巳酉丑三合金',
    '亥卯未三合木',
);
$list[5] = array(
    '子午冲',
    '丑未冲',
    '寅申冲',
    '卯酉冲',
    '辰戌冲',
    '巳亥冲',
);
$list[6] = array(
    '子未害',
    '丑午害',
    '寅巳害',
    '卯辰害',
    '申亥害',
    '酉戌害',
);
$list[7] = array(
    '寅巳相刑',
    '巳申相刑',
    '申寅相刑',
    '丑戌相刑',
    '戌未相刑',
    '未丑相刑',
    '子卯相刑',
    '酉酉相刑',
    '亥亥相刑',
    '午午相刑',
    '辰辰相刑',
);
$list[8] = array(
    '寅巳申三刑',
    '丑戌未三刑',
);
$list[9] = array(
    '卯申暗合',
    '午亥暗合',
    '丑寅暗合',
    '寅未暗合',
    '子戌暗合',
    '子辰暗合',
    '巳酉暗合',
);

$q = [];
foreach ($list as $k => $v){
    foreach ($v as $kk => $vv){
        preg_match_all('/[\x{4e00}-\x{9fa5}]/u', $vv, $m); //分离出单个汉字
        $m = $m[0];
        
        $t = in_array($k, [0, 1]) ? 0 : 1; //0针对天干1针对地支
        $c = ($t == 0) ? $p->ctg : $p->cdz; //天干或地支
        
        foreach ($m as $kkk => $vvv){
            $m[$kkk] = array_search($vvv, $c);
            if($m[$kkk] === false){ //尝试替换成五行
                $m[$kkk] = array_search($vvv, $p->cwx);
            }
        }
        switch ($k){
            case 0: //天干五合
                $q[] = "[{$t}, {$k}, [{$m[0]}, {$m[1]}], {$m[4]}, '{$vv}']";
                break;
            case 1: //天干相冲
                $q[] = "[{$t}, {$k}, [{$m[0]}, {$m[1]}], -1, '{$vv}']";
                break;
            case 2: //地支六合
                $q[] = "[{$t}, {$k}, [{$m[0]}, {$m[1]}], {$m[4]}, '{$vv}']";
                break;
            case 3: //地支三会
                $q[] = "[{$t}, {$k}, [{$m[0]}, {$m[1]}, {$m[2]}], {$m[4]}, '{$vv}']";
                break;
            case 4: //地支三合
                $q[] = "[{$t}, {$k}, [{$m[0]}, {$m[1]}, {$m[2]}], {$m[5]}, '{$vv}']";
                break;
            case 5: //地支相冲
                $q[] = "[{$t}, {$k}, [{$m[0]}, {$m[1]}], -1, '{$vv}']";
                break;
            case 6: //地支相害
                $q[] = "[{$t}, {$k}, [{$m[0]}, {$m[1]}], -1, '{$vv}']";
                break;
            case 7: //地支相刑
                $q[] = "[{$t}, {$k}, [{$m[0]}, {$m[1]}], -1, '{$vv}']";
                break;
            case 8: //地支三刑
                $q[] = "[{$t}, {$k}, [{$m[0]}, {$m[1]}, {$m[2]}], -1, '{$vv}']";
                break;
            case 9: //地支暗合
                $q[] = "[{$t}, {$k}, [{$m[0]}, {$m[1]}], -1, '{$vv}']";
                break;
        }
    }
}

$php = "<?php\n\$GLOBALS['GX'] = array(//刑冲合害关系: [0针对天干1针对地支, 关系类型, [发起者...], 形成者, 文字描述]\n\t";
$js = "var GX = Array(//刑冲合害关系: [0针对天干1针对地支, 关系类型, [发起者...], 形成者, 文字描述]\n\t";

file_put_contents(__DIR__ . '/gx.php', $php . implode(",\n\t", $q) . "\n\t);");
file_put_contents(__DIR__ . '/gx.js', $js . implode(",\n\t", $q) . "\n\t);");