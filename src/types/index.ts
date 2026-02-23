export interface BirthInfo {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  isLunar: boolean;
  leapMonth?: boolean;
}

export interface BaziPillar {
  year: string;
  month: string;
  day: string;
  hour: string;
}

export interface BaziResult {
  pillars: BaziPillar;
  ganZhi: string[];
  wuxing: {
    jin: number;
    mu: number;
    shui: number;
    huo: number;
    tu: number;
  };
  dayMaster: string;
  dayStrength: 'strong' | 'weak' | 'balanced';
  shishen: string[];
  dayun: string[];
  liunian: string[];
}

export interface QimenConfig {
  type: 'shijia' | 'rija';
  year: number;
  month: number;
  day: number;
  hour: number;
}

export interface QimenPalace {
  name: string;
  gong: number;
  jiuStar: string;
  baMen: string;
  baShen: string;
  ganZhi: string;
  tiangan?: string;
  dizhi?: string;
}

export interface QimenResult {
  config: QimenConfig;
  jiaqi: string;
  kunGong: string;
  level: string;
  palaces: QimenPalace[];
}
