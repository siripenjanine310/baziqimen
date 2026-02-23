import { useState } from 'react';
import { calculateBazi } from './utils/bazi';
import { calculateQimen, getPalaceMeaning } from './utils/qimen';

type Page = 'home' | 'bazi' | 'qimen' | 'bazi-result' | 'qimen-result';

function App() {
  const [page, setPage] = useState<Page>('home');
  const [birthInfo, setBirthInfo] = useState({
    year: 1990,
    month: 1,
    day: 1,
    hour: 12,
    minute: 0
  });
  const [baziResult, setBaziResult] = useState<any>(null);
  const [qimenResult, setQimenResult] = useState<any>(null);

  const handleBaziCalculate = () => {
    const result = calculateBazi(birthInfo);
    setBaziResult(result);
    setPage('bazi-result');
  };

  const handleQimenCalculate = () => {
    const result = calculateQimen({
      year: birthInfo.year,
      month: birthInfo.month,
      day: birthInfo.day,
      hour: birthInfo.hour
    });
    setQimenResult(result);
    setPage('qimen-result');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-4">
      <div className="max-w-md mx-auto">
        {page === 'home' && (
          <HomePage onNavigate={setPage} />
        )}
        {page === 'bazi' && (
          <BaziInputPage 
            birthInfo={birthInfo} 
            setBirthInfo={setBirthInfo}
            onCalculate={handleBaziCalculate}
            onBack={() => setPage('home')}
          />
        )}
        {page === 'qimen' && (
          <QimenInputPage 
            birthInfo={birthInfo}
            setBirthInfo={setBirthInfo}
            onCalculate={handleQimenCalculate}
            onBack={() => setPage('home')}
          />
        )}
        {page === 'bazi-result' && baziResult && (
          <BaziResultPage 
            result={baziResult}
            onBack={() => setPage('bazi')}
          />
        )}
        {page === 'qimen-result' && qimenResult && (
          <QimenResultPage 
            result={qimenResult}
            onBack={() => setPage('qimen')}
          />
        )}
      </div>
    </div>
  );
}

function HomePage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-serif text-[#d4af37] mb-2">八字奇门</h1>
      <p className="text-[#a0a0a0] mb-12">传统命理·智慧人生</p>
      
      <div className="space-y-4">
        <button 
          onClick={() => onNavigate('bazi')}
          className="w-full py-4 px-6 bg-gradient-to-r from-[#e94560] to-[#d4af37] rounded-lg text-white font-semibold text-lg hover:opacity-90 transition"
        >
          🧧 八字排盘
        </button>
        
        <button 
          onClick={() => onNavigate('qimen')}
          className="w-full py-4 px-6 bg-gradient-to-r from-[#16213e] to-[#1a1a2e] border border-[#d4af37] rounded-lg text-[#d4af37] font-semibold text-lg hover:bg-[#d4af37]/10 transition"
        >
          ⛩️ 奇门遁甲
        </button>
      </div>
      
      <div className="mt-12 text-[#a0a0a0] text-sm">
        <p>结合八字与奇门遁甲</p>
        <p>探索命运与决策之道</p>
      </div>
    </div>
  );
}

