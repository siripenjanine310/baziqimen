const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const WUXING = {
  '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
  '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水'
};

const SHISHEN = {
  '甲': { '甲': '比肩', '乙': '劫财', '丙': '食神', '丁': '伤官', '戊': '偏财', '己': '正财', '庚': '七杀', '辛': '正官', '壬': '偏印', '癸': '正印' },
  '乙': { '甲': '劫财', '乙': '比肩', '丙': '伤官', '丁': '食神', '戊': '正财', '己': '偏财', '庚': '正官', '辛': '七杀', '壬': '正印', '癸': '偏印' },
  '丙': { '甲': '偏印', '乙': '正印', '丙': '比肩', '丁': '劫财', '戊': '食神', '己': '伤官', '庚': '偏财', '辛': '正财', '壬': '七杀', '癸': '正官' },
  '丁': { '甲': '正印', '乙': '偏印', '丙': '劫财', '丁': '比肩', '戊': '伤官', '己': '食神', '庚': '正财', '辛': '偏财', '壬': '正官', '癸': '七杀' },
  '戊': { '甲': '七杀', '乙': '正官', '丙': '偏印', '丁': '正印', '戊': '比肩', '己': '劫财', '庚': '食神', '辛': '伤官', '壬': '偏财', '癸': '正财' },
  '己': { '甲': '正官', '乙': '七杀', '丙': '正印', '丁': '偏印', '戊': '劫财', '己': '比肩', '庚': '伤官', '辛': '食神', '壬': '正财', '癸': '偏财' },
  '庚': { '甲': '偏财', '乙': '正财', '丙': '七杀', '丁': '正官', '戊': '偏印', '己': '正印', '庚': '比肩', '辛': '劫财', '壬': '食神', '癸': '伤官' },
  '辛': { '甲': '正财', '乙': '偏财', '丙': '正官', '丁': '七杀', '戊': '正印', '己': '偏印', '庚': '劫财', '辛': '比肩', '壬': '伤官', '癸': '食神' },
  '壬': { '甲': '食神', '乙': '伤官', '丙': '偏财', '丁': '正财', '戊': '七杀', '己': '正官', '庚': '偏印', '辛': '正印', '壬': '比肩', '癸': '劫财' },
  '癸': { '甲': '伤官', '乙': '食神', '丙': '正财', '丁': '偏财', '戊': '正官', '己': '七杀', '庚': '正印', '辛': '偏印', '壬': '劫财', '癸': '比肩' }
};

const DAY_MASTER_STRENGTH = {
  '甲': { '寅': 'strong', '卯': 'strong', '辰': 'strong', '巳': 'strong', '午': 'strong', '未': 'balanced', '申': 'weak', '酉': 'weak', '戌': 'weak', '亥': 'weak', '子': 'weak', '丑': 'balanced' },
  '乙': { '寅': 'strong', '卯': 'strong', '辰': 'strong', '巳': 'strong', '午': 'strong', '未': 'balanced', '申': 'weak', '酉': 'weak', '戌': 'weak', '亥': 'weak', '子': 'weak', '丑': 'balanced' },
  '丙': { '寅': 'strong', '卯': 'weak', '辰': 'balanced', '巳': 'strong', '午': 'strong', '未': 'balanced', '申': 'weak', '酉': 'weak', '戌': 'weak', '亥': 'weak', '子': 'weak', '丑': 'balanced' },
  '丁': { '寅': 'balanced', '卯': 'strong', '辰': 'balanced', '巳': 'strong', '午': 'strong', '未': 'balanced', '申': 'weak', '酉': 'weak', '戌': 'weak', '亥': 'weak', '子': 'weak', '丑': 'balanced' },
  '戊': { '寅': 'strong', '卯': 'weak', '辰': 'balanced', '巳': 'strong', '午': 'strong', '未': 'strong', '申': 'weak', '酉': 'weak', '戌': 'balanced', '亥': 'weak', '子': 'weak', '丑': 'balanced' },
  '己': { '寅': 'balanced', '卯': 'weak', '辰': 'balanced', '巳': 'strong', '午': 'strong', '未': 'strong', '申': 'weak', '酉': 'weak', '戌': 'balanced', '亥': 'weak', '子': 'weak', '丑': 'balanced' },
  '庚': { '寅': 'weak', '卯': 'weak', '辰': 'balanced', '巳': 'weak', '午': 'strong', '未': 'balanced', '申': 'strong', '酉': 'strong', '戌': 'balanced', '亥': 'weak', '子': 'strong', '丑': 'balanced' },
  '辛': { '寅': 'weak', '卯': 'weak', '辰': 'balanced', '巳': 'weak', '午': 'balanced', '未': 'balanced', '申': 'strong', '酉': 'strong', '戌': 'balanced', '亥': 'weak', '子': 'balanced', '丑': 'balanced' },
  '壬': { '寅': 'balanced', '卯': 'weak', '辰': 'balanced', '巳': 'weak', '午': 'weak', '未': 'balanced', '申': 'strong', '酉': 'strong', '戌': 'balanced', '亥': 'strong', '子': 'strong', '丑': 'balanced' },
  '癸': { '寅': 'balanced', '卯': 'weak', '辰': 'balanced', '巳': 'weak', '午': 'weak', '未': 'balanced', '申': 'balanced', '酉': 'strong', '戌': 'balanced', '亥': 'strong', '子': 'strong', '丑': 'balanced' }
};

