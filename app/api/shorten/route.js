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

    // 随机生成一个 6 位数的短码
    const shortCode = Math.random().toString(36).substring(2, 8);

    // 将映射关系插入到 Supabase 数据库
    const { error } = await supabase
      .from('urls')
      .insert([{ original_url: url, short_code: shortCode }]);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ shortCode });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
