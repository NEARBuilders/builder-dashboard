import logoText from '@/assets/logo-text.svg';
import logoIcon from '@/assets/logo-icon.svg';

const logoVariants = {
  'mobile-sidebar': (
    <div className="flex h-10 items-center justify-center space-x-2">
      <img src={logoIcon} alt="Logo Icon" className="h-full w-auto" />
      <img src={logoText} alt="Logo Text" className="h-full w-auto" />
    </div>
  ),
  'desktop-sidebar': (
    <div className="flex h-8 items-center justify-center space-x-1">
      <img src={logoIcon} alt="Logo Icon" className="h-full w-auto" />
      <img src={logoText} alt="Logo Text" className="h-full w-auto" />
    </div>
  ),
  'main-hero': (
    <div className="flex h-16 items-center justify-center space-x-3">
      <img src={logoIcon} alt="Logo Icon" className="h-full w-auto" />
      <img src={logoText} alt="Logo Text" className="h-full w-auto" />
    </div>
  )
};

export default function Logo({ variant = 'mobile-sidebar' }) {
  return logoVariants[variant] || logoVariants['mobile-sidebar'];
}
