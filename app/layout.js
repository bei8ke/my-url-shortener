export const metadata = {
  title: '⚡ 免费短链接生成器',
  description: '快速生成您的专属短网址',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#fafafa' }}>
        {children}
      </body>
    </html>
  );
}
