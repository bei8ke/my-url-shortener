import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request) {
  try {
    const { url } = await request.json();
    if (!url) {
      return Response.json({ error: '请提供有效的 URL' }, { status: 400 });
    }

    // 1. 生成 3 个不同的随机短码
    const codeA = Math.random().toString(36).substring(2, 8);
    const codeB = Math.random().toString(36).substring(2, 8);
    const codeC = Math.random().toString(36).substring(2, 8);

    // 2. 构造包装后的链接
    const targetB = `https://translate.google.com/translate?sl=auto&tl=en&u=${encodeURIComponent(url)}`;
    const targetC = `https://www.google.com/url?q=${encodeURIComponent(targetB)}`;

    // 3. 批量插入到 Supabase
    const { error } = await supabase
      .from('urls')
      .insert([
        { original_url: url, short_code: codeA },
        { original_url: targetB, short_code: codeB },
        { original_url: targetC, short_code: codeC }
      ]);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    // 4. 必须返回这三个新钥匙
    return Response.json({ codeA, codeB, codeC });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
