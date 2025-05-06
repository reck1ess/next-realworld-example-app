/* eslint-disable @next/next/no-css-tags */
import type { Metadata, Viewport } from "next";

import ContextProvider from "lib/context";
import "styles.css";
import Layout from "@/components/common/Layout";

export const viewport: Viewport = {
  themeColor: 'black',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  appleWebApp: {
    title: 'Apple Web App',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    },
  },
  keywords: "nextjs, realworld",
  openGraph: {
    locale: "en_US",
    siteName: "next-realworld",
    title: "Next.js relaworld example app",
    description: "Next.js + SWR codebase containing realworld examples",
    url: "https://next-realworld.now.sh/",
    images: [{
      url: "https://next-realworld.now.sh/images/share-link.png",
      width: 800,
      height: 600,
    }]
  },
  manigest: "/manifest.json",
  twitter: {
    card: "next-realworld",
    title: "Next.js realworld example app",
    description: "Next.js + SWR codebase containing realworld examples",
    images: ["https://machimban.com/images/talk-link.jpg"],
    url: "https://next-realworld.now.sh/"
  },
  icons: {
    icon: [
      {
        url: "/images/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        url: "/images/android-icon-32x32.png",
        sizes: "32x32",
        type: "image/png"
      },
      {
        url: "/images/android-icon-96x96.png",
        sizes: "96x96",
        type: "image/png"
      },
      {
        url: "/images/android-icon-16x16.png",
        sizes: "16x16",
        type: "image/png"
      }
    ],
    apple: [
      {
        url: "/images/apple-icon-57x57.png",
        sizes: "57x57",
        type: "image/png"
      },
      {
        url: "/images/apple-icon-60x60.png",
        sizes: "60x60",
        type: "image/png"
      },
      {
        url: "/images/apple-icon-72x72.png",
        sizes: "72x72",
        type: "image/png"
      },
      {
        url: "/images/apple-icon-76x76.png",
        sizes: "76x76",
        type: "image/png"
      },
      {
        url: "/images/apple-icon-114x114.png",
        sizes: "114x114",
        type: "image/png"
      },
      {
        url: "/images/apple-icon-120x120.png",
        sizes: "120x120",
        type: "image/png"
      },
      {
        url: "/images/apple-icon-144x144.png",
        sizes: "144x144",
        type: "image/png"
      },
      {
        url: "/images/apple-icon-152x152.png",
        sizes: "152x152",
        type: "image/png"
      },
      {
        url: "/images/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png"
      },
      {
        url: "/images/apple-icon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      }
    ]
  }
};
//Good to know: The msapplication-* meta tags are no longer supported in Chromium builds of Microsoft Edge, and thus no longer needed.


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google" content="notranslate" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="stylesheet" href="//demo.productionready.io/main.css" />
        <link
          rel="stylesheet"
          href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
        />
        <link
          rel="stylesheet"
          href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
              "@context": "http://schema.org/",
              "@type": "Organization",
              "url": "https://next-realworld.now.sh/",
              "logo": "https://next-realworld.now.sh/images/share-link.png",
              "sameAs": [
                "https://realworld.io",
                "https://medium.com/@ericsimons/introducing-realworld-6016654d36b5",
              ],
            }`,
          }}
        />
      </head>
      <body>
        <ContextProvider>
          <Layout>
            {children}
          </Layout>
        </ContextProvider>
      </body>
    </html>
  );
}
