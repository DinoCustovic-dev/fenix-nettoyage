import Image from 'next/image'
import { cn } from '@/lib/utils'

// Transparent phoenix mark + live wordmark. `dark` = navy text for light
// surfaces (header); `light` = white text on a white icon badge for the navy
// footer, where the darker blues of the mark would otherwise get lost.
export function Logo({
  tone = 'dark',
  priority = false,
}: {
  tone?: 'dark' | 'light'
  priority?: boolean
}) {
  const icon = (
    <Image
      src="/brand/fenix-icon-192.png"
      alt=""
      width={192}
      height={192}
      priority={priority}
      className={cn('w-auto', tone === 'dark' ? 'h-10 lg:h-12' : 'h-8')}
    />
  )

  return (
    <span className="flex items-center gap-2.5">
      {tone === 'dark' ? (
        icon
      ) : (
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
          {icon}
        </span>
      )}
      <span
        className={cn(
          'font-heading text-xl font-semibold uppercase tracking-widest lg:text-2xl',
          tone === 'dark' ? 'text-brand-navy' : 'text-white',
        )}
      >
        Fenix<span className={tone === 'dark' ? 'text-primary' : 'text-accent'}>74</span>
      </span>
    </span>
  )
}
