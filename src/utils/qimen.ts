const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const JIUXING = ['天蓬', '天任', '天冲', '天辅', '天禽', '天心', '天柱', '天英', '天芮'];
const BAMEN = ['休', '生', '伤', '杜', '景', '死', '惊', '开'];
const BASHEN = ['值符', '腾蛇', '太阴', '六合', '白虎', '玄武', '九地', '九天'];

function getYearStem(year: number): number {
  return (year - 4) % 10;
}

function getYearBranch(year: number): number {
  return (year - 4) % 12;
}

function getMonthStem(yearStem: number, month: number): number {
  return (yearStem * 2 + month) % 10;
}

function getDayStem(day: number): number {
  return (day + 6) % 10;
}

function getDayBranch(day: number): number {
  return (day + 8) % 12;
}

function getHourBranch(hour: number): number {
  if (hour >= 23 || hour < 1) return 0;
  return Math.floor((hour + 1) / 2) % 12;
}

export function calculateQimen(config: { year: number; month: number; day: number; hour: number }): {
  jiaqi: string;
  kunGong: string;
  level: string;
  palaces: Array<{
    name: string;
    jiuStar: string;
    baMen: string;
    baShen: string;
    ganZhi: string;
  }>;
} {
  const yearStem = getYearStem(config.year);
  const yearBranch = getYearBranch(config.year);
  const monthStem = getMonthStem(yearStem, config.month);
  const dayStem = getDayStem(config.day);
  const dayBranch = getDayBranch(config.day);
  const hourBranch = getHourBranch(config.hour);
  
  const jiaqi = `${TIANGAN[yearStem]}${DIZHI[yearBranch]}`;
  
  const jia = (dayStem + 1) % 10;
  const level = getLevel(dayBranch);
  
  const jiuStarStart = getJiuStarStart(monthStem, dayBranch);
  const baMenStart = getBaMenStart(monthStem, dayBranch, hourBranch);
  const baShenStart = getBaShenStart(monthStem, dayBranch);
  
  const palaces = [];
  const gongNames = ['坎', '坤', '震', '巽', '中', '乾', '兑', '艮'];
  
  for (let i = 0; i < 9; i++) {
    const jiuStar = JIUXING[(jiuStarStart + i) % 9];
    const baMen = BAMEN[(baMenStart + i) % 8];
    const baShen = BASHEN[(baShenStart + i) % 8];
    
    const ganIndex = (jia + i) % 10;
    const zhiIndex = (dayBranch + i) % 12;
    const ganZhi = TIANGAN[ganIndex] + DIZHI[zhiIndex];
    
    palaces.push({
      name: gongNames[i] || '中',
      jiuStar,
      baMen,
      baShen,
      ganZhi
    });
  }
  
  return {
    jiaqi,
    kunGong: '坎',
    level,
    palaces
  };
}

function getLevel(dayBranch: number): string {
  const levels = ['阳遁一局', '阳遁二局', '阳遁三局', '阳遁四局', '阳遁五局', 
                  '阳遁六局', '阳遁七局', '阳遁八局', '阳遁九局',
                  '阴遁一局', '阴遁二局', '阴遁三局', '阴遁四局', '阴遁五局',
                  '阴遁六局', '阴遁七局', '阴遁八局', '阴遁九局'];
  
  const dayun = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  const idx = dayBranch % 12;
  return levels[dayun[idx] - 1] || '阳遁一局';
}

function getJiuStarStart(monthStem: number, dayBranch: number): number {
  return (monthStem + dayBranch) % 9;
}

function getBaMenStart(monthStem: number, dayBranch: number, hourBranch: number): number {
  return (monthStem + dayBranch + hourBranch) % 8;
}

function getBaShenStart(monthStem: number, dayBranch: number): number {
  return (monthStem + dayBranch) % 8;
}

export function getPalaceMeaning(palace: { jiuStar: string; baMen: string; baShen: string }): string {
  const starMeanings: Record<string, string> = {
    '天蓬': '适合商业、养殖、航海',
    '天任': '适合农业、建材、房地产',
    '天冲': '适合体育、军事、動作行业',
    '天辅': '适合教育、文化、传播',
    '天禽': '适合金融、管理、统筹',
    '天心': '适合医疗、行政、管理',
    '天柱': '适合法律、娱乐、工程',
    '天英': '适合艺术、演艺、餐饮',
    '天芮': '适合农业、医疗、教育'
  };
  
  const menMeanings: Record<string, string> = {
    '休': '休闲、旅游、保险',
    '生': '创业、投资、房地产',
    '伤': '体育、竞争、讨债',
    '杜': '保密、技术、研发',
    '景': '广告、演艺、饮食',
    '死': '丧葬、税务、执法',
    '惊': '律师、娱乐、讲师',
    '开': '创业、扩张、谈判'
  };
  
  const shenMeanings: Record<string, string> = {
    '值符': '高档、贵人、权力',
    '腾蛇': '虚诈、变化、神秘',
    '太阴': '阴私、策划、储备',
    '六合': '合作、婚姻、中介',
    '白虎': '凶险、伤病、政法',
    '玄武': '盗贼、阴谋、欺诈',
    '九地': '稳定、收藏、待机',
    '九天': '行动、理想、远方'
  };
  
  return `${starMeanings[palace.jiuStar] || ''} | ${menMeanings[palace.baMen] || ''} | ${shenMeanings[palace.baShen] || ''}`;
}
