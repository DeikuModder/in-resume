import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ResumesService } from '../resumes/resumes.service';

// Fields stripped from all public responses
const SENSITIVE_FIELDS = new Set([
  'userId',
  '_id',
  '__v',
  'phone',
  'secondaryPhone',
  'address',
]);

const RESUME_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const OG_IMAGE_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

@Injectable()
export class PublicService {
  private resumeCache = new Map<string, CacheEntry<object>>();
  private ogImageCache = new Map<string, CacheEntry<Buffer>>();

  constructor(
    private usersService: UsersService,
    private resumesService: ResumesService,
  ) {}

  async findPrimaryResume(username: string): Promise<object> {
    const cacheKey = `primary:${username}`;
    const cached = this.resumeCache.get(cacheKey);
    if (cached && Date.now() < cached.expiresAt) return cached.data;

    const user = await this.usersService.findByUsername(username);
    if (!user) throw new NotFoundException('User not found');

    const resume = await this.resumesService.findPublicPrimary(
      user._id.toString(),
    );
    const sanitized = this.sanitize(resume);
    this.resumeCache.set(cacheKey, {
      data: sanitized,
      expiresAt: Date.now() + RESUME_CACHE_TTL_MS,
    });
    return sanitized;
  }

  async findBySlug(username: string, slug: string): Promise<object> {
    const cacheKey = `slug:${username}:${slug}`;
    const cached = this.resumeCache.get(cacheKey);
    if (cached && Date.now() < cached.expiresAt) return cached.data;

    const user = await this.usersService.findByUsername(username);
    if (!user) throw new NotFoundException('User not found');

    const resume = await this.resumesService.findPublicBySlug(
      user._id.toString(),
      slug,
    );
    const sanitized = this.sanitize(resume);
    this.resumeCache.set(cacheKey, {
      data: sanitized,
      expiresAt: Date.now() + RESUME_CACHE_TTL_MS,
    });
    return sanitized;
  }

  /** Invalidate cache entries for a username (call after resume update). */
  invalidateCache(username: string): void {
    for (const key of this.resumeCache.keys()) {
      if (key.includes(username)) this.resumeCache.delete(key);
    }
    for (const key of this.ogImageCache.keys()) {
      if (key === username) this.ogImageCache.delete(key);
    }
  }

  getCachedOgImage(username: string): Buffer | null {
    const entry = this.ogImageCache.get(username);
    if (entry && Date.now() < entry.expiresAt) return entry.data;
    return null;
  }

  cacheOgImage(username: string, image: Buffer): void {
    this.ogImageCache.set(username, {
      data: image,
      expiresAt: Date.now() + OG_IMAGE_CACHE_TTL_MS,
    });
  }

  private sanitize(resume: any): object {
    const obj: Record<string, unknown> =
      typeof resume.toObject === 'function'
        ? (resume.toObject() as Record<string, unknown>)
        : { ...resume };
    for (const field of SENSITIVE_FIELDS) {
      delete obj[field];
    }
    return obj;
  }
}
