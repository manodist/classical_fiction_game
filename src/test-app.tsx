// Diagnostic test to check if imports work
import { useState } from 'react';

export default function TestApp() {
  const [testResult, setTestResult] = useState<string>('테스트를 시작하세요...');
  const [error, setError] = useState<string>('');

  const runTest = async () => {
    try {
      setTestResult('1. React 로딩 ✅');
      
      // Test types import
      await import('./types');
      setTestResult('2. Types 로딩 ✅');
      
      // Test icons import
      await import('./components/Icons');
      setTestResult('3. Icons 로딩 ✅');
      
      // Test storyGenerator import
      const { generateStory } = await import('./utils/storyGenerator');
      setTestResult('4. Story Generator 로딩 ✅');
      
      // Test story generation
      const story = generateStory('톰 소여의 모험', '초등학교 2~3학년', '김', '테스트');
      setTestResult(`5. 스토리 생성 성공 ✅ (${story.length}개 씬)`);
      
    } catch (err) {
      setError(`❌ 에러 발생: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl mb-6 text-center">🔍 진단 테스트</h1>
        
        <button
          onClick={runTest}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mb-4 transition-all"
        >
          테스트 실행
        </button>
        
        <div className="bg-gray-100 rounded-lg p-4 min-h-[100px]">
          <p className="text-sm text-gray-800 whitespace-pre-wrap">{testResult}</p>
          {error && (
            <p className="text-sm text-red-600 mt-2 whitespace-pre-wrap">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
