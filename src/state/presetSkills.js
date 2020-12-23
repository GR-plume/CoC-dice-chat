// if change presetskills, please not change id already exist
const presetSkills = [
    {id: 'pre0',  init: '', occ: '', inte: '', adj: '', sum: 0,  name: '回避'},
    {id: 'pre1',  init: 25, occ: '', inte: '', adj: '', sum: 25, name: 'キック'},
    {id: 'pre2',  init: 50, occ: '', inte: '', adj: '', sum: 50, name: 'こぶし'},
    {id: 'pre3',  init: 1,  occ: '', inte: '', adj: '', sum: 1,  name: 'マーシャルアーツ'},
    {id: 'pre4',  init: 1,  occ: '', inte: '', adj: '', sum: 1,  name: '武道'},
    {id: 'pre5',  init: 1,  occ: '', inte: '', adj: '', sum: 1,  name: '居合'},
    {id: 'pre6',  init: 10, occ: '', inte: '', adj: '', sum: 10, name: '頭突き'},
    {id: 'pre7',  init: 25, occ: '', inte: '', adj: '', sum: 25, name: '投擲'},
    {id: 'pre8',  init: 25, occ: '', inte: '', adj: '', sum: 25, name: '組みつき'},
    {id: 'pre9',  init: 20, occ: '', inte: '', adj: '', sum: 20, name: '拳銃'},
    {id: 'pre10', init: 15, occ: '', inte: '', adj: '', sum: 15, name: 'サブマシンガン'},
    {id: 'pre11', init: 30, occ: '', inte: '', adj: '', sum: 30, name: 'ショットガン'},
    {id: 'pre12', init: 15, occ: '', inte: '', adj: '', sum: 15, name: 'マシンガン'},
    {id: 'pre13', init: 25, occ: '', inte: '', adj: '', sum: 25, name: 'ライフル'},
    {id: 'pre14', init: 25, occ: '', inte: '', adj: '', sum: 25, name: '目星'},
    {id: 'pre15', init: 25, occ: '', inte: '', adj: '', sum: 25, name: '聞き耳'},
    {id: 'pre16', init: 25, occ: '', inte: '', adj: '', sum: 25, name: '図書館'},
    {id: 'pre17', init: 1,  occ: '', inte: '', adj: '', sum: 1,  name: '精神分析'},
    {id: 'pre18', init: 30, occ: '', inte: '', adj: '', sum: 30, name: '応急手当'},
    {id: 'pre19', init: 15, occ: '', inte: '', adj: '', sum: 15, name: '隠す'},
    {id: 'pre20', init: 10, occ: '', inte: '', adj: '', sum: 10, name: '隠れる'},
    {id: 'pre21', init: 10, occ: '', inte: '', adj: '', sum: 10, name: '忍び歩き'},
    {id: 'pre22', init: 10, occ: '', inte: '', adj: '', sum: 10, name: '追跡'},
    {id: 'pre23', init: 1,  occ: '', inte: '', adj: '', sum: 1,  name: '鍵開け'},
    {id: 'pre24', init: 40, occ: '', inte: '', adj: '', sum: 40, name: '登攀'},
    {id: 'pre25', init: 10, occ: '', inte: '', adj: '', sum: 10, name: '写真術'},
    {id: 'pre26', init: 20, occ: '', inte: '', adj: '', sum: 20, name: '運転' , hasDetail: true, detail: ''},
    {id: 'pre27', init: 1,  occ: '', inte: '', adj: '', sum: 1,  name: '重機械操作'},
    {id: 'pre28', init: 1,  occ: '', inte: '', adj: '', sum: 1,  name: '操縦' , hasDetail: true, detail: ''},
    {id: 'pre29', init: 5,  occ: '', inte: '', adj: '', sum: 5,  name: '製作' , hasDetail: true, detail: ''},
    {id: 'pre30', init: 20, occ: '', inte: '', adj: '', sum: 20, name: '機械修理'},
    {id: 'pre31', init: 10, occ: '', inte: '', adj: '', sum: 10, name: '電気修理'},
    {id: 'pre32', init: 25, occ: '', inte: '', adj: '', sum: 25, name: '跳躍'},
    {id: 'pre33', init: 10, occ: '', inte: '', adj: '', sum: 10, name: 'ナビゲート'},
    {id: 'pre34', init: 1,  occ: '', inte: '', adj: '', sum: 1,  name: '変装'},
    {id: 'pre35', init: 25, occ: '', inte: '', adj: '', sum: 25, name: '水泳'},
    {id: 'pre36', init: 5,  occ: '', inte: '', adj: '', sum: 5,  name: '乗馬'},
    {id: 'pre37', init: 10, occ: '', inte: '', adj: '', sum: 10, name: 'サバイバル'},
    {id: 'pre38', init: 5,  occ: '', inte: '', adj: '', sum: 5,  name: '言いくるめ'},
    {id: 'pre39', init: 15, occ: '', inte: '', adj: '', sum: 15, name: '信用'},
    {id: 'pre40', init: 15, occ: '', inte: '', adj: '', sum: 15, name: '説得'},
    {id: 'pre41', init: 5,  occ: '', inte: '', adj: '', sum: 5,  name: '値切り'},
    {id: 'pre42', init: 1,  occ: '', inte: '', adj: '', sum: 1,  name: 'ほかの言語', hasDetail: true, detail: ''},
    {id: 'pre43', init: '', occ: '', inte: '', adj: '', sum: 0,  name: '母国語', hasDetail: true, detail: ''},
    {id: 'pre44', init: 0,  occ: '', inte: '', adj: '', sum: 0,  name: 'クトゥルフ神話'},
    {id: 'pre45', init: 5,  occ: '', inte: '', adj: '', sum: 5,  name: '芸術', hasDetail: true, detail: ''},
    {id: 'pre46', init: 1,  occ: '', inte: '', adj: '', sum: 1,  name: 'コンピューター'},
    {id: 'pre47', init: 5,  occ: '', inte: '', adj: '', sum: 5,  name: 'オカルト'},
    {id: 'pre48', init: 5,  occ: '', inte: '', adj: '', sum: 5,  name: '医学'},
    {id: 'pre49', init: 5,  occ: '', inte: '', adj: '', sum: 5,  name: '心理学'},
    {id: 'pre50', init: 1,  occ: '', inte: '', adj: '', sum: 1,  name: '薬学'},
    {id: 'pre51', init: 1,  occ: '', inte: '', adj: '', sum: 1,  name: '化学'},
    {id: 'pre52', init: 1,  occ: '', inte: '', adj: '', sum: 1,  name: '生物学'},
    {id: 'pre53', init: 1,  occ: '', inte: '', adj: '', sum: 1,  name: '地質学'},
    {id: 'pre54', init: 1,  occ: '', inte: '', adj: '', sum: 1,  name: '電子工学'},
    {id: 'pre55', init: 1,  occ: '', inte: '', adj: '', sum: 1,  name: '物理学'},
    {id: 'pre56', init: 1,  occ: '', inte: '', adj: '', sum: 1,  name: '考古学'},
    {id: 'pre57', init: 1,  occ: '', inte: '', adj: '', sum: 1,  name: '人類学'},
    {id: 'pre58', init: 1,  occ: '', inte: '', adj: '', sum: 1,  name: '天文学'},
    {id: 'pre59', init: 10, occ: '', inte: '', adj: '', sum: 10, name: '博物学'},
    {id: 'pre60', init: 5,  occ: '', inte: '', adj: '', sum: 5,  name: '法律'},
    {id: 'pre61', init: 20, occ: '', inte: '', adj: '', sum: 20, name: '歴史'},
    {id: 'pre62', init: 10, occ: '', inte: '', adj: '', sum: 10, name: '経理'},
]

export default presetSkills