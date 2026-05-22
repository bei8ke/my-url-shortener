'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);
    
    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data.codeA && data.codeB && data.codeC) {
        const origin = window.location.origin;
        // 拼接成 3 个完整的短链接
        setResults({
          urlA: `${origin}/${data.codeA}`,
          urlB: `${origin}/${data.codeB}`,
          urlC: `${origin}/${data.codeC}`,
        });
      } else {
        alert(data.error || '生成失败，服务器返回了: ' + JSON.stringify(data));
      
      }
    } catch (err) {
      alert('请求出错，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '550px', margin: '60px auto', padding: '30px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: '12px', border: '1px solid #eee' }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>⚡ 三合一短链接生成器</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="url"
          placeholder="请输入原始长链接 (例如: https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          style={{ padding: '12px', fontSize: '15px', borderRadius: '6px', border: '1px solid #ddd', outline: 'none' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '12px', fontSize: '15px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          {loading ? '正在生成...' : '一键生成 3 组短链接'}
        </button>
      </form>

      {results && (
        <div style={{ marginTop: '25px', textAlign: 'left', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef' }}>
          <p style={{ margin: '0 0 15px 0', color: '#28a745', fontSize: '14px', fontWeight: 'bold', textAlign: 'center' }}>🎉 生成成功！</p>
          
          <div style={{ marginBottom: '15px' }}>
            <span style={{ display: 'block', fontSize: '13px', color: '#666', marginBottom: '4px', fontWeight: 'bold' }}>🔗 短链接 URL A (原链接直达):</span>
            <a href={results.urlA} target="_blank" rel="noreferrer" style={{ color: '#0070f3', wordBreak: 'break-all', textDecoration: 'none' }}>
              {results.urlA}
            </a>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <span style={{ display: 'block', fontSize: '13px', color: '#666', marginBottom: '4px', fontWeight: 'bold' }}>🌐 短链接 URL B (谷歌翻译包装):</span>
            <a href={results.urlB} target="_blank" rel="noreferrer" style={{ color: '#28a745', wordBreak: 'break-all', textDecoration: 'none' }}>
              {results.urlB}
            </a>
          </div>

          <div>
            <span style={{ display: 'block', fontSize: '13px', color: '#666', marginBottom: '4px', fontWeight: 'bold' }}>🔀 短链接 URL C (谷歌重定向包装):</span>
            <a href={results.urlC} target="_blank" rel="noreferrer" style={{ color: '#dc3545', wordBreak: 'break-all', textDecoration: 'none' }}>
              {results.urlC}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
