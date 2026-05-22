'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShortUrl('');
    
    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data.shortCode) {
        const origin = window.location.origin;
        setShortUrl(`${origin}/${data.shortCode}`);
      } else {
        alert(data.error || '生成失败');
      }
    } catch (err) {
      alert('请求出错，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '500px', margin: '100px auto', padding: '30px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: '12px', border: '1px solid #eee' }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>⚡ 免费短链接生成器</h2>
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
          {loading ? '正在生成...' : '生成短链接'}
        </button>
      </form>
      {shortUrl && (
        <div style={{ marginTop: '25px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px', border: '1px solid #e9ecef' }}>
          <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>🎉 生成成功！您的短链接：</p>
          <a href={shortUrl} target="_blank" rel="noreferrer" style={{ color: '#0070f3', fontWeight: 'bold', wordBreak: 'break-all', textDecoration: 'none' }}>
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}