function getStemIndex(year: number): number {
  return (year - 4) % 10;
}

function getBranchIndex(year: number): number {
  return (year - 4) % 12;
}

function getMonthBranch(month: number): number {
  const monthBranchMap = [3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2];
  return monthBranchMap[month - 1];
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

function getHourStem(dayStem: number, hourBranch: number): number {
  return (dayStem * 2 + hourBranch) % 10;
}

function countWuxing(ganZhi: string[]): { jin: number; mu: number; shui: number; huo: number; tu: number } {
  const wuxing = { jin: 0, mu: 0, shui: 0, huo: 0, tu: 0 };
  ganZhi.forEach(gz => {
    const w = WUXING[gz[0] as keyof typeof WUXING];
    if (w === '金') wuxing.jin++;
    else if (w === '木') wuxing.mu++;
    else if (w === '水') wuxing.shui++;
    else if (w === '火') wuxing.huo++;
    else if (w === '土') wuxing.tu++;
  });
  return wuxing;
}

export function calculateBazi(birthInfo: { year: number; month: number; day: number; hour: number; minute: number }): {
  pillars: { year: string; month: string; day: string; hour: string };
  ganZhi: string[];
  wuxing: { jin: number; mu: number; shui: number; huo: number; tu: number };
  dayMaster: string;
  dayStrength: 'strong' | 'weak' | 'balanced';
  shishen: string[];
} {
  const yearStem = getStemIndex(birthInfo.year);
  const yearBranch = getBranchIndex(birthInfo.year);
  
  const monthStem = getMonthStem(yearStem, birthInfo.month);
  const monthBranch = getMonthBranch(birthInfo.month);
  
  const dayStem = getDayStem(birthInfo.day);
  const dayBranch = getDayBranch(birthInfo.day);
  
  const hourBranch = getHourBranch(birthInfo.hour);
  const hourStem = getHourStem(dayStem, hourBranch);
  
  const pillars = {
    year: TIANGAN[yearStem] + DIZHI[yearBranch],
    month: TIANGAN[monthStem] + DIZHI[monthBranch],
    day: TIANGAN[dayStem] + DIZHI[dayBranch],
    hour: TIANGAN[hourStem] + DIZHI[hourBranch]
  };
  
  const ganZhi = [pillars.year, pillars.month, pillars.day, pillars.hour];
  const wuxing = countWuxing(ganZhi);
  
  const dayMaster = TIANGAN[dayStem];
  const dayZhi = DIZHI[dayBranch];
  const dayStrength = DAY_MASTER_STRENGTH[dayMaster as keyof typeof DAY_MASTER_STRENGTH][dayZhi as keyof typeof DAY_MASTER_STRENGTH[keyof typeof DAY_MASTER_STRENGTH]] || 'balanced';
  
  const shishen = [
    SHISHEN[dayMaster as keyof typeof SHISHEN][TIANGAN[yearStem] as keyof typeof SHISHEN[keyof typeof SHISHEN]] || '',
    SHISHEN[dayMaster as keyof typeof SHISHEN][TIANGAN[monthStem] as keyof typeof SHISHEN[keyof typeof SHISHEN]] || '',
    SHISHEN[dayMaster as keyof typeof SHISHEN][TIANGAN[dayStem] as keyof typeof SHISHEN[keyof typeof SHISHEN]] || '日主',
    SHISHEN[dayMaster as keyof typeof SHISHEN][TIANGAN[hourStem] as keyof typeof SHISHEN[keyof typeof SHISHEN]] || ''
  ];
  
  return {
    pillars,
    ganZhi,
    wuxing,
    dayMaster,
    dayStrength: dayStrength as 'strong' | 'weak' | 'balanced',
    shishen
  };
}

export function getWuxingName(wuxing: string): string {
  const map: Record<string, string> = { 'jin': '金', 'mu': '木', 'shui': '水', 'huo': '火', 'tu': '土' };
  return map[wuxing] || wuxing;
}

export function getDayun(dayStem: number, _startAge: number = 8): string[] {
  const dayun: string[] = [];
  for (let i = 0; i < 8; i++) {
    const stem = (dayStem + i) % 10;
    const branch = (dayBranch + i) % 12;
    dayun.push(`${TIANGAN[stem]}${DIZHI[branch]}`);
  }
  return dayun;
}

let dayBranch = 0;
export function initDayun(day: number) {
  dayBranch = getDayBranch(day);
}
