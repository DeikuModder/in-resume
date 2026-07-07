import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { ResumesService } from '../resumes/resumes.service';

@Injectable()
export class PdfService {
  private readonly frontendUrl: string;

  constructor(
    private resumesService: ResumesService,
    private configService: ConfigService,
  ) {
    this.frontendUrl = this.configService.get<string>(
      'FRONTEND_URL',
      'http://localhost:5173',
    );
  }

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

    // Build the localStorage payload that the frontend SPA expects
    const cvInfo = {
      name: data.name ?? '',
      pictureUrl: data.pictureUrl ?? '',
      role: data.role ?? '',
      address: data.address ?? '',
      email: data.email ?? '',
      phone: data.phone ?? '',
      secondaryPhone: data.secondaryPhone ?? '',
      gitHubUser: data.gitHubUser ?? '',
      gitHubUrl: data.gitHubUrl ?? '',
      linkedinUser: data.linkedinUser ?? '',
      linkedinUrl: data.linkedinUrl ?? '',
      aboutMe: data.aboutMe ?? '',
      projects: data.projects ?? [],
      education: data.education ?? [],
      experience: data.experience ?? [],
      languages: data.languages ?? [],
      skills: data.skills ?? [],
      softSkills: data.softSkills ?? [],
      certificates: data.certificates ?? [],
      slot: 'main',
      hiddenSections: data.hiddenSections ?? [],
    };

    const templateId: string = data.templateId || 'default';
    const accentColor: string = data.accentColor || '#1e3a5f';
    const sectionOrder: string[] = data.sectionOrder ?? [];
    const sidebarOrder: string[] = data.sidebarOrder ?? [];

    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });

    try {
      const page = await browser.newPage();

      // Inject localStorage values BEFORE the SPA loads so React reads them on mount
      await page.evaluateOnNewDocument(
        (ls: Record<string, string>) => {
          for (const [key, value] of Object.entries(ls)) {
            localStorage.setItem(key, value);
          }
        },
        {
          cvInfo: JSON.stringify(cvInfo),
          templateId,
          accentColor,
          sectionOrder: JSON.stringify(sectionOrder),
          sidebarOrder: JSON.stringify(sidebarOrder),
        },
      );

      await page.goto(this.frontendUrl, { waitUntil: 'networkidle0', timeout: 30000 });

      // Wait for the resume content to be present in the DOM
      await page.waitForSelector('[data-resume-ready]', { timeout: 10000 }).catch(() => {
        // Selector is optional; fall through if not found
      });

      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '0', bottom: '0', left: '0', right: '0' },
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
}