import {
  Controller,
  Get,
  Param,
  Redirect,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import { Throttle } from '@nestjs/throttler';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { PublicService } from './public.service';
import { isBot } from './bot-detection.middleware';

@Controller()
export class PublicController {
  private readonly frontendUrl: string;
  private readonly appDomain: string;

  constructor(
    private publicService: PublicService,
    private configService: ConfigService,
  ) {
    this.frontendUrl = this.configService.get<string>(
      'FRONTEND_URL',
      'http://localhost:5173',
    );
    this.appDomain = this.configService.get<string>(
      'APP_DOMAIN',
      'inresume.com',
    );
  }

  @Throttle({ default: { ttl: 60000, limit: 60 } })
  @Get('u/:username')
  async getPrimaryResume(
    @Param('username') username: string,
    @Res() res: Response,
  ) {
    const ua = res.req.headers['user-agent'];
    if (isBot(ua)) {
      const html = await this.buildOgHtml(username);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=300');
      return res.send(html);
    }
    return res.redirect(302, `${this.frontendUrl}/u/${username}`);
  }

  @Throttle({ default: { ttl: 60000, limit: 60 } })
  @Get('u/:username/:slug')
  async getResumeBySlug(
    @Param('username') username: string,
    @Param('slug') slug: string,
    @Res() res: Response,
  ) {
    const ua = res.req.headers['user-agent'];
    if (isBot(ua)) {
      const html = await this.buildOgHtml(username, slug);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=300');
      return res.send(html);
    }
    return res.redirect(302, `${this.frontendUrl}/u/${username}/${slug}`);
  }

  /** JSON endpoint for the SPA to fetch resume data. */
  @Throttle({ default: { ttl: 60000, limit: 60 } })
  @Get('api/public/:username')
  async getPublicResumeJson(@Param('username') username: string) {
    const resume = await this.publicService.findPrimaryResume(username);
    return resume;
  }

  @Throttle({ default: { ttl: 60000, limit: 60 } })
  @Get('api/public/:username/:slug')
  async getPublicResumeBySlugJson(
    @Param('username') username: string,
    @Param('slug') slug: string,
  ) {
    return this.publicService.findBySlug(username, slug);
  }

  /** OG social preview image — 1200x630 PNG. */
  @Throttle({ default: { ttl: 60000, limit: 30 } })
  @Get('og-image/:username')
  async getOgImage(@Param('username') username: string, @Res() res: Response) {
    const cached = this.publicService.getCachedOgImage(username);
    if (cached) {
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      return res.end(cached);
    }

    let resumeData: any;
    try {
      resumeData = await this.publicService.findPrimaryResume(username);
    } catch {
      throw new NotFoundException('No public resume for this user');
    }

    const html = this.buildOgCardHtml(resumeData as any);
    const image = await this.renderOgImage(html);
    this.publicService.cacheOgImage(username, image);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.end(image);
  }

  // ─── Private helpers ────────────────────────────────────────────────────────

  private async buildOgHtml(username: string, slug?: string): Promise<string> {
    let name = username;
    let role = '';
    try {
      const resume: any = slug
        ? await this.publicService.findBySlug(username, slug)
        : await this.publicService.findPrimaryResume(username);
      name = resume.name || username;
      role = resume.role || '';
    } catch {
      // Non-existent resume — still serve valid OG HTML
    }

    const baseUrl = `https://${this.appDomain}`;
    const profileUrl = slug
      ? `${baseUrl}/u/${username}/${slug}`
      : `${baseUrl}/u/${username}`;
    const title = role
      ? `${this.esc(name)} — ${this.esc(role)}`
      : this.esc(name);

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="View my resume on IN-RESUMÉ" />
  <meta property="og:image" content="${baseUrl}/api/og-image/${username}" />
  <meta property="og:url" content="${profileUrl}" />
  <meta property="og:type" content="profile" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="View my resume on IN-RESUMÉ" />
  <meta name="twitter:image" content="${baseUrl}/api/og-image/${username}" />
</head>
<body></body>
</html>`;
  }

  private buildOgCardHtml(resume: {
    name?: string;
    role?: string;
    aboutMe?: string;
    skills?: string[];
  }): string {
    const name = this.esc(resume.name ?? 'Resume');
    const role = this.esc(resume.role ?? '');
    const about = this.esc((resume.aboutMe ?? '').slice(0, 160));
    const skills = (resume.skills ?? [])
      .slice(0, 8)
      .map(
        (s) =>
          `<span style="background:#1e3a5f;color:#fff;padding:4px 12px;border-radius:20px;font-size:14px;">${this.esc(s)}</span>`,
      )
      .join(' ');

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1200px; height: 630px; overflow: hidden;
      font-family: 'Segoe UI', Arial, sans-serif;
      background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%);
      color: #f8fafc;
      display: flex; align-items: center; justify-content: center;
    }
    .card {
      width: 1100px; padding: 60px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 20px;
    }
    h1 { font-size: 56px; font-weight: 700; letter-spacing: -1px; margin-bottom: 8px; }
    .role { font-size: 26px; color: #94a3b8; margin-bottom: 24px; }
    .about { font-size: 18px; color: #cbd5e1; line-height: 1.5; margin-bottom: 30px; }
    .skills { display: flex; flex-wrap: wrap; gap: 8px; }
    .brand { position: absolute; bottom: 40px; right: 60px; font-size: 14px; color: #475569; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${name}</h1>
    ${role ? `<div class="role">${role}</div>` : ''}
    ${about ? `<div class="about">${about}</div>` : ''}
    <div class="skills">${skills}</div>
  </div>
  <div class="brand">inresume.com</div>
</body>
</html>`;
  }

  private async renderOgImage(html: string): Promise<Buffer> {
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
    try {
      const page = await browser.newPage();
      await page.setViewport({
        width: 1200,
        height: 630,
        deviceScaleFactor: 1,
      });
      await page.setContent(html, { waitUntil: 'load' });
      const screenshot = await page.screenshot({ type: 'png' });
      return Buffer.from(screenshot);
    } finally {
      await browser.close();
    }
  }

  private esc(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}