function BaziInputPage({ 
  birthInfo, 
  setBirthInfo, 
  onCalculate, 
  onBack 
}: { 
  birthInfo: any; 
  setBirthInfo: any; 
  onCalculate: () => void; 
  onBack: () => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-serif text-[#d4af37] text-center mb-8">出生信息</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-[#a0a0a0] mb-2">年份</label>
          <input 
            type="number" 
            value={birthInfo.year}
            onChange={(e) => setBirthInfo({...birthInfo, year: parseInt(e.target.value)})}
            className="w-full p-3 bg-[#16213e] border border-[#d4af37]/30 rounded-lg text-white"
          />
        </div>
        
        <div>
          <label className="block text-[#a0a0a0] mb-2">月份</label>
          <input 
            type="number" 
            min="1" max="12"
            value={birthInfo.month}
            onChange={(e) => setBirthInfo({...birthInfo, month: parseInt(e.target.value)})}
            className="w-full p-3 bg-[#16213e] border border-[#d4af37]/30 rounded-lg text-white"
          />
        </div>
        
        <div>
          <label className="block text-[#a0a0a0] mb-2">日期</label>
          <input 
            type="number" 
            min="1" max="31"
            value={birthInfo.day}
            onChange={(e) => setBirthInfo({...birthInfo, day: parseInt(e.target.value)})}
            className="w-full p-3 bg-[#16213e] border border-[#d4af37]/30 rounded-lg text-white"
          />
        </div>
        
        <div>
          <label className="block text-[#a0a0a0] mb-2">时辰 (小时)</label>
          <select 
            value={birthInfo.hour}
            onChange={(e) => setBirthInfo({...birthInfo, hour: parseInt(e.target.value)})}
            className="w-full p-3 bg-[#16213e] border border-[#d4af37]/30 rounded-lg text-white"
          >
            {Array.from({length: 24}, (_, i) => (
              <option key={i} value={i}>{i}:00</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex gap-4 mt-8">
        <button 
          onClick={onBack}
          className="flex-1 py-3 border border-[#a0a0a0] rounded-lg text-[#a0a0a0]"
        >
          返回
        </button>
        <button 
          onClick={onCalculate}
          className="flex-1 py-3 bg-[#e94560] rounded-lg text-white font-semibold"
        >
          开始排盘
        </button>
      </div>
    </div>
  );
}

function BaziResultPage({ result, onBack }: { result: any; onBack: () => void }) {
  const wuxingColors: Record<string, string> = {
    '金': 'text-yellow-400',
    '木': 'text-green-400',
    '水': 'text-blue-400',
    '火': 'text-red-400',
    '土': 'text-orange-400'
  };

  return (
    <div>
      <h2 className="text-2xl font-serif text-[#d4af37] text-center mb-6">八字命盘</h2>
      
      <div className="bg-[#16213e]/50 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-4 gap-2 text-center font-mono">
          <div className="text-[#a0a0a0]">年柱</div>
          <div className="text-[#a0a0a0]">月柱</div>
          <div className="text-[#a0a0a0]">日柱</div>
          <div className="text-[#a0a0a0]">时柱</div>
          
          <div className="text-xl font-bold text-white">{result.pillars.year}</div>
          <div className="text-xl font-bold text-white">{result.pillars.month}</div>
          <div className="text-xl font-bold text-[#e94560]">{result.pillars.day}</div>
          <div className="text-xl font-bold text-white">{result.pillars.hour}</div>
        </div>
      </div>
      
      <div className="bg-[#16213e]/50 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-serif text-[#d4af37] mb-4">五行分布</h3>
        <div className="grid grid-cols-5 gap-2 text-center">
          <div className={wuxingColors['金']}>
            <div className="text-2xl font-bold">{result.wuxing.jin}</div>
            <div className="text-sm">金</div>
          </div>
          <div className={wuxingColors['木']}>
            <div className="text-2xl font-bold">{result.wuxing.mu}</div>
            <div className="text-sm">木</div>
          </div>
          <div className={wuxingColors['水']}>
            <div className="text-2xl font-bold">{result.wuxing.shui}</div>
            <div className="text-sm">水</div>
          </div>
          <div className={wuxingColors['火']}>
            <div className="text-2xl font-bold">{result.wuxing.huo}</div>
            <div className="text-sm">火</div>
          </div>
          <div className={wuxingColors['土']}>
            <div className="text-2xl font-bold">{result.wuxing.tu}</div>
            <div className="text-sm">土</div>
          </div>
        </div>
      </div>
      
      <div className="bg-[#16213e]/50 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-serif text-[#d4af37] mb-4">命主信息</h3>
        <div className="space-y-2 text-white">
          <p>日主: <span className="text-[#e94560] font-bold">{result.dayMaster}</span></p>
          <p>身强弱: 
            <span className={result.dayStrength === 'strong' ? 'text-green-400' : result.dayStrength === 'weak' ? 'text-red-400' : 'text-yellow-400'}>
              {result.dayStrength === 'strong' ? '身强' : result.dayStrength === 'weak' ? '身弱' : '平衡'}
            </span>
          </p>
        </div>
      </div>
      
      <div className="bg-[#16213e]/50 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-serif text-[#d4af37] mb-4">十神</h3>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div>
            <div className="text-[#a0a0a0] text-sm">年</div>
            <div className="text-white">{result.shishen[0]}</div>
          </div>
          <div>
            <div className="text-[#a0a0a0] text-sm">月</div>
            <div className="text-white">{result.shishen[1]}</div>
          </div>
          <div>
            <div className="text-[#a0a0a0] text-sm">日</div>
            <div className="text-[#e94560]">{result.shishen[2]}</div>
          </div>
          <div>
            <div className="text-[#a0a0a0] text-sm">时</div>
            <div className="text-white">{result.shishen[3]}</div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={onBack}
        className="w-full py-3 border border-[#d4af37] rounded-lg text-[#d4af37]"
      >
        重新输入
      </button>
    </div>
  );
}

function QimenInputPage({ 
  birthInfo, 
  setBirthInfo,
  onCalculate, 
  onBack 
}: { 
  birthInfo: any; 
  setBirthInfo: any;
  onCalculate: () => void; 
  onBack: () => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-serif text-[#d4af37] text-center mb-8">奇门起局</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-[#a0a0a0] mb-2">年份</label>
          <input 
            type="number" 
            value={birthInfo.year}
            onChange={(e) => setBirthInfo({...birthInfo, year: parseInt(e.target.value)})}
            className="w-full p-3 bg-[#16213e] border border-[#d4af37]/30 rounded-lg text-white"
          />
        </div>
        
        <div>
          <label className="block text-[#a0a0a0] mb-2">月份</label>
          <input 
            type="number" 
            min="1" max="12"
            value={birthInfo.month}
            onChange={(e) => setBirthInfo({...birthInfo, month: parseInt(e.target.value)})}
            className="w-full p-3 bg-[#16213e] border border-[#d4af37]/30 rounded-lg text-white"
          />
        </div>
        
        <div>
          <label className="block text-[#a0a0a0] mb-2">日期</label>
          <input 
            type="number" 
            min="1" max="31"
            value={birthInfo.day}
            onChange={(e) => setBirthInfo({...birthInfo, day: parseInt(e.target.value)})}
            className="w-full p-3 bg-[#16213e] border border-[#d4af37]/30 rounded-lg text-white"
          />
        </div>
        
        <div>
          <label className="block text-[#a0a0a0] mb-2">时辰 (小时)</label>
          <select 
            value={birthInfo.hour}
            onChange={(e) => setBirthInfo({...birthInfo, hour: parseInt(e.target.value)})}
            className="w-full p-3 bg-[#16213e] border border-[#d4af37]/30 rounded-lg text-white"
          >
            {Array.from({length: 24}, (_, i) => (
              <option key={i} value={i}>{i}:00</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex gap-4 mt-8">
        <button 
          onClick={onBack}
          className="flex-1 py-3 border border-[#a0a0a0] rounded-lg text-[#a0a0a0]"
        >
          返回
        </button>
        <button 
          onClick={onCalculate}
          className="flex-1 py-3 bg-[#d4af37] rounded-lg text-[#1a1a2e] font-semibold"
        >
          起局
        </button>
      </div>
    </div>
  );
}

function QimenResultPage({ result, onBack }: { result: any; onBack: () => void }) {
  return (
    <div>
      <h2 className="text-2xl font-serif text-[#d4af37] text-center mb-6">奇门遁甲</h2>
      
      <div className="bg-[#16213e]/50 rounded-lg p-4 mb-6">
        <div className="text-center text-white mb-2">
          <span className="text-[#a0a0a0]">节气: </span>
          <span className="font-mono">{result.jiaqi}</span>
        </div>
        <div className="text-center text-white">
          <span className="text-[#a0a0a0]">局数: </span>
          <span className="font-mono text-[#d4af37]">{result.level}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {result.palaces.map((palace: any, index: number) => (
          <div key={index} className="bg-[#16213e]/50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xl font-serif text-[#d4af37]">{palace.name}</span>
              <span className="font-mono text-white">{palace.ganZhi}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div>
                <span className="text-[#a0a0a0]">九星: </span>
                <span className="text-white">{palace.jiuStar}</span>
              </div>
              <div>
                <span className="text-[#a0a0a0]">八门: </span>
                <span className="text-white">{palace.baMen}</span>
              </div>
              <div>
                <span className="text-[#a0a0a0]">八神: </span>
                <span className="text-white">{palace.baShen}</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-[#a0a0a0]">
              {getPalaceMeaning(palace)}
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={onBack}
        className="w-full py-3 border border-[#d4af37] rounded-lg text-[#d4af37] mt-6"
      >
        重新起局
      </button>
    </div>
  );
}

export default App;
