<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap | Moon Group of Industries</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 14px;
            color: #f3f4f6;
            background-color: #0b0f19;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 1000px;
            margin: 0 auto;
            background: #111827;
            border: 1px solid #1f2937;
            border-radius: 12px;
            padding: 32px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
          }
          .header {
            border-bottom: 1px solid #1f2937;
            padding-bottom: 24px;
            margin-bottom: 24px;
          }
          h1 {
            color: #ffffff;
            font-size: 28px;
            font-weight: 700;
            margin: 0 0 8px 0;
            letter-spacing: -0.025em;
          }
          p {
            color: #9ca3af;
            margin: 0;
            line-height: 1.5;
          }
          .accent {
            color: #ef4444;
            font-weight: 600;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            text-align: left;
          }
          th {
            background-color: #1f2937;
            color: #e5e7eb;
            font-weight: 600;
            padding: 14px 16px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-bottom: 2px solid #374151;
          }
          tr:nth-child(even) {
            background-color: #111827;
          }
          tr:nth-child(odd) {
            background-color: #151d30;
          }
          tr:hover {
            background-color: #1f2937;
          }
          td {
            padding: 14px 16px;
            border-bottom: 1px solid #1f2937;
            color: #d1d5db;
          }
          a {
            color: #ef4444;
            text-decoration: none;
            font-weight: 500;
          }
          a:hover {
            text-decoration: underline;
          }
          .priority-badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 600;
            font-family: monospace;
            background-color: #374151;
            color: #f3f4f6;
          }
          .priority-high {
            background-color: rgba(239, 68, 68, 0.2);
            color: #fca5a5;
            border: 1px solid rgba(239, 68, 68, 0.3);
          }
          .footer {
            margin-top: 32px;
            text-align: center;
            font-size: 12px;
            color: #6b7280;
            border-top: 1px solid #1f2937;
            padding-top: 16px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>XML Sitemap</h1>
            <p>Generated for <span class="accent">Moon Group of Industries (Moon Builders)</span>. This sitemap is designed to help search engines like Google discover and index all key sections of our platform efficiently.</p>
            <p style="margin-top: 8px;">Total URLs: <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong></p>
          </div>
          
          <table>
            <thead>
              <tr>
                <th style="width: 55%;">URL Location</th>
                <th style="width: 15%;">Priority</th>
                <th style="width: 15%;">Change Freq</th>
                <th style="width: 15%;">Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <xsl:sort select="sitemap:priority" order="descending"/>
                <tr>
                  <td>
                    <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                  </td>
                  <td>
                    <span class="priority-badge">
                      <xsl:if test="number(sitemap:priority) &gt;= 0.8">
                        <xsl:attribute name="class">priority-badge priority-high</xsl:attribute>
                      </xsl:if>
                      <xsl:value-of select="sitemap:priority"/>
                    </span>
                  </td>
                  <td style="text-transform: capitalize;">
                    <xsl:value-of select="sitemap:changefreq"/>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:lastmod"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
          
          <div class="footer">
            © 2026 Moon Group of Industries Ltd. All rights reserved. | Built for Google Search Console &amp; Bing Webmaster indexing.
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
