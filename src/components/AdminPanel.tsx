import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Download, 
  Trash2, 
  X,
  Clock,
  Award,
  Brain,
  Globe,
  Monitor
} from 'lucide-react';
import { 
  calculateStats,
  calculateStatsFromGoogleSheets,
  clearAllData, 
  exportToCSV,
  type ParticipantSession 
} from '../utils/analytics';
import { fetchFromGoogleSheets } from '../utils/googleSheets';

interface AdminPanelProps {
  onClose: () => void;
}

// ✅ 게임 후기 모달 컴포넌트
interface ReviewModalProps {
  session: ParticipantSession;
  onClose: () => void;
}

function ReviewModal({ session, onClose }: ReviewModalProps) {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-blue-500/30 max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-full p-2">
              <span className="text-2xl">💭</span>
            </div>
            <div>
              <h3 className="text-white text-lg">게임 후기</h3>
              <p className="text-blue-100 text-sm">{session.playerName} · {session.bookTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/10 rounded-full p-2 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* 내용 */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
          {session.gameReview ? (
            <div className="space-y-4">
              {/* 세션 정보 */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <div>
                  <p className="text-gray-400 text-xs mb-1">플레이 날짜</p>
                  <p className="text-white text-sm">
                    {new Date(session.timestamp).toLocaleString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">별점</p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-4 h-4 ${
                          star <= (session.starRating || 0)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-gray-600 text-gray-600'
                        }`}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 후기 내용 */}
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/20">
                <p className="text-white text-base leading-relaxed whitespace-pre-wrap">
                  {session.gameReview}
                </p>
              </div>
              
              {/* 통계 */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-gray-400 text-xs mb-1">답변 수</p>
                  <p className="text-white text-lg">{session.answerCount || 0}개</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-gray-400 text-xs mb-1">참여율</p>
                  <p className="text-white text-lg">{Math.round((session.participationRate || 0) * 100)}%</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-gray-400 text-xs mb-1">생각 깊이</p>
                  <p className="text-white text-lg">{Math.round((session.thoughtfulnessRatio || 0) * 100)}%</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-800/50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">💭</span>
              </div>
              <p className="text-gray-400 text-lg mb-2">후기가 없습니다</p>
              <p className="text-gray-500 text-sm">이 사용자는 게임 후기를 작성하지 않았습니다.</p>
            </div>
          )}
        </div>
        
        {/* 푸터 */}
        <div className="px-6 py-4 bg-white/5 border-t border-white/10 flex justify-end">
          <Button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
}

const COLORS = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444'];

export function AdminPanel({ onClose }: AdminPanelProps) {
  const [stats, setStats] = useState(() => calculateStats());
  const [activeTab, setActiveTab] = useState<'overview' | 'books' | 'sessions' | 'rankings'>('overview');
  const [dataSource, setDataSource] = useState<'local' | 'global'>('local');
  const [isLoadingGlobal, setIsLoadingGlobal] = useState(false);
  const [selectedReviewSession, setSelectedReviewSession] = useState<ParticipantSession | null>(null); // ✅ 후기 모달 상태

  // 디버깅: 순위 데이터 확인
  useEffect(() => {
    console.log('📊 순위 데이터:', {
      dataSource,
      totalSessions: stats.totalSessions,
      rankedSessionsCount: stats.rankedSessions.length,
      rankedSessions: stats.rankedSessions,
      recentSessions: stats.recentSessions.map(s => ({
        name: s.playerName,
        completed: s.completed,
        starRating: s.starRating,
        answerCount: s.answerCount
      }))
    });
  }, [stats, dataSource]);

  // Google Sheets 데이터 불러오기
  const loadGlobalData = async () => {
    setIsLoadingGlobal(true);
    try {
      const sheetsData = await fetchFromGoogleSheets();
      if (sheetsData.length > 0) {
        const globalStats = calculateStatsFromGoogleSheets(sheetsData);
        setStats(globalStats);
        console.log(`✅ 전체 데이터 로드 완료: ${sheetsData.length}개 세션`);
      } else {
        console.warn('⚠️ Google Sheets에 데이터가 없습니다');
        alert('Google Sheets에 아직 데이터가 없습니다.\n\n게임을 완료하면 자동으로 데이터가 저장됩니다.');
        // 로컬 모드로 되돌리기
        setDataSource('local');
        setStats(calculateStats());
      }
    } catch (error) {
      console.error('❌ 전체 데이터 로드 실패:', error);
      
      // 상세한 에러 메시지
      let errorMessage = '전체 데이터를 불러오는데 실패했습니다.\n\n';
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        errorMessage += '🔍 문제 진단:\n\n';
        errorMessage += '1. Google Apps Script 배포 확인\n';
        errorMessage += '   - Apps Script 편집기 열기\n';
        errorMessage += '   - doGet() 함수가 있는지 확인\n';
        errorMessage += '   - 배포 → 배포 관리 → 새 버전 배포\n\n';
        errorMessage += '2. 배포 설정 확인\n';
        errorMessage += '   - "액세스 권한: 모든 사용자" 설정\n\n';
        errorMessage += '3. URL 재확인\n';
        errorMessage += '   - /utils/sheets-config.ts의 URL이 정확한지 확인\n\n';
        errorMessage += '자세한 내용은 콘솔(F12)을 확인하세요.';
      } else {
        errorMessage += error instanceof Error ? error.message : String(error);
      }
      
      alert(errorMessage);
      
      // 로컬 모드로 되돌리기
      setDataSource('local');
      setStats(calculateStats());
    } finally {
      setIsLoadingGlobal(false);
    }
  };

  // 데이터 소스 변경 핸들러
  const handleDataSourceChange = async (source: 'local' | 'global') => {
    setDataSource(source);
    if (source === 'local') {
      setStats(calculateStats());
    } else {
      await loadGlobalData();
    }
  };

  useEffect(() => {
    // 로컬 모드에서만 5초마다 통계 업데이트
    if (dataSource === 'local') {
      const interval = setInterval(() => {
        setStats(calculateStats());
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [dataSource]);

  const handleExport = () => {
    const csv = exportToCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `참여자_데이터_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearData = () => {
    clearAllData();
    setStats(calculateStats());
  };

  // 학년별 분포 데이터
  const gradeData = Object.entries(stats.gradeDistribution).map(([grade, count]) => {
    const labels: Record<string, string> = {
      'elementary-2-3': '초등 2-3',
      'elementary-4-6': '초등 4-6',
      'middle-school-1': '중1',
      'middle-school-2': '중2',
      'middle-school-3': '중3',
    };
    return {
      name: labels[grade] || grade,
      count,
    };
  });

  // 인기 작품 상위 10개
  const popularBooksData = Object.entries(stats.popularBooks)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([book, count]) => ({
      name: book.length > 15 ? book.slice(0, 15) + '...' : book,
      fullName: book,
      count,
    }));

  // 시간대별 활동 (최근 7일)
  const timelineData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
    
    const sessionsOnDate = stats.recentSessions.filter(session => {
      const sessionDate = new Date(session.timestamp);
      return sessionDate.toDateString() === date.toDateString();
    }).length;
    
    return {
      date: dateStr,
      sessions: sessionsOnDate,
    };
  });

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
      {/* ✅ 게임 후기 모달 */}
      {selectedReviewSession && (
        <ReviewModal
          session={selectedReviewSession}
          onClose={() => setSelectedReviewSession(null)}
        />
      )}
      
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-white mb-2">관리자 대시보드</h1>
              <p className="text-gray-400">참여자 데이터 및 통계 분석</p>
            </div>
            <div className="flex items-center gap-4">
              {/* 데이터 소스 선택 */}
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">데이터:</span>
                <Button
                  onClick={() => handleDataSourceChange('local')}
                  size="sm"
                  variant={dataSource === 'local' ? 'default' : 'outline'}
                  className={dataSource === 'local' ? '' : 'bg-white/5 border-white/20 text-white hover:bg-white/10'}
                >
                  <Monitor className="mr-1 h-4 w-4" />
                  로컬
                </Button>
                <Button
                  onClick={() => handleDataSourceChange('global')}
                  size="sm"
                  variant={dataSource === 'global' ? 'default' : 'outline'}
                  className={dataSource === 'global' ? '' : 'bg-white/5 border-white/20 text-white hover:bg-white/10'}
                  disabled={isLoadingGlobal}
                >
                  <Globe className="mr-1 h-4 w-4" />
                  {isLoadingGlobal ? '로딩...' : '전체'}
                </Button>
              </div>
              <Button
                onClick={onClose}
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                <X className="mr-2 h-5 w-5" />
                닫기
              </Button>
            </div>
          </div>

          {/* 탭 */}
          <div className="flex gap-2 mb-6">
            <Button
              onClick={() => setActiveTab('overview')}
              variant={activeTab === 'overview' ? 'default' : 'outline'}
              className={activeTab === 'overview' ? '' : 'bg-white/5 border-white/20 text-white hover:bg-white/10'}
            >
              개요
            </Button>
            <Button
              onClick={() => setActiveTab('books')}
              variant={activeTab === 'books' ? 'default' : 'outline'}
              className={activeTab === 'books' ? '' : 'bg-white/5 border-white/20 text-white hover:bg-white/10'}
            >
              작품 통계
            </Button>
            <Button
              onClick={() => setActiveTab('sessions')}
              variant={activeTab === 'sessions' ? 'default' : 'outline'}
              className={activeTab === 'sessions' ? '' : 'bg-white/5 border-white/20 text-white hover:bg-white/10'}
            >
              최근 세션
            </Button>
            <Button
              onClick={() => setActiveTab('rankings')}
              variant={activeTab === 'rankings' ? 'default' : 'outline'}
              className={activeTab === 'rankings' ? '' : 'bg-white/5 border-white/20 text-white hover:bg-white/10'}
            >
              순위
            </Button>
          </div>

          {/* 개요 탭 */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 주요 지표 카드 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="h-8 w-8 text-purple-400" />
                  </div>
                  <div className="text-3xl text-white mb-1">{stats.totalSessions}</div>
                  <div className="text-purple-200">총 참여 세션</div>
                </Card>

                <Card className="bg-gradient-to-br from-pink-500/20 to-pink-600/20 border-pink-500/30 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <BookOpen className="h-8 w-8 text-pink-400" />
                  </div>
                  <div className="text-3xl text-white mb-1">{stats.uniqueBooks.size}</div>
                  <div className="text-pink-200">플레이된 작품 수</div>
                </Card>

                <Card className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 border-amber-500/30 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="h-8 w-8 text-amber-400" />
                  </div>
                  <div className="text-3xl text-white mb-1">
                    {stats.averageCompletionRate.toFixed(1)}%
                  </div>
                  <div className="text-amber-200">평균 완료율</div>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Brain className="h-8 w-8 text-emerald-400" />
                  </div>
                  <div className="text-3xl text-white mb-1">{stats.totalThoughts}</div>
                  <div className="text-emerald-200">총 생각 기록</div>
                </Card>
              </div>

              {/* 차트 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 학년별 분포 */}
                <Card className="bg-white/5 border-white/10 p-6">
                  <h3 className="text-white mb-4">학년별 분포</h3>
                  {gradeData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={gradeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {gradeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '8px',
                            color: 'white'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[250px] flex items-center justify-center text-gray-400">
                      데이터가 없습니다
                    </div>
                  )}
                </Card>

                {/* 일별 활동 */}
                <Card className="bg-white/5 border-white/10 p-6">
                  <h3 className="text-white mb-4">최근 7일 활동</h3>
                  {timelineData.some(d => d.sessions > 0) ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={timelineData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis 
                          dataKey="date" 
                          stroke="rgba(255,255,255,0.5)"
                          tick={{ fill: 'rgba(255,255,255,0.7)' }}
                        />
                        <YAxis 
                          stroke="rgba(255,255,255,0.5)"
                          tick={{ fill: 'rgba(255,255,255,0.7)' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '8px'
                          }}
                          labelStyle={{ color: 'white' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="sessions" 
                          stroke="#8b5cf6" 
                          strokeWidth={2}
                          dot={{ fill: '#8b5cf6', r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[250px] flex items-center justify-center text-gray-400">
                      데이터가 없습니다
                    </div>
                  )}
                </Card>
              </div>
            </div>
          )}

          {/* 작품 통계 탭 */}
          {activeTab === 'books' && (
            <div className="space-y-6">
              <Card className="bg-white/5 border-white/10 p-6">
                <h3 className="text-white mb-4">인기 작품 TOP 10</h3>
                {popularBooksData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={popularBooksData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        type="number" 
                        stroke="rgba(255,255,255,0.5)"
                        tick={{ fill: 'rgba(255,255,255,0.7)' }}
                      />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        stroke="rgba(255,255,255,0.5)"
                        tick={{ fill: 'rgba(255,255,255,0.7)' }}
                        width={120}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '8px'
                        }}
                        labelStyle={{ color: 'white' }}
                        formatter={(value: number, name: string, props: any) => {
                          return [value, props.payload.fullName];
                        }}
                      />
                      <Bar dataKey="count" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[400px] flex items-center justify-center text-gray-400">
                    데이터가 없습니다
                  </div>
                )}
              </Card>

              {/* 작품 목록 */}
              <Card className="bg-white/5 border-white/10 p-6">
                <h3 className="text-white mb-4">전체 작품 통계</h3>
                <div className="space-y-2">
                  {Object.entries(stats.popularBooks)
                    .sort(([, a], [, b]) => b - a)
                    .map(([book, count], index) => (
                      <div 
                        key={book}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 text-sm">
                            {index + 1}
                          </div>
                          <span className="text-white">{book}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-amber-400" />
                          <span className="text-white">{count}회</span>
                        </div>
                      </div>
                    ))}
                  {Object.keys(stats.popularBooks).length === 0 && (
                    <div className="text-center text-gray-400 py-8">
                      아직 플레이된 작품이 없습니다
                    </div>
                  )}
                </div>
              </Card>
            </div>
          )}

          {/* 최근 세션 탭 */}
          {activeTab === 'sessions' && (
            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-white mb-4">최근 세션 (최대 20개)</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-gray-300 p-3">이름</th>
                      <th className="text-left text-gray-300 p-3">시작 시간</th>
                      <th className="text-left text-gray-300 p-3">작품명</th>
                      <th className="text-left text-gray-300 p-3">학년</th>
                      <th className="text-left text-gray-300 p-3">진행도</th>
                      <th className="text-left text-gray-300 p-3">생각 기록</th>
                      <th className="text-left text-gray-300 p-3">생각 깊이</th>
                      <th className="text-left text-gray-300 p-3">게임 후기</th>
                      <th className="text-left text-gray-300 p-3">상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentSessions.map((session) => {
                      const gradeLabels: Record<string, string> = {
                        'elementary-2-3': '초등 2-3',
                        'elementary-4-6': '초등 4-6',
                        'middle-school-1': '중1',
                        'middle-school-2': '중2',
                        'middle-school-3': '중3',
                      };
                      
                      // ✅ 완료된 세션은 무조건 100%, 그 외는 계산
                      const progress = session.completed 
                        ? 100
                        : (session.totalPages > 0 
                            ? Math.round((session.currentPage / session.totalPages) * 100)
                            : 0);

                      return (
                        <tr 
                          key={session.sessionId}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          <td className="p-3 text-white">
                            {session.playerName || '이름없음'}
                          </td>
                          <td className="p-3 text-gray-300">
                            {new Date(session.timestamp).toLocaleString('ko-KR', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </td>
                          <td className="p-3 text-white">{session.bookTitle}</td>
                          <td className="p-3 text-gray-300">
                            {gradeLabels[session.gradeLevel] || session.gradeLevel}
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 max-w-[100px] h-2 bg-white/10 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                              <span className="text-gray-300 text-sm">{progress}%</span>
                            </div>
                          </td>
                          <td className="p-3 text-gray-300">
                            {Object.keys(session.thoughts).length}개
                          </td>
                          <td className="p-3">
                            {session.thoughtfulnessRatio !== undefined ? (
                              <div className="flex items-center gap-2">
                                <div className="flex-1 max-w-[80px] h-2 bg-white/10 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full transition-all ${
                                      session.thoughtfulnessRatio >= 0.7 
                                        ? 'bg-gradient-to-r from-emerald-500 to-green-500'
                                        : session.thoughtfulnessRatio >= 0.4
                                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500'
                                        : 'bg-gradient-to-r from-gray-500 to-gray-400'
                                    }`}
                                    style={{ width: `${Math.round((session.thoughtfulnessRatio || 0) * 100)}%` }}
                                  />
                                </div>
                                <span className={`text-sm ${
                                  session.thoughtfulnessRatio >= 0.7 
                                    ? 'text-emerald-300'
                                    : session.thoughtfulnessRatio >= 0.4
                                    ? 'text-amber-300'
                                    : 'text-gray-400'
                                }`}>
                                  {Math.round((session.thoughtfulnessRatio || 0) * 100)}%
                                </span>
                              </div>
                            ) : (
                              <span className="text-gray-500 text-sm">-</span>
                            )}
                          </td>
                          <td className="p-3">
                            {session.gameReview ? (
                              <button
                                onClick={() => setSelectedReviewSession(session)}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm hover:bg-blue-500/30 transition-all cursor-pointer"
                              >
                                💭 보기
                              </button>
                            ) : (
                              <span className="text-gray-500 text-sm">-</span>
                            )}
                          </td>
                          <td className="p-3">
                            {session.completed ? (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-sm">
                                <Award className="h-3 w-3" />
                                완료
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20 text-amber-300 text-sm">
                                <Clock className="h-3 w-3" />
                                진행중
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {stats.recentSessions.length === 0 && (
                  <div className="text-center text-gray-400 py-8">
                    아직 세션 데이터가 없습니다
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* 순위 탭 */}
          {activeTab === 'rankings' && (
            <Card className="bg-white/5 border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white">순위 (별점 & 답변 개수 기준)</h3>
                {stats.rankedSessions.length > 0 && (
                  <span className="text-sm text-gray-400">
                    총 {stats.rankedSessions.length}명
                  </span>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-gray-300 p-3">순위</th>
                      <th className="text-left text-gray-300 p-3">이름</th>
                      <th className="text-left text-gray-300 p-3">작품명</th>
                      <th className="text-left text-gray-300 p-3">학년</th>
                      <th className="text-left text-gray-300 p-3">별점</th>
                      <th className="text-left text-gray-300 p-3">생각 깊이</th>
                      <th className="text-left text-gray-300 p-3">답변 수</th>
                      <th className="text-left text-gray-300 p-3">참여율</th>
                      <th className="text-left text-gray-300 p-3">시간</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.rankedSessions.map((session, index) => {
                      const gradeLabels: Record<string, string> = {
                        'elementary-2-3': '초등 2-3',
                        'elementary-4-6': '초등 4-6',
                        'middle-school-1': '중1',
                        'middle-school-2': '중2',
                        'middle-school-3': '중3',
                      };
                      
                      const rankColors = [
                        'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
                        'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900',
                        'bg-gradient-to-r from-orange-400 to-orange-600 text-white',
                      ];
                      
                      const rankIcons = ['🥇', '🥈', '🥉'];
                      
                      return (
                        <tr 
                          key={session.sessionId}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          <td className="p-3">
                            {index < 3 ? (
                              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${rankColors[index]} shadow-lg`}>
                                <span className="text-lg">{rankIcons[index]}</span>
                              </div>
                            ) : (
                              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-gray-300">
                                {index + 1}
                              </div>
                            )}
                          </td>
                          <td className="p-3 text-white font-medium">
                            {session.playerName || '이름없음'}
                          </td>
                          <td className="p-3 text-gray-300">{session.bookTitle}</td>
                          <td className="p-3 text-gray-300">
                            {gradeLabels[session.gradeLevel] || session.gradeLevel}
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= (session.starRating || 0)
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'fill-gray-600 text-gray-600'
                                  }`}
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                              ))}
                            </div>
                          </td>
                          <td className="p-3">
                            {session.thoughtfulnessRatio !== undefined ? (
                              <div className="flex items-center gap-2">
                                <div className="flex-1 max-w-[80px] h-2 bg-white/10 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full transition-all ${
                                      session.thoughtfulnessRatio >= 0.7 
                                        ? 'bg-gradient-to-r from-emerald-500 to-green-500'
                                        : session.thoughtfulnessRatio >= 0.4
                                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500'
                                        : 'bg-gradient-to-r from-gray-500 to-gray-400'
                                    }`}
                                    style={{ width: `${Math.round((session.thoughtfulnessRatio || 0) * 100)}%` }}
                                  />
                                </div>
                                <span className={`text-sm ${
                                  session.thoughtfulnessRatio >= 0.7 
                                    ? 'text-emerald-300'
                                    : session.thoughtfulnessRatio >= 0.4
                                    ? 'text-amber-300'
                                    : 'text-gray-400'
                                }`}>
                                  {Math.round((session.thoughtfulnessRatio || 0) * 100)}%
                                </span>
                              </div>
                            ) : (
                              <span className="text-gray-500 text-sm">-</span>
                            )}
                          </td>
                          <td className="p-3">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300">
                              <Brain className="h-3 w-3" />
                              {session.answerCount || 0}개
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="text-emerald-300">
                              {Math.round((session.participationRate || 0) * 100)}%
                            </span>
                          </td>
                          <td className="p-3 text-gray-400 text-sm">
                            {new Date(session.timestamp).toLocaleString('ko-KR', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {stats.rankedSessions.length === 0 && (
                  <div className="text-center text-gray-400 py-8">
                    아직 완료된 게임이 없습니다<br/>
                    <span className="text-sm">(게임을 완료해야 순위에 등록됩니다)</span>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* 액션 버튼 */}
          <div className="flex gap-4 mt-8">
            <Button
              onClick={handleExport}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Download className="mr-2 h-4 w-4" />
              CSV로 내보내기
            </Button>
            <Button
              onClick={handleClearData}
              variant="outline"
              className="bg-red-500/10 border-red-500/30 text-red-300 hover:bg-red-500/20"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              모든 데이터 삭제
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}