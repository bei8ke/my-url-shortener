'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 纯前端直接拼接：谷歌翻译前缀 + 编码后的输入网址
    const encodedUrl = encodeURIComponent(url.trim());
    const finalUrl = `https://translate.google.com/translate?sl=auto&tl=en&u=${encodedUrl}`;
    
    setResult(finalUrl);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    alert('链接已成功复制到剪贴板！');
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '550px', margin: '80px auto', padding: '30px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: '12px', border: '1px solid #eee', backgroundColor: '#fff' }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>🌐 谷歌翻译链接拼接器</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="url"
          placeholder="请输入网址 (例如: https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          style={{ padding: '12px', fontSize: '15px', borderRadius: '6px', border: '1px solid #ddd', outline: 'none' }}
        />
        <button type="submit" style={{ padding: '12px', fontSize: '15px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          立即转换
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '25px', textAlign: 'left', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef' }}>
          <p style={{ margin: '0 0 10px 0', color: '#28a745', fontSize: '14px', fontWeight: 'bold' }}>🎉 转换成功！</p>
          <div style={{ wordBreak: 'break-all', backgroundColor: '#fff', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px', color: '#333', marginBottom: '12px' }}>
            {result}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <a href={result} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: 'center', padding: '10px', backgroundColor: '#28a745', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold' }}>
              直接打开
            </a>
            <button onClick={handleCopy} style={{ flex: 1, padding: '10px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '14px', cursor: 'pointer', fontWeight: 'bold' }}>
              复制链接
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
