import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { ResumesService } from '../resumes/resumes.service';

@Injectable()
export class PdfService {
  constructor(private resumesService: ResumesService) {}

  async generate(
    userId: string,
    slotName: string,
    options?: { watermark?: boolean },
  ): Promise<Buffer> {
    const resume = await this.resumesService.findBySlot(userId, slotName);
    return this.generateFromData(resume, options);
  }

  async generateFromData(
    data: any,
    options?: { watermark?: boolean },
  ): Promise<Buffer> {
    const watermark = options?.watermark ?? false;
    const html = this.buildHtml(data);

    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
    });

    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'load' });
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          bottom: watermark ? '25mm' : '20mm',
          left: '15mm',
          right: '15mm',
        },
        displayHeaderFooter: watermark,
        headerTemplate: '<span></span>',
        footerTemplate: watermark
          ? `<div style="width:100%;text-align:center;font-size:9px;
               color:#999;font-family:Arial,sans-serif;padding-bottom:6px;">
               Created with <strong style="color:#1e3a5f;">inresume.com</strong>
               &nbsp;&middot;&nbsp; Remove watermark with <strong>Premium</strong>
             </div>`
          : '<span></span>',
      });
      return Buffer.from(pdf);
    } finally {
      await browser.close();
    }
  }

  private buildHtml(resume: any): string {
    const skillBadges = ((resume.skills ?? []) as string[])
      .map(
        (s) =>
          `<span style="display:inline-block;padding:3px 10px;background:#1e3a5f;color:#fff;border-radius:4px;font-size:12px;margin:3px;">${this.esc(s)}</span>`,
      )
      .join('');

    const experienceItems = (resume.experience ?? [])
      .map(
        (j: any) => `
        <div style="margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;">
            <strong>${this.esc(j.role)}</strong>
            <span style="color:#666;font-size:12px;">${this.esc(j.start_date)} – ${this.esc(j.end_date)}</span>
          </div>
          <div style="color:#444;">${this.esc(j.company_name)}</div>
          <p style="margin:4px 0;font-size:13px;">${this.esc(j.summary)}</p>
        </div>`,
      )
      .join('');

    const educationItems = (resume.education ?? [])
      .map(
        (e: any) => `
        <div style="margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;">
            <strong>${this.esc(e.title)}</strong>
            <span style="color:#666;font-size:12px;">${this.esc(e.start_date)} – ${this.esc(e.end_date)}</span>
          </div>
          <div style="color:#444;">${this.esc(e.institution_name)}</div>
        </div>`,
      )
      .join('');

    const projectItems = (resume.projects ?? [])
      .map(
        (p: any) => `
        <div style="margin-bottom:10px;">
          <strong>${this.esc(p.project_name)}</strong>
          ${p.project_link ? `<a href="${this.esc(p.project_link)}" style="margin-left:8px;font-size:12px;color:#1e3a5f;">${this.esc(p.project_link)}</a>` : ''}
          <p style="margin:4px 0;font-size:13px;">${this.esc(p.description)}</p>
          ${p.tags ? `<div style="font-size:11px;color:#888;">${this.esc(p.tags)}</div>` : ''}
        </div>`,
      )
      .join('');

    const certItems = (resume.certificates ?? [])
      .map(
        (c: any) => `
        <div style="margin-bottom:8px;">
          <strong>${this.esc(c.title)}</strong> – ${this.esc(c.issuing_authority)}
          <span style="color:#666;font-size:12px;margin-left:8px;">${this.esc(c.date)}</span>
        </div>`,
      )
      .join('');

    const languageItems = (resume.languages ?? [])
      .map(
        (l: any) =>
          `<span style="margin-right:16px;"><strong>${this.esc(l.languageName)}</strong>: ${this.esc(l.level)}</span>`,
      )
      .join('');

    const softSkillItems = (resume.softSkills ?? [])
      .map(
        (s: any) => `
        <div style="margin-bottom:6px;">
          <strong>${this.esc(s.name)}</strong>
          ${s.description ? `<span style="color:#555;font-size:12px;"> – ${this.esc(s.description)}</span>` : ''}
        </div>`,
      )
      .join('');

    const section = (title: string, content: string) =>
      content.trim()
        ? `<div style="margin-bottom:20px;">
            <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #1e3a5f;padding-bottom:4px;margin-bottom:10px;color:#1e3a5f;">${title}</h2>
            ${content}
           </div>`
        : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px; color: #222; }
    a { color: #1e3a5f; text-decoration: none; }
  </style>
</head>
<body>
  <div style="background:#1e3a5f;color:#fff;padding:24px 30px 20px;">
    <h1 style="font-size:26px;font-weight:700;margin-bottom:4px;">${this.esc(resume.name || 'Your Name')}</h1>
    <div style="font-size:15px;opacity:0.85;">${this.esc(resume.role || '')}</div>
    <div style="margin-top:10px;font-size:12px;display:flex;flex-wrap:wrap;gap:12px;">
      ${resume.email ? `<span>✉ ${this.esc(resume.email)}</span>` : ''}
      ${resume.phone ? `<span>📞 ${this.esc(resume.phone)}</span>` : ''}
      ${resume.address ? `<span>📍 ${this.esc(resume.address)}</span>` : ''}
      ${resume.linkedinUser ? `<span>in/${this.esc(resume.linkedinUser)}</span>` : ''}
      ${resume.gitHubUser ? `<span>github/${this.esc(resume.gitHubUser)}</span>` : ''}
    </div>
  </div>

  <div style="padding:24px 30px;">
    ${section('Profile', resume.aboutMe ? `<p style="line-height:1.6;">${this.esc(resume.aboutMe)}</p>` : '')}
    ${section('Work Experience', experienceItems)}
    ${section('Education', educationItems)}
    ${section('Projects', projectItems)}
    ${section('Certificates', certItems)}
    ${section('Languages', languageItems)}
    ${section('Soft Skills', softSkillItems)}
    ${section('Tech Stack', skillBadges)}
  </div>
</body>
</html>`;
  }

  private esc(value: unknown): string {
    if (value === null || value === undefined) return '';
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}
