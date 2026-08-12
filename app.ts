import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { IconComponent } from './icon.component';
import { RevealDirective } from './reveal.directive';
import {
  PROFILE,
  SKILLS,
  EXPERIENCE,
  EDUCATION,
  CERTIFICATIONS,
  ExperienceItem,
  SkillItem,
} from './portfolio-data';

interface ActiveSkill extends SkillItem {
  category: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  readonly profile = PROFILE;
  readonly skills = SKILLS;
  readonly experience = EXPERIENCE;
  readonly education = EDUCATION;
  readonly certifications = CERTIFICATIONS;
  readonly year = new Date().getFullYear();
  readonly nameWords = PROFILE.name.split(' ');

  // Profile links — `icon` renders a brand SVG, `mono` renders a lettermark badge
  readonly socials = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/sonam-yadav-71645420a/',
      color: '10, 102, 194',
      icon: 'linkedin',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Sonamyadav6768',
      color: '201, 209, 217',
      icon: 'github',
    },
    {
      name: 'LeetCode',
      url: 'https://leetcode.com/u/sonamyadav6768/',
      color: '255, 161, 22',
      icon: 'leetcode',
    },
    {
      name: 'CodeChef',
      url: 'https://www.codechef.com/users/sonam_7198',
      color: '190, 130, 90',
      mono: 'CC',
    },
    {
      name: 'GeeksforGeeks',
      url: 'https://www.geeksforgeeks.org/profile/sonamyadav71981',
      color: '47, 141, 70',
      mono: 'GfG',
    },
    {
      name: 'Code Studio',
      url: 'https://www.naukri.com/code360/profile/bd353d3c-5b86-4339-b4eb-00bebe215b89',
      color: '255, 107, 0',
      mono: 'CS',
    },
    {
      name: 'HackerRank',
      url: 'https://www.hackerrank.com/profile/sonamyadav7198',
      color: '0, 200, 100',
      mono: 'HR',
    },
  ];

  readonly navLinks = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
  ];

  scrolled = signal(false);
  menuOpen = signal(false);
  progress = signal(0);
  activeSection = signal('home');

  // ===== Popups =====
  activeExp = signal<ExperienceItem | null>(null);
  activeSkill = signal<ActiveSkill | null>(null);

  // ===== Skills coverflow deck =====
  skillIndex = signal(0);

  setSkill(i: number): void {
    this.skillIndex.set(i);
  }
  nextSkill(): void {
    this.skillIndex.update((i) => (i + 1) % this.skills.length);
  }
  prevSkill(): void {
    this.skillIndex.update((i) => (i - 1 + this.skills.length) % this.skills.length);
  }
  onCardClick(i: number): void {
    // Clicking a side card brings it to the front; clicking the front card
    // advances the deck — so any card click produces motion.
    if (this.skillIndex() === i) {
      this.nextSkill();
    } else {
      this.setSkill(i);
    }
  }
  onSkillClick(event: Event, category: string, skill: SkillItem): void {
    event.stopPropagation();
    this.openSkill(category, skill);
  }

  // shortest circular distance of card i from the active card
  private relOffset(i: number): number {
    const n = this.skills.length;
    let d = i - this.skillIndex();
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  }
  cardTransform(i: number): string {
    const r = Math.max(-3, Math.min(3, this.relOffset(i)));
    const x = r * 260;
    const z = -Math.abs(r) * 130;
    const rot = r * -20;
    const scale = 1 - Math.min(Math.abs(r), 3) * 0.16;
    return `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${rot}deg) scale(${scale})`;
  }
  cardZ(i: number): number {
    return 20 - Math.abs(this.relOffset(i));
  }
  cardVisible(i: number): boolean {
    return Math.abs(this.relOffset(i)) <= 2;
  }
  cardOpacity(i: number): number {
    const r = Math.abs(this.relOffset(i));
    if (r === 0) return 1;
    if (r === 1) return 0.72;
    if (r === 2) return 0.4;
    return 0;
  }

  // ===== Typewriter rotator =====
  private readonly roles = [
    'Full-Stack Software Developer',
    'Angular Specialist',
    'API & Backend Engineer',
    'Cloud & DevOps Enthusiast',
  ];
  typed = signal('');
  private roleIndex = 0;
  private charIndex = 0;
  private deleting = false;
  private typeTimer?: ReturnType<typeof setTimeout>;

  private ticking = false;

  ngOnInit(): void {
    this.tick();
  }

  ngOnDestroy(): void {
    if (this.typeTimer) {
      clearTimeout(this.typeTimer);
    }
  }

  private tick(): void {
    const current = this.roles[this.roleIndex];
    this.charIndex += this.deleting ? -1 : 1;
    this.typed.set(current.slice(0, this.charIndex));

    let delay = this.deleting ? 45 : 90;
    if (!this.deleting && this.charIndex === current.length) {
      delay = 1600;
      this.deleting = true;
    } else if (this.deleting && this.charIndex === 0) {
      this.deleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      delay = 400;
    }
    this.typeTimer = setTimeout(() => this.tick(), delay);
  }

  // ===== Scroll (rAF-throttled to avoid layout thrash) =====
  @HostListener('window:scroll')
  onScroll(): void {
    if (this.ticking) {
      return;
    }
    this.ticking = true;
    requestAnimationFrame(() => {
      this.readScroll();
      this.ticking = false;
    });
  }

  private readScroll(): void {
    const y = window.scrollY;
    this.scrolled.set(y > 20);

    const doc = document.documentElement;
    const height = doc.scrollHeight - doc.clientHeight;
    this.progress.set(height > 0 ? (y / height) * 100 : 0);

    const ids = ['home', ...this.navLinks.map((l) => l.id)];
    const mid = window.innerHeight * 0.35;
    let current = 'home';
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= mid) {
        current = id;
      }
    }
    this.activeSection.set(current);
  }

  // ===== Popup controls =====
  openExp(exp: ExperienceItem): void {
    this.activeExp.set(exp);
    document.body.style.overflow = 'hidden';
  }

  openSkill(category: string, skill: SkillItem): void {
    this.activeSkill.set({ category, ...skill });
    document.body.style.overflow = 'hidden';
  }

  closePopups(): void {
    this.activeExp.set(null);
    this.activeSkill.set(null);
    document.body.style.overflow = '';
  }

  skillLabel(level: number): string {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Proficient';
    return 'Intermediate';
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.activeExp() || this.activeSkill()) {
      this.closePopups();
    }
    this.closeMenu();
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
