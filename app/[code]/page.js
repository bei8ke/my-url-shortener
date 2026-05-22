import { createClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

// 强制每次请求都实时查询数据库，防止 Vercel 静态缓存
export const dynamic = 'force-dynamic';

export default async function RedirectPage({ params }) {
  const { code } = params;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // 从 Supabase 数据库查找对应的原链接
  const { data, error } = await supabase
    .from('urls')
    .select('original_url')
    .eq('short_code', code)
    .single();

  if (error || !data) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '48px', color: '#ff4d4f' }}>404</h1>
        <p style={{ fontSize: '18px', color: '#666' }}>抱歉，该短链接不存在或已失效。</p>
        <a href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>返回首页</a>
      </div>
    );
  }

  // 成功找到，直接重定向跳转
  redirect(data.original_url);
}
