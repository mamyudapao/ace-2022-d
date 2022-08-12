import createEmotionServer from '@emotion/server/create-instance';
import { AppType, RenderPageResult } from 'next/dist/shared/lib/utils';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { emotionCache } from '@utils/cache';

class _Document extends Document {
  render() {
    return (
      <Html
        lang="ja"
        style={{
          display: 'none',
        }}
      >
        <Head>
          <meta charSet="utf-8" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="twitter:domain" content="front.d.ace2208.net" />
          <meta name="twitter:site" content="@tapple_official" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="thumbnail" content="/icons/android-chrome-192x192.png" />
          <meta property="og:image" content="https://tapple.me/ogp_img.png" />
          <meta
            property="og:description"
            content="マッチングアプリ「タップル(tapple)」公式ページはこちら！グルメや映画、スポーツ観戦など好きなことから恋の相手を見つけることができる新感覚恋活・婚活・出会いをつなげる恋活・マッチングサービスです！登録とお相手探しはいつでも無料！女性は無料でご利用いただけます"
          />
          <meta
            property="og:title"
            content="タップル(tapple) - 恋活・婚活マッチングアプリ【公式】｜サイバーエージェントグループ企業運営"
          />
          <meta
            name="description"
            content="マッチングアプリ「タップル(tapple)」公式ページはこちら！グルメや映画、スポーツ観戦など好きなことから恋の相手を見つけることができる新感覚恋活・婚活・出会いをつなげる恋活・マッチングサービスです！登録とお相手探しはいつでも無料！女性は無料でご利用いただけます"
          />
          <meta name="msapplication-square70x70logo" content="/icons/site-tile-70x70.png" />
          <meta name="msapplication-square150x150logo" content="/icons/site-tile-150x150.png" />
          <meta name="msapplication-wide310x150logo" content="/icons/site-tile-310x150.png" />
          <meta name="msapplication-square310x310logo" content="/icons/site-tile-310x310.png" />
          <meta name="msapplication-TileColor" content="#0078d7" />
          <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="/favicon.ico" />
          <link rel="icon" type="image/vnd.microsoft.icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-touch-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-touch-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-touch-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-touch-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-touch-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-touch-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-touch-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="36x36" href="/icons/android-chrome-36x36.png" />
          <link rel="icon" type="image/png" sizes="48x48" href="/icons/android-chrome-48x48.png" />
          <link rel="icon" type="image/png" sizes="72x72" href="/icons/android-chrome-72x72.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/icons/android-chrome-96x96.png" />
          <link
            rel="icon"
            type="image/png"
            sizes="128x128"
            href="/icons/android-chrome-128x128.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="144x144"
            href="/icons/android-chrome-144x144.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="152x152"
            href="/icons/android-chrome-152x152.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/icons/android-chrome-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="256x256"
            href="/icons/android-chrome-256x256.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="384x384"
            href="/icons/android-chrome-384x384.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="/icons/android-chrome-512x512.png"
          />
          <link rel="icon" type="image/png" sizes="36x36" href="/icons/icon-36x36.png" />
          <link rel="icon" type="image/png" sizes="48x48" href="/icons/icon-48x48.png" />
          <link rel="icon" type="image/png" sizes="72x72" href="/icons/icon-72x72.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/icons/icon-96x96.png" />
          <link rel="icon" type="image/png" sizes="128x128" href="/icons/icon-128x128.png" />
          <link rel="icon" type="image/png" sizes="144x144" href="/icons/icon-144x144.png" />
          <link rel="icon" type="image/png" sizes="152x152" href="/icons/icon-152x152.png" />
          <link rel="icon" type="image/png" sizes="160x160" href="/icons/icon-160x160.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="196x196" href="/icons/icon-196x196.png" />
          <link rel="icon" type="image/png" sizes="256x256" href="/icons/icon-256x256.png" />
          <link rel="icon" type="image/png" sizes="384x384" href="/icons/icon-384x384.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512x512.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
          <link rel="icon" type="image/png" sizes="24x24" href="/icons/icon-24x24.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

_Document.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage;

  const { extractCriticalToChunks } = createEmotionServer(emotionCache);

  ctx.renderPage = (): RenderPageResult | Promise<RenderPageResult> =>
    originalRenderPage({
      enhanceApp:
        (App: AppType) =>
        (props): JSX.Element =>
          <App {...props} />,
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map(style => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    html: emotionStyles.html,
    styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
  };
};

export default _Document;
